import {
    findProducts,
    createProduct,
    deleteProduct,
    updateProduct
} from './client.js'

const d = document,
    componentsContainer = d.querySelector('.components-container')

const renderProducts = async products => {
    componentsContainer.innerHTML = await getComponent('results.html')
    const tableBody = d.querySelector('.results-table-body')

    if (products.length > 0) {
        for (let i = 0; i < products.length; i++) {
            let product = products[i]
            tableBody.innerHTML += `
                <tr id='${product._id}'>
                    <td>${product.productCode}</td>
                    <td class="edit-productName" contenteditable='true'>${product.productName}</td>
                    <td class="edit-price" contenteditable='true'>${product.price}</td>
                    <td class="edit-stockUnits" contenteditable='true'>${product.stockUnits}</td>
                    <td>
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    </td>
                </tr>        
            `
        }
    } else {
        let message = d.createElement('P')
        message.textContent = 'No results were found'
        message.classList.add('result-message')
        message.classList.add('warning-message')
        d.querySelector('.results-table').insertAdjacentElement("afterend", message)
    }
}

const toggleViews = target => {
    const searchForm = d.querySelector('.search-form-container'),
        createForm = d.querySelector('.create-form-container')

    if (target.matches('.search-menu-btn')) {
        if (searchForm.classList.contains('d-none')) {
            searchForm.classList.remove('d-none')
            createForm.classList.add('d-none')
        }
    } else if (target.matches('.create-menu-btn')) {
        if (createForm.classList.contains('d-none')) {
            createForm.classList.remove('d-none')
            searchForm.classList.add('d-none')
        }
        createForm.classList.contains('d-none')
    }
}

const handleSearch = async form => {
    try {
        renderProducts(await findProducts(form))
    } catch (error) {
        showWarningMessage(error)
    }
}

const handleCreation = async form => {
    try {
        renderProducts([await createProduct(form)])
    } catch (error) {
        showWarningMessage(error)
    }
}

const handleDeletion = async btn => {
    try {
        await deleteProduct(btn.closest('tr').id)
        componentsContainer.innerHTML = await getComponent('forms.html')
        showSuccessMessage(d.querySelector('.menu-container'), 'Product deleted successfully')
    } catch (error) {
        showWarningMessage(error)
    }
}

const handleUpdate = async btn => {
    try {
        let newProduct = await updateProduct(btn.closest('tr'))
        await renderProducts([newProduct])
        showSuccessMessage(d.querySelector('.results-table'), 'Product edited successfully')
    } catch (error) {
        showWarningMessage(error)
    }
}

const getComponent = async componentName => {
    const res = await fetch(`./ASSETS/HTML/COMPONENTS/${componentName}`)
    return await res.text()
}

const showSuccessMessage = (element, text) => {
    let message = d.createElement('P')
    message.textContent = text
    message.classList.add('result-message')
    message.classList.add('success-message')
    element.insertAdjacentElement("beforebegin", message)

    setTimeout(() => {
        message.remove()
    }, 3000)
}

const showWarningMessage = (element, text) => {
    let message = d.createElement('P')
    message.textContent = text
    message.classList.add('result-message')
    message.classList.add('warning-message')
    d.querySelector('.menu-container').insertAdjacentElement("beforebegin", message)

    setTimeout(() => {
        message.remove()
    }, 3000)
}

export {
    toggleViews,
    renderProducts,
    getComponent,
    handleSearch,
    handleCreation,
    handleDeletion,
    handleUpdate
}