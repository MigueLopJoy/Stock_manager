const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    app = express(),
    PORT = 3000

app.use(cors())

mongoose.connect('mongodb://localhost:27017/inventoryManager', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(bodyParser.json())


const Product = mongoose.model('Product', {
    productCode: String,
    productName: String,
    price: Number,
    stockUnits: Number,
})

app.get('/products', async (req, res) => {
    const { productCode, productName, minPrice, maxPrice } = req.query,
        query = {}

    if (productCode) {
        query.productCode = productCode
    }

    if (productName) {
        query.productName = new RegExp(decodeURIComponent(productName), 'i')
    }

    if (minPrice) {
        query.price = { $gte: parseFloat(minPrice) }
    }

    if (maxPrice) {
        if (query.price) {
            query.price.$lte = parseFloat(maxPrice)
        } else {
            query.price = { $lte: parseFloat(maxPrice) }
        }
    }

    try {
        const products = await Product.find(query)
        res.json(products)
    } catch (error) {
        res.status(500).json({ error: 'Error en la búsqueda de productos.' })
    }
})

app.post('/products', async (req, res) => {
    const productCode = await generateUniqueProductCode(),
        newProduct = new Product({
            productCode,
            productName: req.body.productName,
            price: req.body.price,
            stockUnits: req.body.stockUnits,
        })
    await newProduct.save()
    res.json(newProduct)
})

app.put('/products/:id', async (req, res) => {
    const updatedProduct = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    res.json(updatedProduct)
})

app.delete('/products/:id', async (req, res) => {
    await Product.findOneAndDelete({ _id: req.params.id })
    res.send('Producto eliminado')
})

app.listen(PORT, () => {
    console.log(`Server initialized at http://localhost:${PORT}`)
})


const generateUniqueProductCode = async () => {
    let uniqueCode = generateProductCode()
    while (await Product.exists({ productCode: uniqueCode })) {
        uniqueCode = generateProductCode()
    }
    return uniqueCode
}

const generateProductCode = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        randomLetter = letters[Math.floor(Math.random() * letters.length)],
        randomNumber = Math.floor(100 + Math.random() * 900)
    return `${randomNumber}${randomLetter}`
}