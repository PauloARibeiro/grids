const layouts = {
    oneByThree() {
        const templateElement = document.createElement('div')
        const template = `
            <div style="flex: 0 0 33.33%; max-width: 33.33%; background: #BC4E55; outline: 1px dashed white">col 3</div>
            <div style="flex: 0 0 33.33%; max-width: 33.33%; background: #BC4E55; outline: 1px dashed white">col 3</div>
            <div style="flex: 0 0 33.33%; max-width: 33.33%; background: #BC4E55; outline: 1px dashed white">col 3</div>
        `

        templateElement.setAttribute('style', 'display: flex; min-height: 100vh')
        templateElement.setAttribute('data-divide-amount', 3)
        templateElement.setAttribute('data-divide', 'column')

        templateElement.innerHTML = template

        return templateElement
    },
}
