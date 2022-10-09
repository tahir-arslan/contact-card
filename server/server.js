const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

// set to require `HTML route`
require('./routes/htmlRoutes.js')(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// will use `client` folder
app.use(express.static('../client/dist/'))

app.listen(PORT, function() {
  console.log(`Now listening on port: ${PORT}`);
});