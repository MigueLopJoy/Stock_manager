const createProduct = async form => {
    try {
        let res = await fetch(
            'http://localhost:3000/products',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productName: form.productName.value,
                    price: parseFloat(form.price.value),
                    stockUnits: parseInt(form.stockUnits.value),
                })
            })
        return await res.json()
    } catch (error) {
        throw error
    }
}

const findProducts = async form => {
    try {
        const queryParams = new URLSearchParams({
            productCode: encodeURIComponent(form.productCode.value),
            productName: encodeURIComponent(form.productName.value),
            minPrice: encodeURIComponent(form.minPrice.value),
            maxPrice: encodeURIComponent(form.maxPrice.value)
        })
        let res = await fetch(`http://localhost:3000/products?${queryParams.toString()}`)
        return await res.json()
    } catch (error) {
        throw error
    }
}

const deleteProduct = async productId => {
    try {
        await fetch(`http://localhost:3000/products/${productId}`, { method: 'DELETE' })
    } catch (error) {
        throw error
    }
}

const updateProduct = async row => {
    try {
        let res = await fetch(`http://localhost:3000/products/${row.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                productName: row.querySelector('.edit-productName').textContent,
                price: row.querySelector('.edit-price').textContent,
                stockUnits: row.querySelector('.edit-stockUnits').textContent
            })
        })
        return await res.json()
    } catch (error) {
        throw error
    }
}

export {
    findProducts,
    createProduct,
    deleteProduct,
    updateProduct
}