import {
    toggleViews,
    getComponent,
    handleSearch,
    handleCreation,
    handleDeletion,
    handleUpdate
} from "./scripts.js"

const d = document,
    componentsContainer = d.querySelector('.components-container')

d.addEventListener('DOMContentLoaded', async () => {
    componentsContainer.innerHTML = await getComponent('forms.html')
})

d.addEventListener('submit', async e => {
    e.preventDefault()
    if (e.target.matches('.search-form')) {
        await handleSearch(e.target)
    } else if (e.target.matches('.create-form')) {
        await handleCreation(e.target)
    }
})

d.addEventListener('click', async e => {
    if (e.target.matches('.menu-btn')) {
        toggleViews(e.target)
    } else if (e.target.matches('.close-table-btn spam')) {
        componentsContainer.innerHTML = await getComponent('forms.html')
    } else if (e.target.matches('.delete-btn')) {
        await handleDeletion(e.target)
    } else if (e.target.matches('.update-btn')) {
        await handleUpdate(e.target)
    }
})
