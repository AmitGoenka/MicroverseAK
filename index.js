const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true})); // for parsing application/x-www-form-urlencoded
app.use(session({secret: 'secret cat', resave: true, saveUninitialized: true}));
app.use(flash());

app.use(passport.initialize()); // initialize passport
app.use(passport.session());

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

passport.use(new LocalStrategy((username, password, done)=> {
  findUser({username: username, password: password}, (err, user, message) => {
    if(err) return done(err);
    if(!user) return done(null, false, message);
    return done(null, user);
  })
}))

function findUser(credentials, action) {
  if(!credentials) return action("No credentials provided");
  else if(credentials.username !== "Amit") return action(null, false, {message: 'Incorrect Username'});
  else if(credentials.password !== "micro") return action(null, false, {message: 'Incorrect Password'});

  return action(null, credentials);
}

app.get('/login', (req, res, next) => {
  // res.render('local', {message: req.flash('some error we dont know')});
  res.send(req.flash('some error we dont know'));
});

app.post('/login', passport.authenticate("local", { successRedirect: '/', failureRedirect: '/login', failureFlash: true, session: true}));
