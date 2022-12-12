# Web-pack
In brief, Webpack goes through your package and creates what it calls a **dependency graph** which consists of various **modules** which your webapp would require to function as expected. Then, depending on this graph, it creates a new package which consists of the very bare minimum number of files required, often just a single bundle.js file which can be plugged in to the html file easily and used for the application.

# React Design Patterns

# React Deep-dive
## JSX
JSX is a syntax expression of javascript and it used to write what appears as html in the JS file. However, JSX is not valid to the web browser. So when the JS file is compiled, all the JSX is converted into JavaScript. Thus you need some sort of JSX compiler. 

JSX elements are treated as JS expressions: saved in a variable, passed into a function, or stored in an array and can be stored in an object (dictionary). 
```jsx
const myTeam = {  
  center: <li>Benzo Walli</li>,  
  powerForward: <li>Rasha Loa</li>,  
  smallForward: <li>Tayshaun Dasmoto</li>,  
  shootingGuard: <li>Colmar Cumberbatch</li>,  
  pointGuard: <li>Femi Billon</li>  
};
```

These JSX elements can have attributes just like html, which state the class or height.

If a JSX element takes up more than one line, then you must wrap it in parathesis
```jsx
const theExample = (  
   <a href="https://www.example.com">  
     <h1>  
       Click me!  
     </h1>  
   </a>  
);
```


> IMPORTANT RULE: JSX Expressions can only have one outermost element
```jsx
const paragraphs = (  
  <p>I am a paragraph.</p>  
  <p>I, too, am a paragraph.</p>  
);
```

## Common JSX Grammar
### class vs. className
In HTML you have the `class` attribute, you cannot use this in JSX, so instead you must use `className`.

### Self-closing tags
in JSX it is required that you write self closing tags 
`<br />`

### Curly braces in JSX
Any code that is written inside the tags of JSX elements, will be read as JSX not javaScript. You can make JSX read JavaScript by using curly brackets. This is useful for calling JavaScript methods or variables. We can also use object properties to set attributes as well.

### Event Listeners
you can set event listeners to JSX elements, by giving them an attribute. the attributes name usually follows `on` plus the name of the event your listening for. In html event listeners are in lower case, but in JSX they are written in camelCase.
```jsx
function makeDoggy(e) {

// Call this extremely useful function on an <img>.

// The <img> will become a picture of a doggy.

e.target.setAttribute('src', 'https://content.codecademy.com/courses/React/react_photo-puppy.jpeg');

e.target.setAttribute('alt', 'doggy');

}

  

const kitty = (

<img

onClick={makeDoggy}

src="https://content.codecademy.com/courses/React/react_photo-kitty.jpg"

alt="kitty" />

);
```

the event listener function, will take the event as an argument. we can then take the `event.target` which in this case is an object, but will be the JSX element that the event listener is nested in, and then we can change its attributes.


### JSX Conditionals
conditionals cannot exist directly within a JSX element. However ternary operators do work.

#### &&
```jsx
const tasty = (  
  <ul>  
    <li>Applesauce</li>  
    { !baby && <li>Pizza</li> }  
    { age > 15 && <li>Brussels Sprouts</li> }  
    { age > 20 && <li>Oysters</li> }  
    { age > 25 && <li>Grappa</li> }  
  </ul>  
);
```
If the expression on the left of the `&&` evaluates as true, then the JSX on the right of the `&&` will be rendered. If the first expression is false, however, then the JSX to the right of the `&&` will be ignored and not rendered.

### Functional Functions: Map, Reduce, Filter
```jsx
const strings = ['Home', 'Shop', 'About Me'];  
  
const listItems = strings.map(string => <li>{string}</li>);  
  
<ul>{listItems}</ul>
```
This makes it easier to convert an array into JSX elements, which in this case are stored in an array. It is important to note that `listItems` at the bottom returns an array. This accept to return and put within `<ul\>`

### Keys
Keys are an attribute within a JSX element, there value is unique similar to an id. They are used to keep track of list internally within react.  This is important when:
1. the list items are stateful, like having to remember whether you wre checked off or not
2. A list's order might be shuffled.

## Rendering React
To render react you need the `ReactDOM` library from `react-dom`
``` jsx
ReactDOM.render(<JSXelement>, document.getElementById(id))
```
this will render the JSX expression at the given id element, which is usually an empty div set to root or app.

> IMPORTANT NOTE: ReactDOM.render() only updates DOM elements that have changed. That means if you render the same thing twice, the second render will not do anything.

## React Components
A component is a small reusable chunk of code that is responsible for one job. its basically a unit of html code.

There are two different kinds of creating components:
1. Class Components
2. Function Components

In order to create a component we need to import the React object
` import React from "react"` . This contains all the methods we need.

### Class Components
We can use a JavaScript class to define a new component. After we define our class component, we can use it to `render` as many instances of the component that we want. It is important to note that is a component `class` and not a component. This class is a factory that produces components.
```jsx
class ComponentFactory extends React.Component {  
  render() {  
    return <h1>Hello world</h1>;  
  }  
}
```

When you need to add additional logic it should exists within the render function, since putting it within that class declaration (before the render method) will cause an error.

### Component Instances
jsx elements can either be HTML-like , or component instances. JSX uses capitalization to differentiate the two. Thats why it is imperative that you use proper capitalization when naming componet classes.

### JSX and Components
Just like in JSX, components can have event listeners and follow all of the same logic, however must follower the conventions and rules of class declarations.


## Component Interactions
### Components Calling other Components
Components can call other components, however, you need to import the component class.

### Module System
importing is not enough, you need to make variables, classes, and methods accesssible by exporting them. You can used `named exports` which basically require you to put `export` before any variable, class, or function declaration.
```jsx
export const faveManifestos = {  
  futurist: 'http://www.artype.de/Sammlung/pdf/russolo_noise.pdf',  
  agile: 'https://agilemanifesto.org/iso/en/manifesto.html',  
  cyborg:   'http://faculty.georgetown.edu/irvinem/theory/Haraway-CyborgManifesto-1.pdf'  
};
```

### Props
Instead of a component rendering another component, it can pass information to another component, information that gets passed along among components is called `props`.

Every component has a props attribute which is passed down from the parent `React.Component` class. 

How do we pass a component information?
**We give it an attribute**
```jsx
<Greeting name="Frarthur" town="Flundon" age={2} haunted={false} />
```
if the value is not a string we have to put it into curly braces.

> NOTE: is obvious that this is important for creating components that are unique with specific information.

We then pull this information by calling `this.props.<name-of-information` within the component.

It is common to pass event handling functions as props

#### Event Listener Props and Conventions
The function that is handling the event should have the name `handle + <name of event>`, like `handleClick`. the name of the prop attribute should be `on + <event name>`, thus the prop should be `onClick`. Thus our component with the prop should be written as:
`<Button onClick={handleClick}/>`.

A common source of confusion is setting reserved words to component instances.
```jsx
<Button onClick={this.handleClick} />
```

if this were html, then this would set an eventListener, but since this is a  component instance, we are actually just passing an attribute that happens to have the name of an event listener.

#### this.props.children
returns everything that is between the tags of the given component. If its a self closing tag or there is nothing there, it returns `undefined`, if there is only one element, it will return that one element, otherwise it will return an array of elements.

#### default props
What if no one passes a prop to the component, what will it do?
You should give your component class default props by adding a property to your class.

### State
Dynamic information is information that changes over time. There are two ways a component can get dynamic information: `props` and `state`.

Unlike `props`, a components state is not passed from the outside, each component controls its own state.

#### Setting initial state
```jsx
class Example extends React.Component {  
  constructor(props) {  
    super(props);  
    this.state = { mood: 'decent' };  
  }  
  
  render() {  
    return <div></div>;  
  }  
}  
  
<Example />
```

#### Accessing state
just like `this.props` you can do `this.state` to access state properties.

#### Update state with this.setState
`this.setState({ hungry: true });` this.setState takes two arguments: an object to update state, and a callback. you never need the callback though.

> NOTE: Event Listeners due to the way they are bound in JavaScript, lose there `this` when they are called. So in order to call `this.setState` from an event listener, we must bind the `this` in the constructor to the event listener constructor.

you need to add `this.methodName = this.methodName.bind(this)` to your constructor function.

Everytime you call `this.setState` it automatically rerenders the page.
> NOTE: you cannot call this.setState inside the `render()` method, otherwise there will be an infinite loop.


## Lifecycle Methods
### The Component LifeCycle
Components have three high level stages:
1. mounting: when a component is initialized and put into the DOM for the first time.
2. Updating: updates as a result of changed state or props
3. Unmounting: when component is removed from the DOM
### Life Cycle Methods
`constructor()` is called first in the mounting phase, and then `render()` later in the mounting phase and in the update phase. 
Side effects should not be in the `render()` or `constructor()`.
#### componentDidMount
This function is the last function called in the mount phase and it is a good place to put side effects.
#### componentWillUnmount
This will run right before a component is unmounted and is a good spot for cleaning up a mess, side effect, or any memory leakage from a component.
#### componentDidUpdate
This a good place for work surrounding updates to components either through props or setState.

## Hooks
> React hooks and function components do not replace classes, but are just another tool. 

hooks allow us to hook into the state and lifecycle features of our function components

https://reactjs.org/docs/hooks-reference.html provides all the different hooks.
### Function Components
function components are the same as class components
```jsx
const MyComponentClass = () => {

	return <h1>Hello world</h1>;

}
```
#### Function components and props
you can get props by passing it as a parameter in the function and then calling it with `props.propertyName` without this.

### State Hook
state hooks are for dynamically changing data, they continuously rerender the page whenever the state is changed to keep the page up to date.

```jsx
import { useState } from "react";

function App() {
  const [input, setInput] = useState("");

  return (
    <div className="App">
      <h1>Input value: {input}</h1>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
    </div>
  );
}
```
### Effect Hook
This is commonly used when the component is initially rendered, when it is updated, and when it is unmounted.

`useEffect` accepts a function and a dependency array as arguments. The function will be executed when a variable in the dependency array changes. If no dependency array is provided, the function will run every time the component is re-rendered. If the dependency array is empty, the function will only be run when the component first mounts to the DOM. A common use case for an empty dependency array would be when fetching data from an API.

```jsx
function App() {
  const [input, setInput] = useState("");
  const [words, setWords] = useState([]);

  useEffect(() => {
    document.title = `${words.length} words`;
  }, [words]);
```

