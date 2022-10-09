Module 19
focus on optimizing performance of web applications 
PWA's (`progressive web apps`) blend benefits of traditional browser experience with mobile app to address performance issues
Use Chrone DevTools and Google Lighthouse to measure web app performance
DevTools allows you to monitor network traffic and inspect size of resources downloaded to browser
Lighthouse provides performance scoring system based on metrics like application bundle size, time to interaction, time to first meaningful paint, etc
`Google Lighthouse` chrome tool that audits web apps and returns results for performance/accessibility/PWA and more
`Concurrently` npm module that allows multiple commands to execute at the same time
`Client-Server Model` (helps to separate tasks performed by front end/client vs server)
`Webpack` tool to help bundle compressed assets that result from optimizations to deliver smaller app bundle sizes to client
`IndexedDB` a low-level API that allows large amounts of structured data to be stored in browser
    `idb` a small wrapper that makes it easier to implement IndexedDB CRUD methods
`Workbox` offers caching and offline functionality by creating a `service worker`
use `Heroku` for deployment with `Heroku Staging` which allows to run a new build of the app in a production-like setting. once ready, can switch into production mode for final build
`Babel` allows to convert E56 (ECMAScript 2015+) into a backward compatible version of JS so app can be used on older browsers
`HTMLWebpackPlugin` used to generate an HTML page in build directory
`webpack-pwa-manifest` plugin that generates a `manifest.json` for PWA with auto icon resizing and fingerprinting support
`heroku-prebuild` hook used to tailor pre-build process

in this module, will take an existing app and adapt it to client server model
then add webpack to improve speed/performance
then use IndexedDB using CRUD to build an interactive card feature
finally, add a service worker (for offline functionality) and a `manifest.json` to give users a fast network independent experience that works on any device

PWA's offer many benefits and has access to native funtionalities but cannot use every functionality (only some) ex. cannot use Apple's Siri, Touch/Face ID, Bluetooth. Cannot be installed through popular application marketplaces ex App Store or Play Store. 

Identify possible performance bottlenecks:
- google "HTML best practices for website preformance optimization"
    be sure to explore aspects like Multiple CSS links within `<head>` tag, and multiple `<script>` tags
some common performance considerations (from video in module):
- algorithm for adding items to an order has Big O notation of On^2 which is very slow
- bunch of synchronous code that can be made asynchronous
- large logo size can slow down images on phones (which can be compressed without compromising quality via `idb`)
- whitespace in code (improves readability but slows down loads) minifying code => smaller file sizes and less network transfer times
- a lot of JS libraries were installed but not being used and forgot to uninstall
- all JS files are being loaded on each page but they're not all being used on each page
from google search for above:
- enable compression for files larger than 150 bytes (ex using `Gzip`)
- minify code (recommended: `CSSNano` and `Uglify JS`)
- reduce redirects
- remove render-blocking JS (browsers need to build DOM tree by parsing HTML before page can render. if browser encounters a script during this process, it has to stop and execute script before it can continue to parse and render page)
- leverage browser caching (caches user info so on revisit browser doesn't have to load entire page. set an expiration date for cache, 1 year is reasonable [unless design changes frequently])
- improve server response time (server response time affected by traffic, resources each page uses, software server uses, hosting solution used. to improve server response, look for performance bottlenecks like slow db queries/routing/lack of adequate memory. optimal server response time under 200ms)
- use a content distribution network (CDN) are network of servers used to distribute load of delivering content (copies of your site are stored at multiple geographically diverse data centers so users have faster more reliable access to web app)
- optimize images
from module itself:
- unnecessary JS can have sig effect on "time to interactive" score in lighthouse sicne that metric traks how long it takes for web app to become interactive through use of event handlers
- viewport is the physical width of a device. if content from app does not fit within dimensions, rendering issues may occur
    - manually declaring and setting viewport leads to better mobile responsiveness (this overwrites default behaviour of websites viewed on mobile devices)
    - using `width` property allows us to declare that the width of the app should use the width of the device. 
    - property `initial-scale` allows you to set any initial zoom when app first loads

`Client-Server Model` architectural pattern of comp network in which one or many clients request and receive service from centralized server

from starter code, rename `assets` to `src` (for production env, code from `dist` will be used not from `src`)
created `src/css/index.css` and imported other css files into it using ` @import "./filename.css"; `
    update filepath of all image tags

creating client side:
created a `client` folder at root. `cd` into it. then execut `npm init` to create `package.json`. now client and server are essentially two seperate applications inside this project.

creating server side:
created `server` folder, `npm init` inside it => `package.json`
installed `Express.js` inside here as well `npm i express`
then added `server.js`
    created `server/routes/htmlRoutes.js`

run client+server concurrently:
notice now we have two `package.json` scripts. will use `Concurrently` to run them both simultaneously via scripts.
- initialize node `npm init` in root (now there will be 3 `package.json` files)
- `npm i concurrently` at root
- in `package.json` at root, add following scripts in `scripts`:
            "start:dev": "concurrently \"cd server && npm run server\" \"cd client && npm run dev\"",
            "start": "cd server && node server.js",
            "server": "cd server nodemon server.js --ignore client",
            "build": "cd client && npm run build",
            "client": "cd client && npm start"
    - created an install script that will be used by Concurrently
    can test to see if this worked by executing `npm install` which will install dependencies from all 3 `package.json` files

19.2
will be working with `client` dir to use `webpack`

`webpack` should only be used during development for testing, so when installing should execute `npm install webpack webpack-cli --save-dev` 

webpack is configurable and relies on 5 core concepts: entry, output, mode, plugins, and loaders.

code modularization is vital, however too many files slows down app. `webpack` aids developers by taking modularized static files and compiling them into a single long file/bundle during build phase for use by browser => faster more performant experience

`webpack` bundles static assets that are in the `src` dir. it requires an `entry point` (usually `index.js`) and maps out all of it's dependencies that are imported *into the entry file*
    output will appear in a new `dist` dir generated by webpack 

setup based on: https://webpack.js.org/guides/getting-started/#using-a-configuration

- `npm install webpack webpack-cli --save-dev` in client directory
- update `package.json` and remove `"main: index.js"` and replace with `"private": "true"`
    removing main is because entry point will be set so main: index.js not mandatory to define
- create `client/webpack.config.js` in client
    follow documentation and set entry point to `src/js/index.js`
- replace `"test"` with "`build": "webpack"`
- replace `"main": "index.js"` with `"private": "true",` this will prevent accidently publishing code before making it public

to `client/src/js/index.js` import depenedencies:
    `import  "./form";
    import "./submit";`
        - `index.js` is now an entry point that webpack will look at to determine what dependencies/assets are needed for app to work

create `client/webpack.config.js` and add (entry and output; 3 more concepts remain):
    const path = require('path');
    module.exports = {
        entry: './src/js/index.js',
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'dist'),
        },
    };
- note: output contains seperate lines for filename and dir
- test this by cd to `client`, `npm install` and `npm run build`

manually copy `client/index.html` into new `dist` dir. remove `ssrc` linking form and submit files (they are already imported via entry point)
- add `<script src="./main.js"></script>` to `index.html` to link `main.js` bundle

open using live server, will see images are not loading! this is because only JS files are bundled, need to add functionality to webpack setup to bundle images as well

bundle images:
now to setup webpack so it will work in development mode, be more predictable, and make debugging easier
    in `client/package.json` update script to run in development mode: `"build": "webpack --mode development",`
add helper scripts:
    `"dev": "webpack-dev-starter",`
    `"start": "webpack --watch"`

in `client/webpack.config.js` change `main.js` to `bundle.js`, add `mode: 'development',`

add rule to handle image files:
        module: {
            rules: [
                {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                },
            ]
        }
- import images to entry point
        window.addEventListener('load', function () {
            document.getElementById('logo').src = Logo;
            document.getElementById('bearThumbnail').src = Bear;
            document.getElementById('dogThumbnail').src = Dog;
        });
- delete dist , `npm install`, `npm run build`, copy `index.html` into dist, change code to src bundle.js

webpack loader:
allows us to configure webpack to bundle more than just JS since vanilla webpack only understands JS and JSON files
- webpack loader preprocesses other file types so it can be bundled by webpack
- loaders can even transpile file type. in our case we will use npm module called `Babel`

style loader:
`npm install --save-dev style-loader css-loader babel-loader babel-polyfill @babel/core @babel/preset-env` (`--save-dev` same as `-D` this ensures they are installed as a development dependency and will not be used during production)
- config webpack.config.js according to documentation
- once css is linked, can remove link to bootstrap CDN and CSS file in `client/index.html`

steps to bundle bootstrap:
- first `npm install bootstrap @popperjs/core`
- import boostrap to entry point

plugins:
loaders transform modules to allow input of different file types (ex CSS) into entry point, plugins make webpack more flexible with by performing a variety of tasks
- we will use webpack plugin to auto gen CSS and HTML directly into `dist` dir

`npm install -D html-webpack-plugin` in client dir
- import into `client/webpack.config.js`
- must make `new` instance of plugin class to use it
    then add `template` property (defines which file should server as template for generated file, in this case `client/index.html)
    add `title` property to define index.html's `<title>` el

at this point, no more need to add `<script src="./bundle.js"></script>` to the end of index.html since script is being auto gen'd

can test build locally using `heroku local web` then deploy app to staging env. steps to do so:
- in root `package.json` add key pair for node and it's version
    can do `node -v` or `node -version` to get this info
- add prebuild hook script telling Heroku to install dev dependencies (by default heroku will get rid of all dev dependencies)
    `"heroku-prebuild": "npm install --dev"`
- update `server/server.js` to run app from `dist` dir (middleware)
- `server/routes/htmlRoutes.js` make similar change to target `index.html` from `dist` dir
- from root dir: `heroku login` -> `npm install` -> `heroku local web` -> open `localhost:5000` check if app still functions correctly
- merge to `develop` then `main`
- `heroku create --remote staging` in main
- update staging app settings to development mode since we only want to work in development (only need to do this once)
    `heroku config:set NODE_ENV=development --remote staging`
- push to heroku to create heroku staging build
        git add -A
        git commit -m "exText"
        git push staging main

19.3
differences between IndexedDB and localStorage/sessionStorage: allows persisting data and to query data since it's stored using indexes, therefore access to db in browser
    since it is browser based, also allows user offline interaction or through limited internet connectivity

we are able to use IndexedDB with native JS but will use `idb` package for assitence in allowing us to develop modular and maintainable code whenever we want to create/access IndexedDB DB

following `https://www.npmjs.com/package/idb` documentation:
cd client, `npm install idb`
`client/src/js/database.js`
- import idb and regenerator-runtime/runtime
- write exported async function `initDb` which will open a connection with IndexedDB API, configure it, and initialize IndexedDB db
- use `upgrade` to add schema to be initialized if it is already not via `db.objectStoreNames` which is checking for `contacts`
- use `db.createObjectStore` with `keyPath` which will instruct browser how and where to extract keys with key `id` and value `autoIncrement: true`

export `initDb` into `client/src/js/index.js`
in `root/package.json` alter `start` script

implement POST and PUT to IndexedDB (see `getDb( )` and `postDb( )` in `database.js`

navigate to root, `npm start`, `localhost:3001` for testing