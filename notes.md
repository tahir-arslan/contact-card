Module 19
focus on optimizing performance of web applications 
PWA's (`progressive web apps`) blend benefits of traditional browser experience with mobile app to address performance issues
Use Chrone DevTools and Google Lighthouse to measure web app performance
DevTools allows you to monitor network traffic and inspect size of resources downloaded to browser
Lighthouse provides performance scoring system based on metrics like application bundle size, time to interaction, time to first meaningful paint, etc
`Client-Server Model` (helps to separate tasks performed by front end/client vs server)
`Webpack` tool to help bundle compressed assets that result from optimizations to deliver smaller app bundle sizes to client
`IndexedDB` a low-level API that allows large amounts of structured data to be stored in browser
`Workbox` offers caching and offline functionality by creating a `service worker`
use `Heroku` for deployment with `Heroku Staging`

PWA's offer many benefits and has access to native funtionalities but cannot use every functionality (only some) ex. cannot use Apple's Siri, Touch/Face ID, Bluetooth. Cannot be installed through popular application marketplaces ex App Store or Play Store. 

Identify possible performance bottlenecks:
- google "HTML best practices for website preformance optimization"
    be sure to explore aspects like Multiple CSS links within `<head>` tag, and multiple `<script>` tags

`Client-Server Model` architectural pattern of comp network in which one or many clients request and receive service from centralized server

created a `client` folder and `cd` into it. then executed `npm init` inside `client` folder. now client and server are essentially two seperate applications inside this project.

created `server` folder, `npm init` inside `server` folder
installed expres inside here as well `npm i express`
then added `server.js`
    made `routes/htmlRoutes.js`

notice now we have two `package.json` scripts. will use `Concurrently` to run them both simultaneously.
- initialize node `npm init` in root (now there will be 3 `package.json` files)
- `npm i concurrently` at root
- in `package.json` at root, add following scripts in `scripts`:
            "start:dev": "concurrently \"cd server && npm run server\" \"cd client && npm run dev\"",
            "start": "cd server && node server.js",
            "server": "cd server nodemon server.js --ignore client",
            "build": "cd client && npm run build",
            "client": "cd client && npm start"
    - created an install script that will be used by Concurrently
    can test to see if this worked by started server from root