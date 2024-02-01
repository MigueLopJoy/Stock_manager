const d = document,
    componentsContainer = d.querySelector('.components-container'),
    searchForm = d.querySelector(".search_product_form"),
    createForm = d.querySelector(".create_product_form")

d.addEventListener('DOMContentLoaded', async () => {
})
  
d.addEventListener('submit', e => {
    if (e.target === searchForm) {
        renderProducts(findProducts())
    } else if (e.target === createForm()) {
        renderProducts(createProduct())
    }
})

const createProduct = async () => {
    const productName = d.querySelector('.productName').value,
        price = d.querySelector('.price').value,
        stockUnits = d.querySelector('.stockUnits').value
  
    let res = await fetch(
        'http://localhost:3000/products', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productName,
                price: parseFloat(price),
                stockUnits: parseInt(stockUnits),
            }),
        })
    return await res.json()
}

const findProducts = async () => {
    try {
        let res = await fetch('http://localhost:3000/products')
        return await res.json() 
    } catch (error) {
        console.log('Error al buscar el producto')
    }
}

const renderProducts = async () => {
    componentsContainer.innerHTML = await getComponent('results.html') 
    const tableBody = d.querySelector('.results-table-body')

    for (let i = 0; i < products.length; i++) {
        let product = products[i]
        tableBody.innerHTML = `
            <row id='${product['id']}'>
                <td>${product['productCode']}</td>
                <td>${product['productName']}</td>
                <td>${product['price']}</td>
                <td>${product['stock']}</td>
                <td>
                    <button>Editar</button>
                    <button>Eliminar</button>
                </td>
            </row>        
        `
    }   
}
  
const getComponent = async componentName => {
    const res = await fetch(`./ASSETS/HTML/COMPONENTS/${componentName}`)
    return await res.text()
}