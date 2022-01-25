class List {
    constructor(items, parentDivID, editable, fontFamily, fontColor, backgroundColorList) {
        this.items = items
        this.color = fontColor
        this.fontFamily = fontFamily
        this.backgroundColorList = backgroundColorList
        this.editable = editable
        this.parentDivID = parentDivID
    }
    createNewElement(item) {
        const element = document.createElement('li')
        element.style.backgroundColor = this.backgroundColorList[(this.items.length + 1) % this.backgroundColorList.length]
        element.innerHTML = `<div class='item'>${item}</div>`
        return element
    }
    editableAddElement() {
        const element = document.createElement('div')
        element.classList.add('addForm')
        element.innerHTML = `<span class="change-view">≡</span><input type="text" class="editable-add" placeholder="Enter the item you want to add.."><span class="add">\u002B</span><span class="sort">⇣</span>`
        return element
    }
    generateliTags(listingNode) {
        for (let i = 0; i < this.items.length; i++) {
            const element = document.createElement('li')
            element.style.backgroundColor = this.backgroundColorList[i % this.backgroundColorList.length]
            element.innerHTML = `<div class='item'>${this.items[i]}</div>`
            listingNode.appendChild(element)
        }
        // styling
        listingNode.style.fontFamily = this.fontFamily
        listingNode.style.color = this.color
    }
    buttonAddNewElement(listing) {
        const input = listing.querySelector(".editable-add").value
        this.items.push(input)
        const newElement = this.createNewElement(input)
        // add delete button
        this.createDeleteButton(newElement)
        // make content editable

        const li = newElement.querySelector('.item')
        li.contentEditable = true
        li.addEventListener('input', (e) => {
            const index = Array.prototype.indexOf.call(listing.querySelectorAll('li'), li.parentElement)
            this.items[index] = e.target.innerText
        })
        // insert new element to the list on DOM
        listing.children[0].insertBefore(newElement, listing.children[0].children[listing.children[0].children.length - 1])
    }
    addEditableElements(listing) {
        // loop through each li tag
        const listElements = listing.querySelectorAll('li')
        for (let i = 0; i < listElements.length; i++) {
            if (listElements[i].classList.contains('toggle')) {
                continue
            }
            // add the delete button
            this.createDeleteButton(listElements[i])
            const li = listElements[i].querySelector('.item')
            // make the text in each item editable
            li.contentEditable = true
            // update this with the edited items
            li.addEventListener('input', (e) => {
                const index = Array.prototype.indexOf.call(listElements, li.parentElement)
                this.items[index] = e.target.innerText
            })
        }
        //// adding to the list
        // add input field
        listing.children[0].appendChild(this.editableAddElement())
        const addbtn = listing.querySelector('.add')
        addbtn.addEventListener('click', () => this.buttonAddNewElement(listing))
        // sort button
        const sortbtn = listing.querySelector('.sort')
        const that = this
        sortbtn.addEventListener('click', function () {
            that.items.sort()
            that.generateStylisting()
        })
    }
    createDeleteButton(parentNode) {
        const span = document.createElement("SPAN")
        const txt = document.createTextNode("\u00D7")
        span.className = "delete"
        span.appendChild(txt)
        span.style.display = "none"
        parentNode.appendChild(span)
        span.addEventListener('click', () => {
            // find index we just delete
            const index = Array.prototype.indexOf.call(span.parentElement.parentElement.children, span.parentElement)
            span.parentElement.parentElement.removeChild(span.parentElement)
            this.items.splice(index, 1)
        })
        parentNode.addEventListener('mouseover', () => { span.style.display = 'inherit' })
        parentNode.addEventListener('mouseout', () => { span.style.display = 'none' })
    }
    addDropdown(parentDiv) {
        const dropdown = document.createElement('div')
        dropdown.classList.add('dropdown')
        // add options to the dropdown
        const listTypes = [
            'OrderedList1',
            'OrderedList2',
            'OrderedList3',
            'UnorderedList1',
            'UnorderedList2',
            'UnorderedList3',
            'TodoList1',
            'TodoList2',
            'TodoList3']
        listTypes.forEach((i) => {
            const optionNode = document.createElement('div')
            optionNode.classList.add('dropdown-option')
            optionNode.innerText = i
            dropdown.appendChild(optionNode)
        })
        dropdown.style.display = 'none'

        // add onclick event listener to show the menu
        window.onclick = (e) => {
            const parent = e.path[3]
            if (!parent || parent === window){
                return
            }
            const dropdownSelector = `.dropdown`
            const threebarSelector = `.change-view`
            const rightdropdown = parent.querySelector(dropdownSelector)
            const rightthreebar = parent.querySelector(threebarSelector)
            if (e.target !== rightthreebar && rightdropdown){
                rightdropdown.style.display = 'none'
            }else if (rightdropdown){
                rightdropdown.style.display = 'block'
            }
        }
        
        // each option onclick
        const obj = this
        const dropdownOptions = dropdown.querySelectorAll('.dropdown-option')
        dropdownOptions.forEach(option => {
            option.onclick = (e => {
                changeView(obj, e.target.innerText)
            })
        })
        parentDiv.appendChild(dropdown)
    }
    generateStylisting(type) {
        let listing = null
        if (type == 'ul') {
            listing = document.createElement('ul')
        } else {
            listing = document.createElement('ol')
        }
        // listing.classList.add('ordered-list1')
        this.generateliTags(listing)
        // styling
        const parentDiv = document.getElementById(this.parentDivID)
        parentDiv.innerHTML = ''
        parentDiv.appendChild(listing)
        if (this.editable) {
            this.addEditableElements(parentDiv)
            this.addDropdown(parentDiv)
        }
        return listing
    }
}

class UnorderedList extends List {
    constructor(items, parentDivID, editable = false, fontFamily = 'cursive', fontColor = 'black', backgroundColorList = ['rgb(231,233,235)']) {
        super(items, parentDivID, editable, fontFamily, fontColor, backgroundColorList)
    }
    generateStylisting() {

        const listing = document.createElement('ul')

        // listing.classList.add('ordered-list1')
        this.generateliTags(listing)
        // styling
        const parentDiv = document.getElementById(this.parentDivID)
        parentDiv.innerHTML = ''
        parentDiv.appendChild(listing)
        if (this.editable) {
            this.addEditableElements(parentDiv)
            this.addDropdown(parentDiv)
        }
        return listing

    }
}

class OrderedList extends List {
    constructor(items, parentDivID, editable = false, fontFamily = 'cursive', fontColor = 'black', backgroundColorList = ['rgb(231,233,235)']) {
        super(items, parentDivID, editable, fontFamily, fontColor, backgroundColorList)
    }
    generateStylisting() {
        const listing = document.createElement('ol')

        // listing.classList.add('ordered-list1')
        this.generateliTags(listing)
        // styling
        const parentDiv = document.getElementById(this.parentDivID)
        parentDiv.innerHTML = ''
        parentDiv.appendChild(listing)
        if (this.editable) {
            this.addEditableElements(parentDiv)
            this.addDropdown(parentDiv)
        }
        return listing
    }
}

class OrderedList1 extends OrderedList {
    constructor(items, parentDivID, editable = false, fontFamily = 'cursive', fontColor = 'black', backgroundColorList = ['rgb(231,233,235)']) {
        super(items, parentDivID, editable, fontFamily, fontColor, backgroundColorList)
    }
    generateStylisting() {
        super.generateStylisting().classList.add('ordered-list1')
    }
}

class OrderedList2 extends OrderedList {
    constructor(items, parentDivID, editable = false, fontFamily = 'cursive', fontColor = 'black', backgroundColorList = ['rgb(222,255,255)']) {
        super(items, parentDivID, editable, fontFamily, fontColor, backgroundColorList)
    }
    generateStylisting() {
        super.generateStylisting().classList.add('ordered-list2')
    }
}

class OrderedList3 extends OrderedList {
    constructor(items, parentDivID, editable = false, fontFamily = "Impact,Charcoal,sans-serif", fontColor = 'whitesmoke', backgroundColorList = ['rgb(75, 75, 75)', 'rgb(45, 45, 45)']) {
        super(items, parentDivID, editable, fontFamily, fontColor, backgroundColorList)
    }
    generateStylisting() {
        super.generateStylisting().classList.add('ordered-list3')
    }
}

class UnorderedList1 extends UnorderedList {
    constructor(items, parentDivID, editable = false, fontFamily = 'cursive', fontColor = 'black', backgroundColorList = ['rgb(231,233,235)']) {
        super(items, parentDivID, editable, fontFamily, fontColor, backgroundColorList)
    }
    generateStylisting() {
        super.generateStylisting().classList.add('unordered-list1')
    }
}

class UnorderedList2 extends UnorderedList {
    constructor(items, parentDivID, editable = false, fontFamily = 'cursive', fontColor = 'black', backgroundColorList = ['rgb(222,255,255)']) {
        super(items, parentDivID, editable, fontFamily, fontColor, backgroundColorList)
    }
    generateStylisting() {
        super.generateStylisting().classList.add('unordered-list2')
    }
}

class UnorderedList3 extends UnorderedList {
    constructor(items, parentDivID, editable = false, fontFamily = "Impact,Charcoal,sans-serif", fontColor = 'whitesmoke', backgroundColorList = ['rgb(75, 75, 75)', 'rgb(45, 45, 45)']) {
        super(items, parentDivID, editable, fontFamily, fontColor, backgroundColorList)
    }
    generateStylisting() {
        super.generateStylisting().classList.add('unordered-list3')
    }
}

class TodoList extends UnorderedList {
    constructor(items, parentDivID, editable = false, fontFamily = 'cursive', fontColor = 'black', backgroundColorList = ['rgb(231,233,235)']) {
        super(items, parentDivID, editable, fontFamily, fontColor, backgroundColorList)
    }
    addEditableElements(listing) {
        const listElements = listing.querySelectorAll('li')
        super.addEditableElements(listing)
        for (let i = 0; i < listElements.length; i++) {
            this.createTickButton(listElements[i])
        }

    }
    buttonAddNewElement(listing) {
        const input = listing.querySelector(".editable-add").value
        this.items.push(input)
        const newElement = this.createNewElement(input)
        // add delete button
        this.createDeleteButton(newElement)
        // make content editable
        this.createTickButton(newElement)

        const li = newElement.querySelector('.item')
        li.contentEditable = true
        li.addEventListener('input', (e) => {
            const index = Array.prototype.indexOf.call(listing.querySelectorAll('li'), li.parentElement)
            this.items[index] = e.target.innerText
        })
        // insert new element to the list on DOM
        listing.children[0].insertBefore(newElement, listing.children[0].children[listing.children[0].children.length - 1])
    }
    createTickButton(parentNode) {
        const span = document.createElement("SPAN")
        const txt = document.createTextNode("☐")
        span.className = "tick"
        span.appendChild(txt)
        span.style.display = "none"
        parentNode.appendChild(span)
        span.addEventListener('click', () => {
            parentNode.querySelector('.item').classList.toggle('checked')
            if (parentNode.querySelector('.item').classList.contains('checked')) {
                span.innerText = '☑'
            } else {
                span.innerText = '☐'
            }
        })
        parentNode.addEventListener('mouseover', () => { span.style.display = 'inherit' })
        parentNode.addEventListener('mouseout', () => { span.style.display = 'none' })
    }

}

class TodoList1 extends TodoList {
    constructor(items, parentDivID, editable = false, fontFamily = 'cursive', fontColor = 'black', backgroundColorList = ['rgb(231,233,235)']) {
        super(items, parentDivID, editable, fontFamily, fontColor, backgroundColorList)
    }
    generateStylisting() {
        super.generateStylisting().classList.add('unordered-list1')
    }
}

class TodoList2 extends TodoList {
    constructor(items, parentDivID, editable = false, fontFamily = 'cursive', fontColor = 'black', backgroundColorList = ['rgb(222,255,255)']) {
        super(items, parentDivID, editable, fontFamily, fontColor, backgroundColorList)
    }

    generateStylisting() {
        super.generateStylisting().classList.add('unordered-list2')
    }
}

class TodoList3 extends TodoList {
    constructor(items, parentDivID, editable = false, fontFamily = "Impact,Charcoal,sans-serif", fontColor = 'whitesmoke', backgroundColorList = ['rgb(75, 75, 75)', 'rgb(45, 45, 45)']) {
        super(items, parentDivID, editable, fontFamily, fontColor, backgroundColorList)
    }

    generateStylisting() {
        super.generateStylisting().classList.add('unordered-list3')
    }
}

class ToggleList extends UnorderedList {
    constructor(items, title, parentDivID, editable = false, fontFamily = 'cursive', fontColor = 'black', backgroundColorList = ['rgb(231,233,235)'], toggleColor = 'rgb(209,233,235)') {
        super(items, parentDivID, editable, fontFamily, fontColor, backgroundColorList)
        this.title = title
        this.toggleColor = toggleColor
        this.hidden = true
    }
    editableAddElement() {
        const element = super.editableAddElement()
        if (this.hidden) {
            element.style.display = 'none'
        } else {
            element.style.display = 'flex'
        }
        return element
    }
    createNewElement(item) {
        const element = super.createNewElement(item)
        if (this.hidden) {
            element.style.display = 'none'
        } else {
            element.style.display = 'flex'
        }
        return element
    }
    addDropdown(parentDiv) {
        const dropdown = document.createElement('div')
        dropdown.classList.add('dropdown')
        // add options to the dropdown
        const listTypes = [
            'ToggleList1',
            'ToggleList2',
            'ToggleList3'
        ]
        listTypes.forEach((i) => {
            const optionNode = document.createElement('div')
            optionNode.classList.add('dropdown-option')
            optionNode.innerText = i
            dropdown.appendChild(optionNode)
        })
        dropdown.style.display = 'none'

        // add onclick event listener to show the menu
        window.onclick = (e) => {
            const parent = e.path[3]
            if (!parent || parent === window){
                return
            }
            const dropdownSelector = `.dropdown`
            const threebarSelector = `.change-view`
            const rightdropdown = parent.querySelector(dropdownSelector)
            const rightthreebar = parent.querySelector(threebarSelector)
            
            
            if (e.target !== rightthreebar && rightdropdown){
                
                rightdropdown.style.display = 'none'
            }else if (rightdropdown) {
                rightdropdown.style.display = 'block'
            }
        }
        
        // each option onclick
        const obj = this
        const dropdownOptions = dropdown.querySelectorAll('.dropdown-option')
        dropdownOptions.forEach(option => {
            option.onclick = (e => {
                changeView(obj, e.target.innerText)
            })
        })
        parentDiv.appendChild(dropdown)
    }
    generateliTags(listingNode) {
        super.generateliTags(listingNode)
        const litags = listingNode.querySelectorAll('li')

        for (let i = 1; i < litags.length; i++) {
            const element = litags[i]
            if (this.hidden) {
                element.style.display = 'none'
            } else {
                element.style.display = 'flex'
            }
        }
    }
    generateStylisting() {
        const listing = document.createElement('ul')
        // create a button for now
        const toggleli = document.createElement('li')
        toggleli.classList.add('toggle')
        toggleli.style.backgroundColor = this.toggleColor
        listing.appendChild(toggleli)
        this.generateliTags(listing)
        const obj = this
        // styling
        const parentDiv = document.getElementById(this.parentDivID)
        parentDiv.innerHTML = ''
        parentDiv.appendChild(listing)
        if (this.editable) {
            this.addEditableElements(parentDiv)
            this.addDropdown(parentDiv)
        }
        toggleli.innerHTML = `<div class='item'><span class='threebar'>≡</span><span class='title'>${this.title}</span></div>`
        toggleli.addEventListener('click', () => {
            obj.hidden = !obj.hidden
            // toggle display:
            const listItems = listing.querySelectorAll('li')
            for (let i = 1; i < listItems.length; i++) {
                if (obj.hidden) {
                    listItems[i].style.display = 'none'
                } else {
                    listItems[i].style.display = 'flex'
                }
            }
            if (this.editable) {
                const addForm = listing.querySelector('.addForm')
                if (obj.hidden) {
                    addForm.style.display = 'none'
                } else {
                    addForm.style.display = 'flex'
                }
            }
        })
        return listing
    }
}
class ToggleList1 extends ToggleList {
    constructor(items, title, parentDivID, editable = false, fontFamily = 'cursive', fontColor = 'black', backgroundColorList = ['rgb(231,233,235)'], toggleColor = 'rgb(209,233,235)') {
        super(items, title, parentDivID, editable, fontFamily, fontColor, backgroundColorList, toggleColor)
    }
    generateStylisting() {
        super.generateStylisting().classList.add('unordered-list1')
    }
}

class ToggleList2 extends ToggleList {
    constructor(items, title, parentDivID, editable = false, fontFamily = 'cursive', fontColor = 'black', backgroundColorList = ['rgb(222,255,255)'], toggleColor = 'rgb(125,243,235)') {
        super(items, title, parentDivID, editable, fontFamily, fontColor, backgroundColorList, toggleColor)
    }
    generateStylisting() {
        super.generateStylisting().classList.add('unordered-list2')
    }
}

class ToggleList3 extends ToggleList {
    constructor(items, title, parentDivID, editable = false, fontFamily = "Impact,Charcoal,sans-serif", fontColor = 'whitesmoke', backgroundColorList = ['rgb(75, 75, 75)', 'rgb(45, 45, 45)'], toggleColor = 'rgb(3,3,5)') {
        super(items, title, parentDivID, editable, fontFamily, fontColor, backgroundColorList, toggleColor)
    }
    generateStylisting() {
        super.generateStylisting().classList.add('unordered-list3')
    }
}

class Tab {
    constructor(items, titles, parentDivID, fontFamily = 'Helvetica', fontColor = 'black', tabItemBackgroundColor = "white", tabTitleBackgroundColor = 'rgb(38,39,50)', titleColor = 'whitesmoke') {
        this.items = items
        this.color = fontColor
        this.fontFamily = fontFamily
        this.titles = titles
        this.parentDivID = parentDivID
        this.tabTitleBackgroundColor = tabTitleBackgroundColor
        this.tabItemBackgroundColor = tabItemBackgroundColor
        this.titleColor = titleColor
    }

    generateTabs(listing) {
        const tab = document.createElement('div')
        tab.classList.add('tab')
        const items = document.createElement('div')
        items.classList.add('items')
        for (let i = 0; i < this.titles.length; i++) {
            // title
            const title = document.createElement('div')
            title.classList.add('tab-title')
            title.innerText = this.titles[i]
            title.style.color = this.titleColor
            // everytime you click on a tab
            title.onclick = (e) => {
                const itemSelector = `#${this.parentDivID} .tab-item`
                // make every tab item hidden
                const itemsToHide = document.querySelectorAll(itemSelector)
                itemsToHide.forEach((i) => {
                    i.style.display = 'none';
                })
                // get the index of the title that is clicked on
                const titleSelector = `#${this.parentDivID} .tab-title`
                const titlesToChange = document.querySelectorAll(titleSelector)
                titlesToChange.forEach((t) => {
                    t.className = t.className.replace(" active", '')
                })
                const index = Array.prototype.indexOf.call(titlesToChange, e.target)
                // remove the title from active
                e.target.className += " active"
                // once we get the index, we can make the tab item of that index visible
                itemsToHide[index].style.display = 'block'
            }
            tab.appendChild(title)
            // item in each
            const tabItem = document.createElement('div')
            tabItem.classList.add('tab-item')
            tabItem.innerHTML = this.items[i]
            items.appendChild(tabItem)
            // apply styling
            tabItem.style.backgroundColor = this.tabItemBackgroundColor
            tab.style.backgroundColor = this.tabTitleBackgroundColor
        }
        listing.appendChild(tab)
        listing.appendChild(items)
        return
    }

    generateStylisting() {
        const listing = document.createElement('div')
        listing.classList.add("tabs")
        this.generateTabs(listing)
        listing.style.fontFamily = this.fontFamily
        listing.style.color = this.color
        const parentDiv = document.getElementById(this.parentDivID)
        parentDiv.innerHTML = ''
        parentDiv.appendChild(listing)
        return listing

    }
}


const changeView = (oldView, newViewType) => {
    const items = oldView.items
    const parentDivID = oldView.parentDivID
    let newView = null
    switch (newViewType) {
        case 'OrderedList1':
            newView = new OrderedList1(items, parentDivID, true)
            newView.generateStylisting()
            break;
        case 'OrderedList2':
            newView = new OrderedList2(items, parentDivID, true)
            newView.generateStylisting()
            break;
        case 'OrderedList3':
            newView = new OrderedList3(items, parentDivID, true)
            newView.generateStylisting()
            break;
        case 'UnorderedList1':
            newView = new UnorderedList1(items, parentDivID, true)
            newView.generateStylisting()
            break;
        case 'UnorderedList2':
            newView = new UnorderedList2(items, parentDivID, true)
            newView.generateStylisting()
            break;
        case 'UnorderedList3':
            newView = new UnorderedList3(items, parentDivID, true)
            newView.generateStylisting()
            break;
        case 'TodoList1':
            newView = new TodoList1(items, parentDivID, true)
            newView.generateStylisting()
            break;
        case 'TodoList2':
            newView = new TodoList2(items, parentDivID, true)
            newView.generateStylisting()
            break;
        case 'TodoList3':
            newView = new TodoList3(items, parentDivID, true)
            newView.generateStylisting()
            break;
        case "ToggleList1":
            newView = new ToggleList1(items, oldView.title, parentDivID, true)
            newView.generateStylisting()
            break;
        case "ToggleList2":
            newView = new ToggleList2(items, oldView.title, parentDivID, true)
            newView.generateStylisting()
            break;
        case "ToggleList3":
            newView = new ToggleList3(items, oldView.title, parentDivID, true)
            newView.generateStylisting()
            break;
    }
}