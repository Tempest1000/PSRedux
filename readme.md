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

### Building Development Environment

Stopped at: https://app.pluralsight.com/player?course=react-redux-react-router-es6&author=cory-house&name=react-redux-react-router-es6-m2&clip=3&mode=live

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






