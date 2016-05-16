var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var busboyBodyParser = require('busboy-body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var passport	= require('passport');
var config      = require('./config/database'); // get db config file
var User        = require('./app/models/user'); // get the mongoose model
var port        = process.env.PORT || 8080;
var jwt         = require('jwt-simple');
var fs = require('fs');

var specialtyRouter = require('./app/routes/specialtyRouter');
var userRouter = require('./app/routes/userRouter');
var doctorRouter = require('./app/routes/doctorRouter');
var workingTimeRouter = require('./app/routes/workingTimeRouter');
var host = 'http://localhost:8080';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(busboyBodyParser());
// log to console
app.use(morgan('dev'));

app.use(passport.initialize());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});
app.use(express.static('public'));

mongoose.connect(config.database);

require('./config/passport')(passport);

var apiRoutes = express.Router();

apiRoutes.post('/sign-up', function(req, res) {

  if (!req.body.email || !req.body.password) {
    res.json({success: false, msg: 'Please pass email and password.'});
  } else {
    var filename =  '/images/' + Date.now() + req.files.avatar.name;
    var fullFileName = __dirname+ '/public'+ filename;
    fs.writeFile(fullFileName, req.files.avatar.data, function (err) {
      if (err) return console.log(err);
      var user = Object.assign({}, req.body, {bio: "", avatar: host + filename});
      var newUser = new User(user);
      // save the user
      newUser.save(function(err) {
        if (err) {
          console.log(err);
          return res.json({success: false, msg: 'User already exists.'});
        }
        res.json({success: true, msg: 'Successful created new user.'});
      });
    });
  }
});

apiRoutes.post('/authenticate', function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, User, function (err, isMatch) {
        if (isMatch && !err) {
          var token = jwt.encode(user.email, config.secret);
          res.json({success: true, token: 'JWT ' + token});
        } else {
          console.log(err);
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

apiRoutes.use('/specialty', specialtyRouter);
apiRoutes.use('/user', userRouter);
apiRoutes.use('/doctor', doctorRouter);
apiRoutes.use('/working-time', workingTimeRouter);
app.use('/api', apiRoutes);


app.get('/', function(req, res) {
  res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// Start the server
app.listen(port);
console.log('There will be dragons: http://localhost:' + port);
