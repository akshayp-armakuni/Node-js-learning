const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
// const expressHbs =   require('express-handlebars');

const app = express();

// while working with handlebars

// app.engine(
//   'hbs',
//   expressHbs({
//     layoutsDir: 'views/layouts/',
//     defaultLayout: 'main-layout',
//     extname: 'hbs'
//   })
// );
app.set('view engine', 'ejs');
app.set('views', 'views');

// while working with pug
// app.set('view engine', 'pug');

const adminData = require("./routes/admin");
const shopeRoutes = require("./routes/shope");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/admin", adminData.routes);
app.use(shopeRoutes);

app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
  res.status(404).render('404', {pageTitle: 'Page Not Found'})

});

app.listen(3000);
