# js-library-mujionga
### Link to [landing page](https://afternoon-headland-32184.herokuapp.com/)
### Link to [documentation](https://afternoon-headland-32184.herokuapp.com/)
## Getting Started

In the head section of your HTML, add the below code snippet

```html
<link rel="stylesheet" href="stylisting.css">
<script defer type="text/javascript" src='stylisting.js'></script>
<script defer type="text/javascript" src='examples.js'></script>
```

In the body section of your HTML, add the below code snippet to where you want your list to locate at

You can also specify the width of your list

```html
<div id='ul2' style='width: 300px'></div>
```

In the `examples.js` file, include the following code snippet

```jsx
// define the items of your list
const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']
// UnorderedList2 class take three arguments(there are more optional arguments) 
// items, DivID, whether or not the list should be editable by user
const unorderedList2 = new UnorderedList2([...items], 'ul2', true)
// the below method will generate the list in the div with the div id "ul2"
unorderedList2.generateStylisting()
```

