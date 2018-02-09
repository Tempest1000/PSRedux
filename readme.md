## Dependencies

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

### Stopped here

https://app.pluralsight.com/player?course=react-redux-react-router-es6&author=cory-house&name=react-redux-react-router-es6-m4&clip=7&mode=live
