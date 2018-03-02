## Dependencies

### Finished Code

https://github.com/diegocasmo/react-redux-react-router-es6
https://github.com/peterneely/pluralsight-react-redux-react-router-es6

### Tools

Redux
ES6 with Babel transpiled into ES5
React Router
Webpack instead of Browserify (removes need for gulp)
npm scripts
ESLint for linting javascript
Testing - Mocha, React Test Utils, and Enzyme
Webstorm

### Libraries

* React 15.0.2
* React Router 2.4.0
* Redux 3.5.2
* Babel 6.* - ES6 or ES2015 javascript used, Babel transpiles this to ES5 Javascript
* Babel-polyfill 
    * some features of ES6 can't be transpiled, such as array.from, set, map, promise, generators
	* Babel-polyfill can polyfill these features so they work in ES5
	* Polyfill emulates a full ES2015 environment inside of your application so ES6 features can work
	* Downsize is it is large
* Webpack module bundler 1.13
	* Compile javascript into a single minified file that works in the browser
* Mocha for testing
* ESLint for code inspection and compile time checking

#### Example of Babel in action	
	
```Javascript
[1, 2, 3].map(n => n ** 2);
```

becomes:

```Javascript
[1, 2, 3].map(function(n) {
    return Math.pow(n, 2);
});
```

#### Hot reloading

babel-preset-react-hmre

* Wraps components in a custom proxy
* Requires a class at the top of the tree
* Doesn't reload container functions like mapStateToProps
* React Hot Loader 3.0 may be a good alternative

## Notes

### Redux

Redux has eclipsed Flux in popularity, over 15,000 stars on GitHub.

Dan Abramov the creator joined the React team at Facebook.

Why Redux - unlike Flux centralizes all state in one store. One object graph.

#### Pros

Avoids complexity of dealing with multiple stores.

Reduced boilerplate code for implementation.

Immutable store with performance benefits, and can have hot reloading.

Small API and small.

#### Cons

Too much magic.

### Getting Started

https://github.com/coryhouse/pluralsight-redux-starter

Want to do all of the following

Automated Testing
Linting
Minification
Bundling
JSX compilation
ES6 transpilation

## Building Development Environment

### Install Node

v6.x
Starter package-json

npm scripts - use instead of gulp, eliminate dependency on gulp plugin authors

### Bundling with webpack

Defined as a module bundler, in previous course used browserify for same thing.

Webpack is more popular for React users. 

Webpack is placed in root ... webpack.config.dev.js

Webpack good feature: webpack-hot-middleware reloading ... we can update our code and see changes in browser without having to do a full reload.

Last line of entry contains './src/index' file that is entry point of the application. Don't specify file extension. 

Output specifies where the application will be bundled to and run from ... /dist folder with filename bundle.js

### Editor Config

A webstorm specific settings file.
.editorconfig

### Babel

Transpiles code to ES5.

Add a file named .babelrc to root 

Add react-hmre to this file ... this wires up hot reloading related code.

Now we need a development server. For this we are going to use express.

### Build Tools

Create a folder named tools at root.

File srcServer.js

Express is a popular an easy to use development server ... configured to use webpack.

### NPM Start

Anyone that uses application can type 

```
npm start
```

In the command line and expect to see the application start. This is achieved through adding scripts to the package.json file.

```
"scripts": {
    "start": "babel-node tools/srcServer.js"
},
```

This script babel-node transpiles the javascript into ES5

Also add prestart in package.json with startMessage.js for startup message

Add .eslintrc in root for ESLint support ... then wireup in package.json with 

"lint": "node_modules/.bin/esw webpack.config.* src tools"

Note: this uses the library eslint-watch ... this specifies path to binary

To run this directly in the console type:

```
npm run lint
```

As a side note any of these scripts can be run directly in this manor. For example the prestart could be run directly with

```
npm run prestart
```

To print out a start message

If lint works you get a message:

```
✓ Clean (4:40:07 PM)
```

To have npm start watching the files automatically for changes add

```
"lint:watch": "npm run lint -- --watch"
```

Run with:

```
npm run lint:watch
```

While this is running the files are being watched and linted as they are changed

To start our server *and* start linting as part of startup the start script needs to be updated to run multiple tasks

start changes to:

```
"start": "npm-run-all --parallel open:src lint:watch",
```

Which runs both open:src (srcServer.js) and lint:watch (linting)

Now running

```
npm start
```

Starts all of these actions.

To wire up testing add a file index.test.js under source with a test

```
import expect from 'expect';

describe('Our first test', () => {
  it('should pass', () => {
    expect(true).toEqual(true);
  });
});
```

Then add the appropriate wireup in package.json

```
  "scripts": {
    "prestart": "babel-node tools/startMessage.js",
    "start": "npm-run-all --parallel test:watch open:src lint:watch",
    "open:src": "babel-node tools/srcServer.js",
    "lint": "node_modules/.bin/esw webpack.config.* src tools",
    "lint:watch": "npm run lint -- --watch",
    "test": "mocha --reporter progress tools/testSetup.js \"src/**/*.test.js\"",
    "test:watch": "npm run test -- --watch"
  },
```

To execute just the tests the shortcut is:

```
npm test
```

For the sake of comparison these are startup scripts for a real application

```
  "scripts": {
    "start": "node server.js",
    "lint": "node_modules/.bin/esw webpack.config.* src/main/webapp tools",
    "bundle": "webpack --optimize-minimize --output-public-path ''",
    "lint:watch": "npm run lint -- --watch",
    "prodbuild": "webpack --config ./webpack.prod.config.js",
    "test": "set NODE_ENV=test&& mocha -R nyan prom/test --compilers js:babel-core/register,js:prom/test/css-modules-compiler.js --recursive"
  }
```

And in server.js of a real application

```
var webpack = require('webpack');
var WebPackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebPackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    proxy: {
        "**": "http://localhost:8080"
    }
}).listen(8181, 'localhost', function (err, result) {
    if (err) {
        console.log("this is a test..");
        return console.log(err);
    }

    console.log('Listening on localhost:8181 for hot reloading....')
});
```

Another app uses react-scripts

Stopped here: https://app.pluralsight.com/player?course=react-redux-react-router-es6&author=cory-house&name=react-redux-react-router-es6-m3&clip=0&mode=live

### React in ES6

ES5 with createClass

```
<div onClick={this.handleClick}></div>
```

Requires explicit bind with ES6

```
<div onClick={this.handleClick.bind(this)}></div>
```

or can be done in the constructor ... author likes this pattern, this is done in application

```
class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
```

Stateless Functional Component 

Use const or let instead of var

The app uses the Class style ... the author prefers the const style

Reason for preferring function

* Removes need for class and extends
* Don't need ctor
* Removes need for this keyword
* Removes need for bind ... this.sayHi.bind(this) becomes {sayHi}
* Good for dumb presentational components

###### Class style:

* Use when need state
* refs
* lifecycle methods
* child functions

```
class HelloWorld extends React.Component {
  ...
  
  render() {
   return jsx
  }
};
```

###### Stateless style (a Stateless functional component style ... ES6 variant shown below with no function keywork)

* Use everywhere else

```
const HelloWorld = (props) => {
  ...
  
  return (
   ... jsx ...
  )
  
};
```

### Container vs Presentation components

* Container components contain little markup, and are the stateful components that feed child components with state via props
* They pass data and actions down and they know about Redux
* These are usually stateful
* Sometimes called Controller View

* Presentation components are dumb components that contain markup, they receive actions and data via props, and usually don't know about Redux
* These are typically functional components
* Sometimes called View

## Application Setup

Create a components folder with a few pages, break into folders under components.
Create a parent App.js file, everything will pass through this from Router.
One level up create routes.js, reference App in the Route.

## Creating first pages

Wire-up of new pages in Routes for routing, and header for navigation. 

## Redux

The store is a like a local client-side database.

Three principals of Redux

* One immutable store
* Actions trigger changes
* Reducers update state - a function that accepts a current state and modifies it, returns new state

New concepts for Redux

* Reducers
* Containers
* Immutability

### Flux vs Redux

#### Flux

 ->  Action
 |      |
 |      V
 |   Dispatcher
 |      |
 |      V
 |   Store
 |      |
 |      V
 |-- React

#### Redux

 ->  Action
 |      |
 |      V
 |   Store  <--> Reducers
 |      |
 |      v
 |-- React

#### Reducers

Reducers are pure functions, and Redux doesn't need an dispatcher. Multiple reducers update a single store.

In Redux the store passes actions down the the Reducers that you define, this is done by calling a root reducer that you define. Whenever the store changes a top level function is called that triggers a re-render on component.

React components can be connected to the store automatically with the React-Redux library, so you don't need the onChange handlers listening for changes from the store.

In Flux stores contain state and change logic. In Redux the store and the change logic are separate.

Redux avoids complexity of logic between different stores like you have in Flux.

#### Redux Flow

Click on something, this fires an Action 

```
    // wire-up
    onClick={this.publish.bind(this,publishDrawerTemplate.id, this.state.publishDTO)}

    // calls
    publish = (id, DTO) => {
        this.props.triggerPublish(id, DTO);
        this.cleanClose();
    }
    
    // defined
    function mapDispatchToProps(dispatch) {
     return {
       closedDrawer: bindActionCreators(closedDrawer, dispatch),
       triggerPublish: bindActionCreators(publish, dispatch),
    };
}
```

The action creators 1st parameter publish is imported into the PublishDrawer here:

```
import {closedDrawer, publish} from '../../actions/publishDrawerActions';
```

Publish actions:

```
const publish = (id, publishDTO) => {
    
    return (dispatch) => {
        axios.put(system.QD_API_URL + `/questionnaire-templates/${id}/publish`
        , publishDTO)
        .then((response) => {
            return dispatch(publishSuccess(response));
        })
        .catch((response) => {
            return dispatch(publishFailure(response));
        });
    };  
};
```

Publish success:

```
const publishSuccess = () => {
    return (dispatch) => {
        dispatch(getQuestionnaireTemplateList());
    };
};
```

Which calls another action getQuestionnaireTemplateList in the grid's actions.

This is referenced in a reducer:

```
function questionnaireTemplateListReducer(state = initialState, action) {
    switch (action.type) {
        case types.QUESTIONNAIRE_TEMPLATE_LIST_GET_SUCCESS:
            return action.list;
        default:
            return state;
    }
}
```

Publish Drawer Reducer -- this is called when the action to open a drawer occurs

The tie between the two is the action type.

Action:

```
return <MenuItem key={index} primaryText="Publish" onClick={this.open}/>;
```

Fires action, eventually reducer is called:

```
export default function publishActionDrawerReducer(state = initialState, action) {
    switch (action.type) {
        case types.PUBLISH_DRAWER_OPEN:
            return {
                ...state,
                open: true,
                template: action.template
            };
        case types.PUBLISH_DRAWER_CLOSED:
            return initialState;

        default:
            return state;
    }
}
```

The action triggers a change will ultimately be handled by a reducer.

A reducer is a function that returns new state. A reducer receives the current state in an action and returns a new state.

```javascript
function appReducer(state = defaultState, action) {
    switch (action.type) {
        case RATE_COURSE:
            // return new state
    }
}
```

The new state updates the store, the React component is notified via React-Redux.

## Actions, Stores, and Reducers

Need to understand immutability before you can start writing reducers.

### Actions

Actions are objects containing a description of an event.

Action creator:
```
rateCourse(rating) {
 return { type: RATE_COURSE, rating: rating }
}
```

Action:
```
{ type: RATE_COURSE, rating: rating }
```

The action must have the type property, the rest of the shape is up to the developer (just has to serialize).

### Creating the Redux Store 

This is done in the application's entry point. 

The createStore function is passed to the reducer function.

```javascript
let store = createStore(reducer);
```

In Flux the store mixes concerns. In Flux the store contains both the data and the logic for manipulating the data.

In Redux the store just stores the data, the reducer handles the state changes.

The Redux Store API is simple, it can:

```javascript
store.dispatch(action)
store.subscribe(listener)
store.getState()
replaceReducer(nextReducer) // hot reloading
```

Note: There is no API for changing data in the store.

### Immutability

A fundamental concept in Redux.

Concern ... if I cannot mutate state, doesn't that mean that no data in the application can change?

Solution ... to change state, return a new object.

What is mutable in JS?

||Immutable||Mutable||
|Number|Objects|
|String|Arrays|
|Boolean|Functions|
|Undefined||
|Null||

Example ... traditional app mutating state.

```javascript
state = {
    name: "Sample User",
    role: "Author"
}

state.role = "Admin";
return state;
```

Immutable way of changing state (returning a new object).

```javascript
state = {
    name: "Sample User",
    role: "Author"
}

return state = {
    name: "Sample User",
    role: "Admin"
}
```

This is important because Redux depends on immutable state to improve performance.

To make it easier to create copies of objects in Javascript the following is available:

Signature:

```javascript
Object.assign(target, ...sources)
```

Example use ES6 object assign:

```javascript
Object.assign({}, state, {role: "Admin"});
```

--> Create a new empty object, mix that new object with our existing state, change the role property to admin. This creates a clone of our existing state object but with the role property changed to Admin.

Object assign creates a new object using an existing object as the template.

Note: if you leave our the {} you will just mutate the state of object instead of making a deep copy.
Note: Babel cannot transpile object assign to ES5, so babel-polyfill is needed. 

Example of this functionality in action in the app: 

```javascript
function templateReducer(state = initialState, action) {
    switch (action.type) {
        case types.ADD_QUESTIONNAIRE_TEMPLATE:
            return Object.assign({}, state, {
                    workingQuestionnaire: action.template
                });
        default:
            return state;
    }
}
```

Difference between state in Flux (mutable) and Redux (immutable).

Three core benefits to immutable states.

###### Clarity

In other applications tracking down who/what changed something can be time consuming

###### Performance
Large object state comparisons are expensive (and complicated)
Instead you can do a reference comparison

```javascript
if (prevStoreState !== storeState) // ...
```

###### Additional Benefits

 * Time-travel debugging
 * Undo/Redo
 * Turn off individual actions
 * Play interactions back

### Useful Tools

ES6 - Object.assign, Spread operator
ES5 - Lodash merge, extend or NPM's ES5 Object-assign
Libraries - react-addons-update or Immutable.js (the app uses this)

## What is a reducer

A function that takes state and an action, and returns new state.

```javascript
function myReducer(state, action) {
  // return new state based on the action passed
}
```

Can be reduced (lol) to (state, action) => state

A reducer that increments a counter would look like this:

```javascript
function myReducer(state, action) {
    switch (action.type) {
        case 'INCREMENT_COUNTER':
            // state.counter++; // can't do this ... this is mutating state
            return Object.assign({}, state, { counter: state.counter++ });
    }
}
```

{}, // create new object of: 
state, // state
{ counter: state.counter++ } // increment the counter property 

What not to do in reducers:

* Mutate arguements
* Call side effects like API's and routing transitions
* Calling non-pure functions (like Date.now or Math.random)

** ALL ** reducers are call on each ** DISPATCH **

When the store is created Redux calls the reducers and uses their return value as initial state.

So ... if we have multiple reducers, how do you know which one is called when an action is dispatched? The answer: ** ALL OF THEM **. 

The switch statement of each is examined to see if it is relevant. This is why all reducers must return untouched state if nothing is changed.

An example:

The DELETE_COURSE action is dispatched, and the following reducers are called: loadStatus, courses, authors, but only the reducer that handles the course state will run.

Each reducer only handles a slice of state. The store is like a pie chart with reducers handling slices.

From the Redux FAQ:

Write independent small reducer functions that are each responsible for updates to a specific slice of state. 
We will call this pattern reducer composition.
A given action could be handled by all, some, or none of them. 

## Connecting React to Redux

React-Redux the companion library.

Two component types: container and presentation (smart and dumb components).

Container: how things work, aware of Redux, subscribe to a Redux state, dispatch Redux actions, generated by react-redux

Presentational: how things look, unaware of Redux, read data from props, invoke callbacks on props, written by hand

              ->  Action
              |     |
              |     V
              |   Store  <--> Reducers
              |     |
react-redux - |     v
              |-- React


React Redux Provider

Provider (attachs app to store) -- Connect (creates container components)

<Provider store={this.props.store}>
  <App/>
</Provider>

The connect function ... this function wraps a component so it is connected to the Redux store.

With this function we can declare which parts of the store we want to be attached to the component as props.

And we can declare what actions we want to expose on props as well.

```javascript
export default connect (
  mapStateToProps,
  mapDispatchToProps    
)
(AuthorPage);
```

####### Flux

In Flux you have to do this wiring to the store manually in components:

```javascript
componentWillMount() {
    AuthorStore.addChangeListener(this.onChange);
}

componentWillUnmount() {
    AuthorStore.removeChangeListener(this.onChange);
}

onChange() {
    this.setState({ authors: AuthorStore.getAll() });
}
``` 

Also have to wire up removing change listener and an onChange event that sets state of component to latest version data in AuthorStore.

####### Redux

More terse and elegant way to do the same thing

```javascript
function mapStateToProps(state, ownProps) {
    return { appState: state.authorReducer };
}

export default connect (
  mapStateToProps,    // state to expose to components ... this is a function
  mapDispatchToProps  // actions ... this is a function
)
(AuthorPage);
```

Benefits over Flux: no manual unsubscribe, no lifecycle methods required

In a very simple app with only one reducer and one component you would pass all state down, in a more advanced app you would want to pass only state the component is concerned with

```javascript
// note this is called everytime something in the component changes
function mapStateToProps(state) {
    return {
      appState: state
    };
}

//to use in component:
this.props.appState
```

A memoize library can be used here (reselect is an example)

Ways to handle map dispatch to props ... determining actions available to component

###### Type 1

 ```javascript
this.props.dispatch(loadCourses()); // manually
 ```

###### Type 2
 
 ```javascript
 // specific example
 function mapDispatchToProps(dispatch) {
     return {
       loadCourses: () => {
           dispatch(loadCourses());
       }
     };
 }
 
 // then when in component call with ...
 this.props.loadCourses();
 ```

###### Type 3

 ```javascript
  // auto wire-up
  function mapDispatchToProps(dispatch) {
     return {
       actions: bindActionCreators(actions, dispatch) // bindActionCreators
     };
 }
 
 // then when in component call with ...
 this.props.actions.loadCourses();
```

## A Chat with Redux

- **React**            Hey CourseAction, someone just clicked the "Save Course" button. 
- **Action**           Thanks React! I will dispatch an action so reducers that care can update the state.
- **Reducer**          Ah, thanks action. I see you passed me the current state and the action to perform. I'll make a new copy of the state and return it.
- **Store**            Thanks for updating the state reducer. I'll make sure that all connected components are aware.
- **React-Redux**      Thanks for the new data Mr. Store. I'll now intelligently determine if I should tell React about this change so that it only has to bother with updating the UI when necessary. 

####### Contrast with Flux

- **React**      Hey CourseAction, someone just clicked the "Save Course" button. 
- **Action**     Thanks React! I registered an action creator with the dispatcher, so the dispatcher should take care of notifying all the stores that care.
- **Dispatcher** Let me see who cares about a course being saved. Ah! Looks like CourseStore has registered a callback with me, I let her know.
- **Store**      Hi dispatcher! Thanks for the update, I'll update my data with the payload you sent. Then I'll emit an event to the React components that care.
- **React**      New data from the store! I'll update the UI to reflect this. 

## Building Application with Code 

ReactJs gotcha ... the "this" context in our change handler is wrong.
In the first line "this" context is the caller not the React component. 
The "this" context is the input (textbox), not the component.

To fix the problem bind to the "this" context in the constructor.

```javascript
    onTitleChange(event) {
        const course = this.state.course; // note: "this" here is wrong ... the "this" context here is the caller (form control)
        course.title = event.target.value; // the event passed is the title change with the value being the payload
        this.setState({course: course});
    }
```

Binding statements for the this context look like this:

```javascript
this.onTitleChange = this.onTitleChange.bind(this); 
this.onClickSave = this.onClickSave.bind(this); 
```

Could also handle this in the render() ... the one downside to this is performance

```javascript
<input
type="text"
onChange={this.onTitleChange.bind(this)}
value=...
```

### Wiring up Redux Store

A root reducer that sits on top of all the reducers is created under reducers in a file named index.js

This file maintains a reference to all of the reducers with import statements, and a combineReducers function from the Redux library. 

A reducer can then be referenced using state.courses from the rootReducer.

Under components a new store directory and configureStore file is the Redux store.

In Redux there is a single store.

In this class there is a function that configures the store. This is called at the application's entry point. 

The function can take an initial state argument, but we won't be using it in this application. 

The store references the root reducer created earlier. 

In the store could add support for hot reloading or add support for the redux dev tools extension in Chrome.

In the application's entry point under src\index.js the store is instanced.

Using Provider from the react-redux library the store is attached to all React container components.

Then to wire up a page to work with Redux the react-redux connect function must be referenced.

Instead of:

```javascript
export default CoursesPage;
```

This is used so component can interact with Redux:

```javascript
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
```

Here connect returns a function, and that function calls a function with the CoursesPage as an argument.

 This could also be written as:
 
 ```javascript
const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
export default connectedStateAndProps(CoursesPage);
```

####### Map State to Props

This function returns the properties we'd like to see exposed on our component.
So courses in the return would be this.props.courses

The state argument is the state that is in the Redux store. So state.courses is the course data in the Redux store.

This **courses** property is determined by what was added in the reducer in reducers\index.js

Seen here:

```javascript
const rootReducer = combineReducers({
    courses
});
```

Courses is an alias for courseReducer.

```javascript
function mapStateToProps(state, ownProps) {
    return {
        courses: state.courses
    };
}
```

OwnProps are props that are being attached to this component, this is a reference to the component's own props.

####### Map Dispatch to Props

This determines what actions you want to expose on the component.

If not specified the component automatically gets a dispatch property connected to it.

Call with:

```javascript
this.props.dispatch()
``` 

####### What is Dispatch?

Dispatch is a function that allows you to fire off your actions.

To fire off an action you must first reference the action, like courseActions ... with the createCourse action creator

Then in the onClickSave function, and in there you can dispatch your first action

```javascript
this.props.dispatch(courseActions.createCourse(this.state.course));
```

Actions are payloads of information that send data from your application to your store. These are sent to the store using **store.dispatch()**

This is one of the four store API call reference earlier:

```javascript
store.dispatch(action)
store.subscribe(listener)
store.getState()
replaceReducer(nextReducer) // hot reloading
```

In Flux action creators often trigger the dispatch when invoked, this is **not** the case in Redux, instead the component initiates the dispatch to the store.

The dispatch() function can be accessed directly from the store's API as above, but more than likely you'll use a helper like react-redux's connect() library to call it. 

The store receives the action and passes two arguments to the reducer: the current state tree and the action. 

In this case the root reducer which is configured in initialization of the store is called, and all reducers configured in combineReducers are called.

The new state that is returned by the reducer is saved in the Redux store.

####### Order of Operations on Page:

1. In the event handler for onClickSave
2. In the action creator
3. In the create course of the course reducer
4. In the mapping state to props function (state changed)
5. In the render component

### Wiring up Map Dispatch to Props

If map dispatch to props is left off connect, then a dispatch function will be automatically injected into the component.

It can then be references directly via props like this:

```javascript
this.props.dispatch(courseActions.createCourse(this.state.course));
```

The other way to do this is to add a dispatch of createCourse to props directly so that it can be called like this:

```javascript
this.props.createCourse(this.state.course);
```

This is done by adding mapDispatchToProps to the connect function:

```javascript
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
```

And then wiring up the function createCourse to dispatch courseActions createCourse to pops in mapDispatchToProps like this:

```javascript
function mapDispatchToProps(dispatch) {
    return {
        createCourse: course => dispatch(courseActions.createCourse(course))
    };
}
```

This is Type 2 shown earlier. 

The more terse syntax is Type 3, which allows actions to be accessed directly from props like this:

```javascript
this.props.actions.createCourse(this.state.course);
```

This is done with a call to bindActionCreators, which is a helper function that is part of the Redux library.

It is imported with:

```javascript
import {bindActionCreators} from 'redux'
```

Once available it can be called like this: 

```javascript
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}
```

Note: once this is wired up, so are any action creator functions added to courseActions. Also note the name of property on props changed from createCourse to actions.

Could also have done this:

```javascript
function mapDispatchToProps(dispatch) {
    return {
        createCourse: bindActionCreators(courseActions.createCourse, dispatch)
    };
}
```

In the app this is handled a little differently ... the pattern is that mapDispatchToProps references the function directly:

```javascript
function mapDispatchToProps(dispatch) {
    return {
        getQuestionnaireHistory: bindActionCreators(getQuestionnaireHistory, dispatch),
    };
}
```

And in the action creator dispatch is called:

```javascript
export function getQuestionnaireHistory(key, name) {
    return (dispatch)=>{
        TemplateApi.getTemplateHistory(key).then((data) =>{
            dispatch({
                type: types.QUESTIONNAIRE_HISTORY_GET_SUCCESS, 
                list: data.collection,
                name
            });
        });
    };
}
```

### Five Parts of a Container

1. The constructor, here we initialize the state of the component and setup our bindings.
2. Child functions: onTitleChange, onClickSave, courseRow ... these are called by render.
3. The render function ... would typically call a child component, in CoursesPage this contains markup.
4. PropTypes ... defines prop types that live on props, wired up in mapStateToProps and mapDispatchToProps.
5. Finally have Redux connect and related functions mapStateToProps and mapDispatchToProps.

## Async in Redux

Three libraries for handling async calls in javascript from course

* redux-thunk - dan created
* redux-promise - new and least popular
* redux-saga

redux-thunk - actions return functions
redux-saga - uses generators that yield

redux-thunk ... uses dispatch to return function

```javascript
return AuthorApi.deleteAuthor(id).then(() => {
    dispatch(deletedAuthor(id));
})
```

Add api - mockAuthorApi, mockCourseApi, delay
Add thunk to middleware in configureStore.js
Add thunk to action creator for course

Structure of thunk:

```javascript
export function loadCourse() {
    return function(dispatch) {
        return courseApi.getAllCourses().then(courses => {
            dispatch(loadCoursesSuccess(courses));
        }
    }
}
```

loadCoursesSuccess action

export function loadCoursesSuccess(courses) {
    return { type: types.LOAD_COURSES_SUCCESS, courses };
}

reducer - simply returns courses as the new state

Example in the App, returning a function with dispatch

```javascript
const publish = (id, publishDTO) => {
    
    return (dispatch) => {
        axios.put(system.QD_API_URL + `/questionnaire-templates/${id}/publish`
        , publishDTO)
        .then((response) => {
            return dispatch(publishSuccess(response));
        })
        .catch((response) => {
            return dispatch(publishFailure(response));
        });
    };  
};
```

Fetching the course data when the app loads ...

in the initial app startup in index.js ... after store is configured then action creators are wired up and can be called, call action to load data into store

store.dispatch(loadCourses());

Destructuring/named components? - author states this is using a named component

instead of doing this:

```javascript
render() {
  return (
    ...
    <CourseList courses={this.props.courses}/>
  );
}
```

can do this, which is used in the app:

```javascript
render() {
  const {courses} = this.props;

  return (
    ...
    <CourseList courses={courses}/>
  );
}
```

## Async writes in Redux

Add new ManageCoursePage with template
Add /course route in routes.js
Finished wiring ManageCoursePage and created CourseForm
Create authors reducer
Created initialState.js in reducers folder

Initial state looks like this:

```javascript
export default {
    authors: [],
    course: []
}
```

Then in reducers instead of having

```javascript
export default function courseReducer(state = [], action) {
```

Can have this:

```javascript
export default function courseReducer(state = initialState.authors, action) {
```

New reducers need to be added to the root reducer. This is easy to forget.

#### Authors data

The mapStateToProps function is the place to tranform data from API into shape/form needed for components.

#### Text inputs

Need to create a change handler so text boxes can be typed in.

```javascript
  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({ course: course });
  }
```

Then wire-up the binding

```javascript
this.updateCourseState = this.updateCourseState.bind(this);
```

And the send the change handler to the CourseForm here: 

```javascript
  render() {
      return (
              <CourseForm
                  allAuthors={this.props.authors}
                  onChange={this.updateCourseState}
```

## Saving data

First need a new action. Note getState function below ... this is for when you need additional state from the redux store.

```javascript
export function saveCourse(course) {
    return function(dispatch, getState) {
        return CourseApi.saveCourse(course).then(savedCourse => {
            course.id ? dispatch(updateCourseSuccess(savedCourse)) :
                dispatch(createCourseSuccess(savedCourse));
            }).catch(error => {
                throw(error);
            });
    };
}
```

Then need updates to the reducer ... don't want to do a push here to add a new item to array, this would mutate existing state

```javascript
        case types.CREATE_COURSES_SUCCESS:
            return [
                ...state,
                Object.assign({}, action.course)
            ];
```

### Spread Operator

ES6 spread operator explodes as if all values had been types out.

So if the existing array was this:

[ 1, 2, 3 ]

Then ...state is a new immutable copy of the existing array

return [
     1, 2, 3,
     next element - new instance of action.course
]

```javascript
  return [
      ...state,
      Object.assign({}, action.course)
  ];
```

The update reducer is similar, and looks like this. 
Instead of updating our item in the existing array (which would mutate this array), a new array is created.
This array is composed of all items that are not the one being updated, plus the new item. 

```javascript
  return [
      ...state.filter(course => course.id !== action.course.id),
      Object.assign({}, action.course)
  ];
```

### Wire-up Save Course in Manage Course Page

Add the binding in the constructor

```javascript
this.saveCourse = this.saveCourse.bind(this);
```

Add the event wire-up to the CourseForm component reference

```javascript
    render() {
        return (
                <CourseForm
                    allAuthors={this.props.authors}
                    onChange={this.updateCourseState}
                    onSave={this.saveCourse}  // <-- here
```

Create the event handler

```javascript
saveCourse(event) {
    event.preventDefault();
    this.props.actions.saveCourse(this.state.course);
}
```
Add save course button to course page

### Using React Router's Context to Redirect

To enable using this.context.router do the following:

```javascript
// Pull in the React Router context so router is available on this.context.router
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};
```

Context is a global variable that library authors use, but library consumers should avoid. 

Use this like this:

```javascript
this.context.router.push('/courses');
```

### Populating existing course and adding updates

Here we will use map state to props. This is done is in the smart component, ManageCoursePage.

Add parameter ownProps to map state to props, and use this to pull in the id parameter.

### Life cycle methods 

Note that when the course page loads on refresh the page is empty. This is the same issue that occured in the app, at the time the page first loaded map state to props had not executed.

Instead need to use componentWillReceiveProps ... this is called every time props have changed, as well as any time React thinks props have changed.

The parameter nextProps is handled over. 

```javascript
componentWillReceiveProps(nextProps) {
    if (this.props.course.id != nextProps.course.id) {
        // necessary to populate form when existing course is loaded directly.
        this.setState({course: Object.assign({}, nextProps.course)});
    }
}
```

This may run even if props have not changed.

Populated form via:
    mapStateToProps
    componentWillReceiveProps
    
## Handling Async Status

Status and errors.

App does not have 

 - Initial load indicator
 - Feedback on save
 - API failure information
 
 #### Track and display async status calls
 
 Component that displays moving dots (component by Ryan Florence).
 
 Need to know when ajax calls begin and end. Need new actions file: ajaxStatusActions.
 
 Add code to initialState.js to track number of ajax calls in progress.
 
 In the reducer for ajax calls (which will be called for every action in the system), can check for ajax success like this:
 
 ```javascript
// remember that every time an action is fired all reducers all called
// because of this the following code can be used to check to see if that resulted in success
function actionTypeEndsInSuccess(type) {
    return type.substring(type.length - 8) == '_SUCCESS';
}
```

***NOTE: Remember to add reducer to root reducer***

Wiring this into the actions for courses and authors is done like this.

At the beginning of the thunk, dispatch of the begin ajax call.

```javascript
export function loadAuthors() {
  return function(dispatch) {
    dispatch(beginAjaxCall());  // <-- dispatch action here
    return AuthorApi.getAllAuthors() ...
```

### Connecting to the Redux Store

We should not connect the Header.js to the Redux store ... it is a dumb presentation component (stateless functional) that is displaying status.

Instead we should connect the container component above it to the store via mapStateToProps. Then we should pass state to Header.js via props.

My thought it that this section in header would be modified to include: 

```javascript
const Header = () => {
```

Something that looks like this ... or a boolean flag for ajaxCallsInProgress, true or false.

```javascript
const Header = ({numAjaxCallsInProgress}) => {
```

Then in code do something like (assuming boolean). Note, this doesn't work.

```javascript
{
    if (ajaxCallsInProgress) {
        <LoadingDots interval={100} dots={20}/>
    }
}
```

Code needs to start with ajaxCallsInProgress like this:

```javascript
{
    ajaxCallsInProgress && <LoadingDots interval={100} dots={20}/>
}
```

The container component for Header.js is ./src/components/App.js

This needs to have a mapStateToProps function added, and a constructor added.

```javascript
function mapStateToProps(state) {
    return {
        ajaxCallsInProgress: state.numAjaxCallsInProgress > 0
    };
}
```

Then in the constructor:

```javascript
    constructor(props, context) {
        super(props, context);

        this.state = {
            ajaxCallsInProgress: Object.assign({}, this.props.ajaxCallsInProgress)
        };
```

And header reference. I am still confused about when to use this.state vs this.props here.

In the video the author uses this.props

```javascript
     <Header
         ajaxCallsInProgress={this.state.ajaxCallsInProgress}
     />
```

***Note: don't forget to add reference to connect as this is a connected component now, or mapStateToProps will not be available.

### Using Promises to wait for Thunks

Currently in the ManageCoursePage the saveCourse event fires and immediately redirects the user to the courses page.

The saveCourse function is a thunk and implements promise ... so this.props.actions.saveCourse in the ManageCoursePage can be made to wait by using the then() function.

```javascript
saveCourse(event) {
    event.preventDefault();
    
    this.props.actions.saveCourse(this.state.course)
    .then(() => this.redirect());
}

redirect() {
    this.context.router.push('/courses');
}
```

## Async writes in Redux

### When to use State

A big question in React Redux is when to use local state. If the data is fleeting and the rest of the app won't care about it, then you can use local state.

For something in the ManageCoursePage that is only triggered when the data is saving, create local state of saving

```javascript
this.state = {
  saving: false
};
```

Then in saveCourse(event) setState saving to true.

Set back to false in redirect()

Pass this down to course form as props.

saving={this.state.saving}

Currently input is

disabled={loading}
value={loading ? 'Saving...' : 'Save' }

Change this to saving:

disabled={saving}
value={saving ? 'Saving...' : 'Save' }

Make sure to get this in props and prop Types validation:

CourseForm => ({saving})

Adding Save Notification with toastr

Add import in index.js for toastr
In the redirect add a toast
toastr.success('Course saved');

### Setting up Error Handling

Currently in the saveCourse method of the mockCourseAPI the title is being rejected if it is not long enough.

Right now when Save is clicked nothing happens, page is stuck.

Instead of handling this in the action the author chooses to handle this in the saveCoursePage.

In the saveCourse(event) method there is the following code:

```javascript
this.props.actions.saveCourse(this.state.couse)
  .then(() => this.redirect());
```

Change this to

```javascript
this.props.actions.saveCourse(this.state.couse)
  .then(() => this.redirect())
  .catch(error => {
    toastr.error(error);
    this.setState({saving: false});
  });
```

To disable the pre-loader, dispatch an action when the ajax call fails.

export const AJAX_CALL_ERROR = 'AJAX_CALL_ERROR';

Add an ajaxCallError action creator ... then in the ajaxStatusReducer reduce the number of ajax calls if there is an error.

Update thunk to dispatch this action on error.

courseActions.js

... add named import ...

... saveCourse ...

```javascript
  .catch(error => {
    dispatch(ajaxCallError(error));  // decrements ajax call count, which decrements pre-loader
    throw(error);
  });
```

## Testing React and Production Builds are next topics

Front end testing libraries

Mocha - most popular
Jasmine - similiar to Mocha, but author prefers Mocha
Jest - from Facebook, not as popular - wrapper around Jasmine
Tape - lean and simple
AVA - new kid on block

Chai - assertion library
NPM Expect - author using

Helper library
React test utils - Facebook, verbose API
Enzyme - uses JSDOM for in memory DOM, and Cheerio for selectors?

How to name tests? Configured in package.json

fileName.spec.js
fileName.test.js

Author adds CourseForm.test.js - adds code

## Testing Redux

### Testing Connected Redux Components

The ManageCoursePage is a connected component. To bring it into a test without the overhead of bringing in the provider, change the class definition to add export:

```javascript
export class ManageCoursePage extends React.Component {
```

With this done we can use a named import to get our hands on the unconnected component.

The normal import would look like this (this gets the default export - connected component).

```javascript
import ManageCoursePage from './ManageCoursePage';
```

This is the named import, which references the unconnected class:

```javascript
import {ManageCoursePage} from './ManageCoursePage';
```

### Testing mapStateToProps

Extracting logic out to a separate function. In the case the authorsFormattedForDropdown function.

Author moves this to separate selectors folder.

### Testing Action Creators

See code sample.

### Testing Reducers

Given this input, assert this output.

```javascript
import expect from 'expect';
import courseReducer from './courseReducer';
import * as actions from '../actions/courseActions';

describe('Course Reducer', () => {
  it('should add course when passed "CREATE_COURSE_SUCCESS"', () => {
    const initialState = [{title: 'a'}, {title: 'b'}];
    const newCourse = {title: 'c'};
    const action = actions.createCourseSuccess(newCourse);

    const newState = courseReducer(initialState, action);
    expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual('a');
    expect(newState[1].title).toEqual('b');
    expect(newState[2].title).toEqual('c');
  });

  it('should update course when passed "UPDATE_COURSE_SUCCESS"', () => {
    const initialState = [{id: 'a', title: 'a'}, {id: 'b', title: 'b'}, {id: 'c', title: 'c'}];
    const course = {id:'b', title: 'new title'};
    const action = actions.updateCourseSuccess(course);

    const newState = courseReducer(initialState, action);
    const updateCourse = newState.find(a => a.id === course.id);
    const untouchedCourse = newState.find(a => a.id === 'a');

    expect(updateCourse.title).toEqual('new title');
    expect(untouchedCourse.title).toEqual('a');
    expect(newState.length).toEqual(3);
  });
});
```

### Testing Thunks

Thunks are harder, to test have to mock store and http calls.

Store:       redux-mock-store
HTTP calls:  nock

### Testing the Store

Writing an integration test. These test the interaction of the Action, Store, and Reducers.

Code is located in store.test.js

This uses the store's API calls: 

store.dispatch(action)
store.getState()

```javascript
import expect from 'expect';
import {createStore} from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';

describe('Store', () => {
  it('Should handle creating courses', () => {
    const store = createStore(rootReducer, initialState);
    const course = {title: 'Clean Code'};

    const action  = courseActions.createCourseSuccess(course);
    store.dispatch(action);

    const actual = store.getState().courses[0];
    expect(actual).toEqual(course);
  });
});
```

## Production Builds

The size of bundle.js is very large in dev: 4.8 MB.

Stopped here:

https://app.pluralsight.com/player?course=react-redux-react-router-es6&author=cory-house&name=react-redux-react-router-es6-m14&clip=0&mode=live

## Challenges:

1.  Author administration
     * Shouldn't be able to delete an author that already has a course
2.  Hide empty course list
4.  Message the user if they try to leave the course form with unsaved changes
5.  Add client-side validation to the course form
6.  Handle 404's - manage course page, would need to add logic in mapStateToProps
7.  Show the number of courses in the Header (should be trivial)
8.  Pagination
9.  Sort course table - would be done in mapStateToProps
10. Keep old values for course data so you can revert changes when user navigates to a different page without saving.
