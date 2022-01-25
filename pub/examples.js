
// define the items of your list
const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']
// UnorderedList2 class take three arguments(there are more optional arguments) 
// items, DivID, whether or not the list should be editable by user
const unorderedList2 = new UnorderedList2([...items], 'ul2', true)
// the below method will generate the list in the div with the div id "ul2"
unorderedList2.generateStylisting()

const unorderedList3 = new UnorderedList3([...items], 'ul3', true)
unorderedList3.generateStylisting()

const unorderedList3_uneditable = new UnorderedList3([...items], 'ul3-uneditable', false)
unorderedList3_uneditable.generateStylisting()

const unorderedList3_custom = new UnorderedList3([...items], 'ul3-custom', false, 
"Impact,Charcoal,sans-serif", 'blue', ['white', 'gray'])
unorderedList3_custom.generateStylisting()

const td2 = new TodoList2([...items], 'td2', true)
td2.generateStylisting()


const tg3 = new ToggleList3([...items], 'title', 'tg3', true)
tg3.generateStylisting()

const tg3_custom = new ToggleList3([...items], 'title', 'tg3-custom', false, 
"Impact,Charcoal,sans-serif", 'blue', ['white', 'gray'], 'green' )
tg3_custom.generateStylisting()

const titles = ['title1', 'title2', 'title3', 'title4', 'title5']
const tab = new Tab(['Item 1', 'Item 2', '<h3>Item 3</h3>Hi', 'Item 4', 'Item 5'], titles, 'tab1')
tab.generateStylisting()


const tab2 = new Tab(items, titles, 'tab2',  "Impact,Charcoal,sans-serif", 'green', 
'gray', 'yellow', 'purple')
tab2.generateStylisting()

