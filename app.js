const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const sass = require('node-sass');
const path = require('path');
const sassMiddleware = require('node-sass-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// REQUIRE ROUTES
const indexRoutes = require('./routes/index');
// const commentRoutes = require('./routes/comment');
const yearsRoutes = require('./routes/years');
// const newsletterRoutes = require('./routes/newsletter');

const url = process.env.DATABASEURL || 'mongodb://localhost/newsletter';
mongoose.connect(url);

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(flash());

app.use(
  sassMiddleware({
    src: __dirname + '/sass',
    dest: __dirname + '/public/stylesheets',
    prefix: '/stylesheets',
    debug: true
  })
);

app.use(express.static(path.join(__dirname, 'public')));

// ROUTING
app.use('/', indexRoutes);
app.use('/years', yearsRoutes);
// app.use('/years/:year/newsletter', newsletterRoutes);
// app.use('/years/:year/newsletter/:id/comments', commentRoutes);

app.listen(PORT, () => {
  console.log('Server listening on: ' + PORT);
});