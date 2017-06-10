const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const session = require('express-session');
// const flash = require('connect-flash');
const BasicStrategy = require('passport-http').BasicStrategy;

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true})); // for parsing application/x-www-form-urlencoded
// app.use(session({secret: 'secret cat', resave: true, saveUninitialized: true}));
// app.use(flash());

app.use(passport.initialize()); // initialize passport
// app.use(passport.session());

app.use('/events', require('./router/events.js'));

app.get('/', (req, res, next) => {
  res.send('Hello World!')
  next()
});

app.post('/', (request, response) => response.send("POST"))

app.use((err, request, response, next) => {
  response.send(err);
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))

module.exports = app;

// LocalStrategy
// passport.use(new LocalStrategy((username, password, done)=> {
//   findUser({username: username, password: password}, (err, user, message) => {
//     if(err) return done(err);
//     if(!user) return done(null, false, message);
//     return done(null, user);
//   })
// }))

function findUser(credentials, action) {
  console.log(credentials);
  if(!credentials) return action("No credentials provided");
  else if(credentials.username !== "Amit") return action(null, false, {message: 'Incorrect Username'});
  else if(credentials.password !== "micro") return action(null, false, {message: 'Incorrect Password'});
  return action(null, credentials);
}

// ---------------------------------------------------------

app.get('/login', (req, res, next) => {
  // res.render('local', {message: req.flash('some error we dont know')});
  // res.send(req.flash('some error we dont know'));
  res.send('some error we dont know');
});

// app.post('/login', passport.authenticate("local", { successRedirect: '/', failureRedirect: '/login', failureFlash: false, session: false}));
app.post('/login', (req, res, next) => {
  passport.authenticate("basic", (err, user, info) => {
        console.log(err, user, info);
    if(err) return next(err);
    if(!user) res.status(403).send(info);
    res.send(user);
  })(req, res, next);
});

// ---------------------------------------------------------

// Passport-HTTP
passport.use(new BasicStrategy((username, password, done) => {
  console.log("basicstrategy")
  findUser({username: username, password: password}, (err, user, message) => {
    if(err) return done(err);
    if(!user) return done(null, false, message);
    return done(null, user);
  })
}))

// app.post('/login', passport.authenticate("basic", {session: false}), (err, user, info) => {
//     console.log(err, user, info);
//     if(err) return next(err);
//     if(!user) res.status(403).send(info);
//     res.send(user);
// });


// app.post('/login', passport.authenticate("basic", {session: false}), (req, res) => {
//   res.send("result");
// });

// app.post('/login', (req, res) => {
//   passport.authenticate("basic", {session: false});
//   console.log(passport);
//   res.send("result");
//     // res.json({ username: req.user.username, email: req.user.emails[0].value });
// });
