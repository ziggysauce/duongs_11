const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const flash = require('connect-flash');
const sass = require('node-sass');
const path = require('path');
const sassMiddleware = require('node-sass-middleware');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// REQUIRE ROUTES
const indexRoutes = require('./routes/index');
const yearsRoutes = require('./routes/years');
const newsletterRoutes = require('./routes/newsletter');
// const commentRoutes = require('./routes/comment');

const Year = require('./models/year');
const Newsletter = require('./models/newsletter');
const User = require('./models/user');

// const url = process.env.DATABASEURL || 'mongodb://localhost/newsletter';
const url = 'mongodb://localhost/newsletter';
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

// PASSPORT CONFIG
app.use(require('express-session')({
  secret: 'dan thi nguyen made this',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// MIDDLEWARE
// Calls on every route (DRY)
app.use((req,res,next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

// ROUTING
app.use('/', indexRoutes);
app.use('/years', yearsRoutes);
app.use('/years/:id/newsletters', newsletterRoutes);
// app.use('/years/:year/newsletter/:id/comments', commentRoutes);

app.listen(PORT, () => {
  console.log('Server listening on: ' + PORT);
});