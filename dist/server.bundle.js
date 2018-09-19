/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 43);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getToken = getToken;
	
	var _passport = __webpack_require__(13);
	
	var _passport2 = _interopRequireDefault(_passport);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(9)(_passport2.default);
	
	// get token
	function getToken(headers) {
	  if (headers && headers.authorization) {
	    var parted = headers.authorization.split(' ');
	    if (parted.length === 2) {
	      return parted[1];
	    }
	  }
	  return null;
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var config = {
	  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/uspomene',
	  port: process.env.PORT || 8000,
	  secret: 'mernuspomene'
	};
	
	exports.default = config;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var account = exports.account = {
	  name: 'Uspomene',
	  user: 'selektingtest@gmail.com',
	  pass: 'Selekting123'
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("sanitize-html");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mongoose = __webpack_require__(0);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	var _mongooseAutoIncrement = __webpack_require__(11);
	
	var _mongooseAutoIncrement2 = _interopRequireDefault(_mongooseAutoIncrement);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Schema = _mongoose2.default.Schema;
	
	
	var memorySchema = new Schema({
	  memoryid: { type: 'Number' },
	  activated: { type: 'Boolean' },
	  personalInfo: {
	    name: {
	      first: { type: 'String', required: true },
	      last: { type: 'String', required: true }
	    },
	    phone: { type: 'Number', required: true },
	    email: { type: 'String', required: true },
	    place: {
	      city: { type: 'String', default: null },
	      address: { type: 'String', default: null }
	    }
	  },
	  deceased: {
	    name: {
	      first: { type: 'String', required: true },
	      last: { type: 'String', required: true }
	    },
	    biography: { type: 'String', default: null },
	    religion: { type: 'String', default: null },
	    dateOfBirth: { type: 'Date', required: true },
	    dateOfDeath: { type: 'Date', required: true },
	    birthPlace: { type: 'String', default: null },
	    latinBirthPlace: { type: 'String', default: null },
	    placeOfDeath: { type: 'String', default: null },
	    latinPlaceOfDeath: { type: 'String', default: null },
	    deathCertificate: { type: 'String', required: true },
	    photo: { type: ['String'], default: ['logofinalgold2.png'] },
	    video: { type: 'String', default: null }
	  },
	  dateAdded: { type: 'Date', default: Date.now },
	  premium: {
	    isPremium: { type: 'Boolean', default: false },
	    paidAt: { type: 'Date', default: '1970-01-01T21:35:41.969Z' },
	    trackId: { type: 'String', default: '' },
	    payStatus: { type: 'String', default: null }
	  },
	  note: { type: 'String', default: null },
	  comment: { type: 'String', default: null },
	  lastEdited: { type: 'Date', default: Date.now },
	  status: { type: 'String', default: 'Obrada' }
	});
	
	memorySchema.plugin(_mongooseAutoIncrement2.default, { field: 'memoryid' });
	
	exports.default = _mongoose2.default.model('Memory', memorySchema);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mongoose = __webpack_require__(0);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Schema = _mongoose2.default.Schema;
	
	var priceSchema = new Schema({ value: { type: Number, required: true } });
	
	exports.default = _mongoose2.default.model('Price', priceSchema);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mongoose = __webpack_require__(0);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	var _mongooseAutoIncrement = __webpack_require__(11);
	
	var _mongooseAutoIncrement2 = _interopRequireDefault(_mongooseAutoIncrement);
	
	var _mongooseUniqueValidator = __webpack_require__(34);
	
	var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Schema = _mongoose2.default.Schema;
	
	
	var userSchema = new Schema({
	  userid: { type: 'Number' },
	  username: { type: 'String', unique: true, required: true },
	  password: { type: 'String', required: true },
	  email: { type: 'String', unique: true, required: true },
	  permission: { type: 'String', default: 'Moderator' },
	  dateAdded: { type: 'Date', default: Date.now }
	});
	
	userSchema.plugin(_mongooseUniqueValidator2.default);
	userSchema.plugin(_mongooseAutoIncrement2.default, { field: 'userid' });
	
	exports.default = _mongoose2.default.model('User', userSchema);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mail = mail;
	
	var _nodemailer = __webpack_require__(35);
	
	var _nodemailer2 = _interopRequireDefault(_nodemailer);
	
	var _acc = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function mail(receiver, msg, subj) {
	  var transporter = _nodemailer2.default.createTransport({
	    host: 'smtp.gmail.com',
	    port: 587,
	    secure: false, // true for 465, false for other ports
	    service: 'gmail',
	    auth: {
	      user: _acc.account.user,
	      pass: _acc.account.pass
	    }
	  });
	
	  var mailOptions = {
	    // setovan je selekting kao testni samo
	    from: '"' + _acc.account.name + '" < ' + _acc.account.user + ' >',
	    to: receiver,
	    subject: subj,
	    //text: msg, // Dodati poruku (vidjet s Damirom),trenutno je testni text
	    html: msg
	  };
	
	  // send mail with defined transport object
	  transporter.sendMail(mailOptions, function (error, info) {
	    if (error) {
	      console.log(error);
	      return error;
	    }
	    console.log('Succes sending mail');
	  });
	
	  return { msg: 'Success' };
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	var _user = __webpack_require__(7);
	
	var _user2 = _interopRequireDefault(_user);
	
	var _config = __webpack_require__(2);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var JwtStrategy = __webpack_require__(14).Strategy;
	var ExtractJwt = __webpack_require__(14).ExtractJwt;
	
	// load up the user model
	
	
	module.exports = function (passport) {
	  var opts = {};
	  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
	  opts.secretOrKey = _config2.default.secret;
	  passport.use(new JwtStrategy(opts, function (jwtPayload, done) {
	    _user2.default.findOne({ id: jwtPayload.id }, function (err, user) {
	      if (err) {
	        return done(err, false);
	      }
	      if (user) {
	        done(null, user);
	      } else {
	        done(null, false);
	      }
	    });
	  }));
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("mongoose-auto-increment-2");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("multer");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("passport");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("passport-jwt");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("webpack");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(10);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _compression = __webpack_require__(27);
	
	var _compression2 = _interopRequireDefault(_compression);
	
	var _mongoose = __webpack_require__(0);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	var _bodyParser = __webpack_require__(26);
	
	var _bodyParser2 = _interopRequireDefault(_bodyParser);
	
	var _path = __webpack_require__(36);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _cors = __webpack_require__(28);
	
	var _cors2 = _interopRequireDefault(_cors);
	
	var _helmet = __webpack_require__(31);
	
	var _helmet2 = _interopRequireDefault(_helmet);
	
	var _memory = __webpack_require__(5);
	
	var _memory2 = _interopRequireDefault(_memory);
	
	var _mail = __webpack_require__(8);
	
	var _acc = __webpack_require__(3);
	
	var _webpack = __webpack_require__(15);
	
	var _webpack2 = _interopRequireDefault(_webpack);
	
	var _webpackConfig = __webpack_require__(25);
	
	var _webpackConfig2 = _interopRequireDefault(_webpackConfig);
	
	var _webpackDevMiddleware = __webpack_require__(41);
	
	var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);
	
	var _webpackHotMiddleware = __webpack_require__(42);
	
	var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);
	
	var _config = __webpack_require__(2);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _post = __webpack_require__(23);
	
	var _post2 = _interopRequireDefault(_post);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Initialize the Express App
	
	// Webpack Requirements
	var app = new _express2.default();
	
	// Set Development modes checks
	var isDevMode = process.env.NODE_ENV === 'development' || false;
	
	// Run Webpack dev server in development mode
	if (isDevMode) {
	  var compiler = (0, _webpack2.default)(_webpackConfig2.default);
	  app.use((0, _webpackDevMiddleware2.default)(compiler, { noInfo: true, publicPath: _webpackConfig2.default.output.publicPath }));
	  app.use((0, _webpackHotMiddleware2.default)(compiler));
	}
	// Import required modules
	
	
	// Set native promises as mongoose promise
	_mongoose2.default.Promise = global.Promise;
	
	// MongoDB Connection
	_mongoose2.default.connect(_config2.default.mongoURL, function (error) {
	  if (error) {
	    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
	    throw error;
	  }
	});
	
	app.use((0, _cors2.default)());
	app.use((0, _helmet2.default)());
	app.options((0, _cors2.default)());
	app.use(function (req, res, next) {
	  if (res.method === 'OPTIONS') {
	    res.status(204).end();
	  } else {
	    res.header('Access-Control-Allow-Origin', '*');
	    res.header('Allow-From', 'http://node.wereact.de');
	    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	    res.header('Access-Control-Allow-Credentials', 'false');
	    res.header('Access-Control-Max-Age', '86400'); // 24 hours
	    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
	    next();
	  }
	});
	// Apply body Parser and server public assets and routes
	app.use((0, _compression2.default)());
	app.use(_bodyParser2.default.json({ limit: '20mb' }));
	app.use(_bodyParser2.default.urlencoded({ limit: '20mb', extended: false }));
	app.use(_express2.default.static(_path2.default.resolve(__dirname, '../dist/client/slike')));
	app.use(_express2.default.static(_path2.default.resolve(__dirname, '../dist/client/about')));
	app.use(_express2.default.static(_path2.default.resolve(__dirname, '../dist/client/Slike')));
	app.use(_express2.default.static(_path2.default.resolve(__dirname, '../dist/client')));
	app.use('/', _post2.default);
	
	// middleware for error handling
	app.use(function (err, req, res) {
	  res.status(500).json(err);
	});
	
	// start app
	app.listen(_config2.default.port, function (error) {
	  if (!error) {
	    console.log('MERN is running on port: ' + _config2.default.port + '!'); // eslint-disable-line
	  }
	});
	
	// cron job
	var CronJob = __webpack_require__(29).CronJob;
	var job = new CronJob({
	  cronTime: '00 00 02 * * 0-6',
	  onTick: function onTick() {
	    var date1 = new Date(Date.now());
	    _memory2.default.find({ 'premium.isPremium': true }, 'premium memoryid email').then(function (memory) {
	      memory.forEach(function (item) {
	        var date2 = new Date(item.premium.paidAt);
	        var timeDiff = Math.abs(date1.getTime() - date2.getTime());
	        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
	        if (diffDays >= 358 && diffDays <= 365) {
	          var msg = '<h1>Obavijest o Premium</h1>\n                     <p>Vasa premium (id: ' + item.memoryid + ') uspomena istice za manje od 7 dana</p>';
	          (0, _mail.mail)(item.email, msg, 'Uspomene obavijet o premium');
	        } else if (diffDays > 365) {
	          var msg2 = '<h1>Obavijest o Premium</h1>\n                     <p>Vasa premium (id: ' + item.memoryid + ') uspomena je istekla i status vase uspomene je free</p>';
	
	          _memory2.default.findOneAndUpdate({ memoryid: item.memoryid }, { $set: { 'premium.isPremium': false } }).then(function (res) {}).catch(function (err) {
	            throw err;
	          });
	          (0, _mail.mail)(item.email, msg2, 'Uspomene obavijest o premium');
	        }
	      });
	    }).catch(function (err) {
	      throw err;
	    });
	  },
	  start: false,
	  timeZone: 'Europe/Sarajevo'
	});
	job.start();
	
	exports.default = app;
	/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("babel-polyfill");

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.uploadPicture = exports.updateAboutUs = exports.createAbout = exports.getAboutUs = undefined;
	
	// get about us
	var getAboutUs = exports.getAboutUs = function () {
	  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
	    var about;
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            _context.prev = 0;
	            _context.next = 3;
	            return _about2.default.find({}).exec();
	
	          case 3:
	            about = _context.sent;
	
	            res.json({ about: about });
	            _context.next = 10;
	            break;
	
	          case 7:
	            _context.prev = 7;
	            _context.t0 = _context['catch'](0);
	
	            res.status(500).json(_context.t0);
	
	          case 10:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this, [[0, 7]]);
	  }));
	
	  return function getAboutUs(_x, _x2) {
	    return _ref.apply(this, arguments);
	  };
	}();
	
	// create
	
	
	var createAbout = exports.createAbout = function () {
	  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
	    var newAbout;
	    return regeneratorRuntime.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            _context2.prev = 0;
	            newAbout = new _about2.default(req.body.about);
	
	            newAbout.name = (0, _sanitizeHtml2.default)(newAbout.name);
	            newAbout.text = (0, _sanitizeHtml2.default)(newAbout.text);
	            newAbout.photo = (0, _sanitizeHtml2.default)(newAbout.photo);
	            _context2.next = 7;
	            return newAbout.save(function () {
	              res.status(200).json({ message: 'About inserted' });
	            });
	
	          case 7:
	            _context2.next = 12;
	            break;
	
	          case 9:
	            _context2.prev = 9;
	            _context2.t0 = _context2['catch'](0);
	
	            res.status(400).json(_context2.t0);
	
	          case 12:
	          case 'end':
	            return _context2.stop();
	        }
	      }
	    }, _callee2, this, [[0, 9]]);
	  }));
	
	  return function createAbout(_x3, _x4) {
	    return _ref2.apply(this, arguments);
	  };
	}();
	// update about us
	
	
	var updateAboutUs = exports.updateAboutUs = function () {
	  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
	    var token, updatedAbout;
	    return regeneratorRuntime.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            token = (0, _getToken.getToken)(req.headers);
	
	            if (!token) {
	              _context3.next = 16;
	              break;
	            }
	
	            _context3.prev = 2;
	            updatedAbout = req.body.about;
	
	            updatedAbout.name = (0, _sanitizeHtml2.default)(updatedAbout.name);
	            updatedAbout.text = (0, _sanitizeHtml2.default)(updatedAbout.text);
	            updatedAbout.lastUpdated = Date.now();
	            _context3.next = 9;
	            return _about2.default.findByIdAndUpdate(req.params.id, updatedAbout, function (err, result) {
	              if (err) {
	                throw err;
	              } else if (result === null) {
	                res.status(404).json({ msg: 'No about image' });
	              }
	              res.status(202).json({ message: 'AboutUs updated' });
	            });
	
	          case 9:
	            _context3.next = 14;
	            break;
	
	          case 11:
	            _context3.prev = 11;
	            _context3.t0 = _context3['catch'](2);
	
	            res.status(500).json(_context3.t0);
	
	          case 14:
	            _context3.next = 17;
	            break;
	
	          case 16:
	            res.status(403).send({ success: false, msg: 'Unauthorized.' });
	
	          case 17:
	          case 'end':
	            return _context3.stop();
	        }
	      }
	    }, _callee3, this, [[2, 11]]);
	  }));
	
	  return function updateAboutUs(_x5, _x6) {
	    return _ref3.apply(this, arguments);
	  };
	}();
	
	// upload picture for about
	
	
	var uploadPicture = exports.uploadPicture = function () {
	  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
	    var storag, upload;
	    return regeneratorRuntime.wrap(function _callee4$(_context4) {
	      while (1) {
	        switch (_context4.prev = _context4.next) {
	          case 0:
	            storag = _multer2.default.diskStorage({
	              destination: function destination(reqq, file, callback) {
	                callback(null, 'dist/client/about');
	              },
	              filename: function filename(reqq, file, callback) {
	                callback(null, file.originalname);
	              }
	            });
	            _context4.prev = 1;
	            _context4.next = 4;
	            return (0, _multer2.default)({ storage: storag }, {
	              limits: {
	                fieldNameSize: 50,
	                files: 1,
	                fileSize: 5 * 1024 * 1024
	              }
	            }).single('file');
	
	          case 4:
	            upload = _context4.sent;
	
	            upload(req, res, function (err) {
	              if (err) {
	                throw err;
	              } else {
	                res.status(200).send({ message: 'Uploaded', photo: req.file.originalname });
	              }
	            });
	            _context4.next = 11;
	            break;
	
	          case 8:
	            _context4.prev = 8;
	            _context4.t0 = _context4['catch'](1);
	
	            res.status(409).json(_context4.t0);
	
	          case 11:
	          case 'end':
	            return _context4.stop();
	        }
	      }
	    }, _callee4, this, [[1, 8]]);
	  }));
	
	  return function uploadPicture(_x7, _x8) {
	    return _ref4.apply(this, arguments);
	  };
	}();
	
	var _about = __webpack_require__(22);
	
	var _about2 = _interopRequireDefault(_about);
	
	var _sanitizeHtml = __webpack_require__(4);
	
	var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);
	
	var _multer = __webpack_require__(12);
	
	var _multer2 = _interopRequireDefault(_multer);
	
	var _getToken = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getSoonToExpireMems = exports.filterInfScr = exports.filterGetPug = exports.success = exports.pay = exports.filterMemories = exports.uploadCertificate = exports.uploadPicture = exports.updateActivated = exports.updateStatusMemory = exports.deleteMemory = exports.updateMemory = exports.createMemory = exports.oneMemoryByID = exports.oneMemory = exports.approvedMemories = exports.pendingMemories = exports.archivedMemories = undefined;
	
	// Get specific memories
	var archivedMemories = exports.archivedMemories = function () {
	  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
	    var token, memory;
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            token = (0, _getToken.getToken)(req.headers);
	
	            if (!token) {
	              _context.next = 14;
	              break;
	            }
	
	            _context.prev = 2;
	            _context.next = 5;
	            return _memory2.default.find({ $or: [{ status: 'Odobreno' }, { status: 'Stornirano' }, { status: 'Obrisano' }] }).sort('-dateAdded').exec();
	
	          case 5:
	            memory = _context.sent;
	
	            res.json({ memory: memory });
	            _context.next = 12;
	            break;
	
	          case 9:
	            _context.prev = 9;
	            _context.t0 = _context['catch'](2);
	
	            res.status(500).send(_context.t0);
	
	          case 12:
	            _context.next = 15;
	            break;
	
	          case 14:
	            res.status(403).send({ success: false, msg: 'Unauthorized.' });
	
	          case 15:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this, [[2, 9]]);
	  }));
	
	  return function archivedMemories(_x, _x2) {
	    return _ref.apply(this, arguments);
	  };
	}();
	
	var pendingMemories = exports.pendingMemories = function () {
	  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
	    var token, memory;
	    return regeneratorRuntime.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            token = (0, _getToken.getToken)(req.headers);
	
	            if (!token) {
	              _context2.next = 14;
	              break;
	            }
	
	            _context2.prev = 2;
	            _context2.next = 5;
	            return _memory2.default.find({ status: 'Obrada' }).sort('-dateAdded').exec();
	
	          case 5:
	            memory = _context2.sent;
	
	            res.json({ memory: memory });
	            _context2.next = 12;
	            break;
	
	          case 9:
	            _context2.prev = 9;
	            _context2.t0 = _context2['catch'](2);
	
	            res.status(500).send(_context2.t0);
	
	          case 12:
	            _context2.next = 15;
	            break;
	
	          case 14:
	            res.status(403).send({ success: false, msg: 'Unauthorized.' });
	
	          case 15:
	          case 'end':
	            return _context2.stop();
	        }
	      }
	    }, _callee2, this, [[2, 9]]);
	  }));
	
	  return function pendingMemories(_x3, _x4) {
	    return _ref2.apply(this, arguments);
	  };
	}();
	
	var approvedMemories = exports.approvedMemories = function () {
	  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
	    var memory;
	    return regeneratorRuntime.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            _context3.prev = 0;
	            _context3.next = 3;
	            return _memory2.default.find({ status: 'Odobreno' }).sort('-dateAdded').exec();
	
	          case 3:
	            memory = _context3.sent;
	
	            if (memory === null) {
	              res.status(404).json({ msg: 'Memory not found.' });
	            } else {
	              res.status(200).json({ memory: memory });
	            }
	            _context3.next = 10;
	            break;
	
	          case 7:
	            _context3.prev = 7;
	            _context3.t0 = _context3['catch'](0);
	
	            res.status(500).send(_context3.t0);
	
	          case 10:
	          case 'end':
	            return _context3.stop();
	        }
	      }
	    }, _callee3, this, [[0, 7]]);
	  }));
	
	  return function approvedMemories(_x5, _x6) {
	    return _ref3.apply(this, arguments);
	  };
	}();
	
	// Get single memory
	
	
	var oneMemory = exports.oneMemory = function () {
	  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
	    var memory;
	    return regeneratorRuntime.wrap(function _callee4$(_context4) {
	      while (1) {
	        switch (_context4.prev = _context4.next) {
	          case 0:
	            _context4.prev = 0;
	            _context4.next = 3;
	            return _memory2.default.findById(req.params.id).exec();
	
	          case 3:
	            memory = _context4.sent;
	
	            if (memory === null) {
	              res.status(404).json({ msg: 'Memory not found.' });
	            } else {
	              res.status(200).json({ memory: memory });
	            }
	            _context4.next = 10;
	            break;
	
	          case 7:
	            _context4.prev = 7;
	            _context4.t0 = _context4['catch'](0);
	
	            res.status(500).send(_context4.t0);
	
	          case 10:
	          case 'end':
	            return _context4.stop();
	        }
	      }
	    }, _callee4, this, [[0, 7]]);
	  }));
	
	  return function oneMemory(_x7, _x8) {
	    return _ref4.apply(this, arguments);
	  };
	}();
	
	// Get single memory by memoryid 
	
	
	var oneMemoryByID = exports.oneMemoryByID = function () {
	  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
	    var memory;
	    return regeneratorRuntime.wrap(function _callee5$(_context5) {
	      while (1) {
	        switch (_context5.prev = _context5.next) {
	          case 0:
	            _context5.prev = 0;
	            _context5.next = 3;
	            return _memory2.default.find({ memoryid: req.params.id }).exec();
	
	          case 3:
	            memory = _context5.sent;
	
	            if (memory === null) {
	              res.status(404).json({ msg: 'Memory not found' });
	            } else {
	              res.status(200).json({ memory: memory });
	            }
	            _context5.next = 10;
	            break;
	
	          case 7:
	            _context5.prev = 7;
	            _context5.t0 = _context5['catch'](0);
	
	            res.status(500).send(_context5.t0);
	
	          case 10:
	          case 'end':
	            return _context5.stop();
	        }
	      }
	    }, _callee5, this, [[0, 7]]);
	  }));
	
	  return function oneMemoryByID(_x9, _x10) {
	    return _ref5.apply(this, arguments);
	  };
	}();
	
	// Create memory
	
	
	var createMemory = exports.createMemory = function () {
	  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
	    var newMemory;
	    return regeneratorRuntime.wrap(function _callee6$(_context6) {
	      while (1) {
	        switch (_context6.prev = _context6.next) {
	          case 0:
	            newMemory = new _memory2.default(req.body.memory);
	
	            newMemory.personalInfo.name.first = (0, _sanitizeHtml2.default)(newMemory.personalInfo.name.first);
	            newMemory.activated = false;
	            newMemory.personalInfo.name.last = (0, _sanitizeHtml2.default)(newMemory.personalInfo.name.last);
	            newMemory.personalInfo.email = (0, _sanitizeHtml2.default)(newMemory.personalInfo.email);
	            newMemory.personalInfo.place.city = (0, _sanitizeHtml2.default)(newMemory.personalInfo.place.city);
	            newMemory.personalInfo.place.address = (0, _sanitizeHtml2.default)(newMemory.personalInfo.place.address);
	            newMemory.deceased.name.first = (0, _sanitizeHtml2.default)(newMemory.deceased.name.first);
	            newMemory.deceased.name.last = (0, _sanitizeHtml2.default)(newMemory.deceased.name.last);
	            newMemory.deceased.biography = (0, _sanitizeHtml2.default)(newMemory.deceased.biography);
	            //  newMemory.deceased.religion = sanitizeHtml(newMemory.deceased.religion);
	            newMemory.deceased.birthPlace = (0, _sanitizeHtml2.default)(newMemory.deceased.birthPlace);
	            newMemory.deceased.latinBirthPlace = (0, _latinize2.default)(newMemory.deceased.birthPlace).toLowerCase();
	            newMemory.deceased.placeOfDeath = (0, _sanitizeHtml2.default)(newMemory.deceased.placeOfDeath);
	            newMemory.deceased.latinPlaceOfDeath = (0, _latinize2.default)(newMemory.deceased.placeOfDeath).toLowerCase();
	            newMemory.deceased.video = (0, _sanitizeHtml2.default)(newMemory.deceased.video);
	            newMemory.deceased.deathCertificate = (0, _sanitizeHtml2.default)(newMemory.deceased.deathCertificate);
	            newMemory.premium.payStatus = (0, _sanitizeHtml2.default)(newMemory.premium.payStatus);
	            newMemory.note = (0, _sanitizeHtml2.default)(newMemory.note);
	            newMemory.comment = (0, _sanitizeHtml2.default)(newMemory.comment);
	            if (newMemory.deceased.photo.length === 0) newMemory.deceased.photo = ['logofinalgold2.png'];
	
	            _context6.next = 22;
	            return newMemory.save().then(function (result) {
	              (0, _mail.mail)(newMemory.personalInfo.email, _msgs.msg.accepted(result.memoryid), 'Nova uspomena');
	              res.status(200).json({ memoryid: result.memoryid, message: 'Memory inserted.' });
	            }).catch(function (err) {
	              res.status(500).json(err);
	            });
	
	          case 22:
	          case 'end':
	            return _context6.stop();
	        }
	      }
	    }, _callee6, this);
	  }));
	
	  return function createMemory(_x11, _x12) {
	    return _ref6.apply(this, arguments);
	  };
	}();
	
	// Update memory
	
	
	var updateMemory = exports.updateMemory = function () {
	  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
	    var token, updatedMemory;
	    return regeneratorRuntime.wrap(function _callee7$(_context7) {
	      while (1) {
	        switch (_context7.prev = _context7.next) {
	          case 0:
	            token = (0, _getToken.getToken)(req.headers);
	
	            if (!token) {
	              _context7.next = 30;
	              break;
	            }
	
	            _context7.prev = 2;
	            updatedMemory = req.body.memory;
	
	            updatedMemory.personalInfo.name.first = (0, _sanitizeHtml2.default)(updatedMemory.personalInfo.name.first);
	            updatedMemory.personalInfo.name.last = (0, _sanitizeHtml2.default)(updatedMemory.personalInfo.name.last);
	            updatedMemory.personalInfo.email = (0, _sanitizeHtml2.default)(updatedMemory.personalInfo.email);
	            updatedMemory.personalInfo.place.city = (0, _sanitizeHtml2.default)(updatedMemory.personalInfo.place.city);
	            updatedMemory.personalInfo.place.address = (0, _sanitizeHtml2.default)(updatedMemory.personalInfo.place.address);
	            updatedMemory.deceased.name.first = (0, _sanitizeHtml2.default)(updatedMemory.deceased.name.first);
	            updatedMemory.deceased.name.last = (0, _sanitizeHtml2.default)(updatedMemory.deceased.name.last);
	            updatedMemory.deceased.biography = (0, _sanitizeHtml2.default)(updatedMemory.deceased.biography);
	            updatedMemory.deceased.religion = (0, _sanitizeHtml2.default)(updatedMemory.deceased.religion);
	            updatedMemory.deceased.birthPlace = (0, _sanitizeHtml2.default)(updatedMemory.deceased.birthPlace);
	            updatedMemory.deceased.latinBirthPlace = (0, _latinize2.default)(updatedMemory.deceased.birthPlace);
	            updatedMemory.deceased.placeOfDeath = (0, _sanitizeHtml2.default)(updatedMemory.deceased.placeOfDeath);
	            updatedMemory.deceased.deathCertificate = (0, _sanitizeHtml2.default)(updatedMemory.deceased.deathCertificate);
	            updatedMemory.deceased.video = (0, _sanitizeHtml2.default)(updatedMemory.deceased.video);
	            updatedMemory.premium.payStatus = (0, _sanitizeHtml2.default)(updatedMemory.premium.payStatus);
	            updatedMemory.note = (0, _sanitizeHtml2.default)(updatedMemory.note);
	            updatedMemory.comment = (0, _sanitizeHtml2.default)(updatedMemory.comment);
	            _context7.next = 23;
	            return _memory2.default.findByIdAndUpdate(req.params.id, updatedMemory, function (err) {
	              if (err) {
	                throw err;
	              } else {
	                res.status(202).json({ message: 'Memory updated' });
	              }
	            });
	
	          case 23:
	            _context7.next = 28;
	            break;
	
	          case 25:
	            _context7.prev = 25;
	            _context7.t0 = _context7['catch'](2);
	
	            res.status(500).json(_context7.t0);
	
	          case 28:
	            _context7.next = 31;
	            break;
	
	          case 30:
	            res.status(403).send({ success: false, msg: 'Unauthorized.' });
	
	          case 31:
	          case 'end':
	            return _context7.stop();
	        }
	      }
	    }, _callee7, this, [[2, 25]]);
	  }));
	
	  return function updateMemory(_x13, _x14) {
	    return _ref7.apply(this, arguments);
	  };
	}();
	
	// Delete memory
	
	
	var deleteMemory = exports.deleteMemory = function () {
	  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
	    var token;
	    return regeneratorRuntime.wrap(function _callee8$(_context8) {
	      while (1) {
	        switch (_context8.prev = _context8.next) {
	          case 0:
	            token = (0, _getToken.getToken)(req.headers);
	
	            if (!token) {
	              _context8.next = 12;
	              break;
	            }
	
	            _context8.prev = 2;
	            _context8.next = 5;
	            return _memory2.default.findByIdAndUpdate(req.params.id, { status: 'Obrisano' }, function (err, result) {
	              if (err) {
	                throw err;
	              } else {
	                (0, _mail.mail)(result.personalInfo.email, _msgs.msg.declined(result.memoryid), 'Uspomena je odbijena');
	                res.status(202).json({ message: 'Memory deleted' });
	              }
	            });
	
	          case 5:
	            _context8.next = 10;
	            break;
	
	          case 7:
	            _context8.prev = 7;
	            _context8.t0 = _context8['catch'](2);
	
	            res.status(500).json(_context8.t0);
	
	          case 10:
	            _context8.next = 13;
	            break;
	
	          case 12:
	            res.status(403).send({ success: false, msg: 'Unauthorized.' });
	
	          case 13:
	          case 'end':
	            return _context8.stop();
	        }
	      }
	    }, _callee8, this, [[2, 7]]);
	  }));
	
	  return function deleteMemory(_x15, _x16) {
	    return _ref8.apply(this, arguments);
	  };
	}();
	
	// Update memory status
	
	
	var updateStatusMemory = exports.updateStatusMemory = function () {
	  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
	    var token;
	    return regeneratorRuntime.wrap(function _callee9$(_context9) {
	      while (1) {
	        switch (_context9.prev = _context9.next) {
	          case 0:
	            token = (0, _getToken.getToken)(req.headers);
	
	            if (!token) {
	              _context9.next = 12;
	              break;
	            }
	
	            _context9.prev = 2;
	            _context9.next = 5;
	            return _memory2.default.findByIdAndUpdate(req.params.id, { $set: { status: req.body.status } }, { _id: req.params.id }, function (err, result) {
	              if (err) {
	                throw err;
	              } else if (req.body.status === 'Odobreno') {
	                (0, _mail.mail)(result.personalInfo.email, _msgs.msg.approved, 'Test Uspomene');
	              }
	              res.status(200).send({ message: 'Status updated' });
	            });
	
	          case 5:
	            _context9.next = 10;
	            break;
	
	          case 7:
	            _context9.prev = 7;
	            _context9.t0 = _context9['catch'](2);
	
	            res.status(500).json(_context9.t0);
	
	          case 10:
	            _context9.next = 13;
	            break;
	
	          case 12:
	            res.status(403).send({ success: false, msg: 'Unauthorized.' });
	
	          case 13:
	          case 'end':
	            return _context9.stop();
	        }
	      }
	    }, _callee9, this, [[2, 7]]);
	  }));
	
	  return function updateStatusMemory(_x17, _x18) {
	    return _ref9.apply(this, arguments);
	  };
	}();
	
	// Update activated status
	
	
	var updateActivated = exports.updateActivated = function () {
	  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
	    var token;
	    return regeneratorRuntime.wrap(function _callee10$(_context10) {
	      while (1) {
	        switch (_context10.prev = _context10.next) {
	          case 0:
	            token = (0, _getToken.getToken)(req.headers);
	
	            if (!token) {
	              _context10.next = 12;
	              break;
	            }
	
	            _context10.prev = 2;
	            _context10.next = 5;
	            return _memory2.default.findByIdAndUpdate(req.params.id, { $set: { activated: req.body.activated } }, function (err, result) {
	              if (err) {
	                throw err;
	              }
	              res.status(200).send({ message: 'Activated updated' });
	            });
	
	          case 5:
	            _context10.next = 10;
	            break;
	
	          case 7:
	            _context10.prev = 7;
	            _context10.t0 = _context10['catch'](2);
	
	            res.status(500).json(_context10.t0);
	
	          case 10:
	            _context10.next = 13;
	            break;
	
	          case 12:
	            res.status(403).send({ success: false, msg: 'Unauthorized.' });
	
	          case 13:
	          case 'end':
	            return _context10.stop();
	        }
	      }
	    }, _callee10, this, [[2, 7]]);
	  }));
	
	  return function updateActivated(_x19, _x20) {
	    return _ref10.apply(this, arguments);
	  };
	}();
	
	// Upload picture
	
	
	var uploadPicture = exports.uploadPicture = function () {
	  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res) {
	    var storag, upload;
	    return regeneratorRuntime.wrap(function _callee11$(_context11) {
	      while (1) {
	        switch (_context11.prev = _context11.next) {
	          case 0:
	            storag = _multer2.default.diskStorage({
	              destination: function destination(reqq, file, callback) {
	                callback(null, 'dist/client/slike');
	              },
	              filename: function filename(reqq, file, callback) {
	                callback(null, Date.now() + '-' + file.originalname);
	              }
	            });
	            _context11.prev = 1;
	            _context11.next = 4;
	            return (0, _multer2.default)({ storage: storag }, {
	              limits: {
	                fieldNameSize: 50,
	                fileSize: 5 * 1024 * 1024
	              }
	            }).array('file');
	
	          case 4:
	            upload = _context11.sent;
	
	            upload(req, res, function (err) {
	              if (err) {
	                throw err;
	              } else {
	                var photos = [];
	                req.files.forEach(function (photoName) {
	                  photos.push(photoName.filename);
	                });
	                res.status(200).send({ message: 'Uploaded', photo: photos });
	              }
	            });
	            _context11.next = 11;
	            break;
	
	          case 8:
	            _context11.prev = 8;
	            _context11.t0 = _context11['catch'](1);
	
	            res.status(409).json(_context11.t0);
	
	          case 11:
	          case 'end':
	            return _context11.stop();
	        }
	      }
	    }, _callee11, this, [[1, 8]]);
	  }));
	
	  return function uploadPicture(_x21, _x22) {
	    return _ref11.apply(this, arguments);
	  };
	}();
	
	// Upload picture for death certificate
	
	
	var uploadCertificate = exports.uploadCertificate = function () {
	  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(req, res) {
	    var storag, upload;
	    return regeneratorRuntime.wrap(function _callee12$(_context12) {
	      while (1) {
	        switch (_context12.prev = _context12.next) {
	          case 0:
	            storag = _multer2.default.diskStorage({
	              destination: function destination(reqq, file, callback) {
	                callback(null, 'dist/client/slike');
	              },
	              filename: function filename(reqq, file, callback) {
	                callback(null, Date.now() + '-' + file.originalname);
	              }
	            });
	            _context12.prev = 1;
	            _context12.next = 4;
	            return (0, _multer2.default)({ storage: storag }, {
	              limits: {
	                fieldNameSize: 50,
	                files: 1,
	                fileSize: 5 * 1024 * 1024
	              }
	            }).single('file');
	
	          case 4:
	            upload = _context12.sent;
	
	            upload(req, res, function (err) {
	              if (err) {
	                throw err;
	              } else {
	                res.status(200).send({ message: 'Uploaded', photo: req.file.filename });
	              }
	            });
	            _context12.next = 11;
	            break;
	
	          case 8:
	            _context12.prev = 8;
	            _context12.t0 = _context12['catch'](1);
	
	            res.status(409).json(_context12.t0);
	
	          case 11:
	          case 'end':
	            return _context12.stop();
	        }
	      }
	    }, _callee12, this, [[1, 8]]);
	  }));
	
	  return function uploadCertificate(_x23, _x24) {
	    return _ref12.apply(this, arguments);
	  };
	}();
	
	// Filter
	
	
	var filterMemories = exports.filterMemories = function () {
	  var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(req, res) {
	    return regeneratorRuntime.wrap(function _callee13$(_context13) {
	      while (1) {
	        switch (_context13.prev = _context13.next) {
	          case 0:
	            _context13.prev = 0;
	
	            if (req.body.filter === null) {
	              res.status(404).send("Nobody found!");
	            }
	            _context13.next = 4;
	            return _memory2.default.find({ $and: req.body.filter }).sort('-dateAdded').exec(function (err, result) {
	              if (err) {
	                throw err;
	              } else if (!result) {
	                res.status(404).json({ msg: 'No memory found!' });
	              }
	              res.status(200).json(result);
	            });
	
	          case 4:
	            _context13.next = 9;
	            break;
	
	          case 6:
	            _context13.prev = 6;
	            _context13.t0 = _context13['catch'](0);
	
	            res.status(500).json(_context13.t0);
	
	          case 9:
	          case 'end':
	            return _context13.stop();
	        }
	      }
	    }, _callee13, this, [[0, 6]]);
	  }));
	
	  return function filterMemories(_x25, _x26) {
	    return _ref13.apply(this, arguments);
	  };
	}();
	
	// Paypal control
	
	
	var pay = exports.pay = function () {
	  var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(req, res) {
	    var price, create_payment_json;
	    return regeneratorRuntime.wrap(function _callee14$(_context14) {
	      while (1) {
	        switch (_context14.prev = _context14.next) {
	          case 0:
	            _context14.next = 2;
	            return _price2.default.findOne({}, 'value').catch(function (err) {
	              res.status(500).json(err);
	            });
	
	          case 2:
	            price = _context14.sent;
	            create_payment_json = {
	              intent: 'sale',
	              payer: {
	                payment_method: 'paypal'
	              },
	              redirect_urls: {
	                return_url: 'http://node.wereact.de/success',
	                cancel_url: 'http://node.wereact.de/cancel'
	              },
	              transactions: [{
	                item_list: {
	                  items: [{
	                    name: 'Uspomena',
	                    sku: req.body.id,
	                    price: price.value,
	                    currency: 'EUR',
	                    quantity: 1
	                  }]
	                },
	                custom: req.body.id,
	                amount: {
	                  currency: 'EUR',
	                  total: price.value
	                },
	                description: 'Premium uspomena'
	              }]
	            };
	
	
	            _paypalRestSdk2.default.payment.create(create_payment_json, function (error, payment) {
	              if (error) {
	                throw error;
	              } else {
	                for (var i = 0; i < payment.links.length; i++) {
	                  if (payment.links[i].rel === 'approval_url') {
	                    // res.redirect(payment.links[i].href);
	                    res.status(200).json({ redirect: payment.links[i].href });
	                  }
	                }
	              }
	            });
	
	          case 5:
	          case 'end':
	            return _context14.stop();
	        }
	      }
	    }, _callee14, this);
	  }));
	
	  return function pay(_x27, _x28) {
	    return _ref14.apply(this, arguments);
	  };
	}();
	
	// Success
	
	
	var success = exports.success = function () {
	  var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(req, res) {
	    var price, payerId, paymentId, execute_payment_json;
	    return regeneratorRuntime.wrap(function _callee15$(_context15) {
	      while (1) {
	        switch (_context15.prev = _context15.next) {
	          case 0:
	            _context15.next = 2;
	            return _price2.default.findOne({}, 'value').catch(function (err) {
	              res.status(500).json(err);
	            });
	
	          case 2:
	            price = _context15.sent;
	            payerId = req.query.PayerID;
	            paymentId = req.query.paymentId;
	            execute_payment_json = {
	              payer_id: payerId,
	              transactions: [{
	                amount: {
	                  currency: 'EUR',
	                  total: price.value
	                }
	              }]
	            };
	
	
	            _paypalRestSdk2.default.payment.execute(paymentId, execute_payment_json, function (error, payment) {
	              if (error) {
	                res.status(400).json(error.response);
	              } else {
	                var memId = payment.transactions[0].custom;
	                var paidAt = payment.create_time;
	                _memory2.default.findOneAndUpdate({ memoryid: memId }, { $set: { 'premium.isPremium': true, 'premium.paidAt': paidAt, trackId: payment.id } }).then(function (result) {}).catch(function (err) {
	                  res.status(400).json(err);
	                });
	                res.redirect('/');
	                //takodjer s damirom vidjet
	                // res.status(200).send('Success');
	              }
	            });
	
	          case 7:
	          case 'end':
	            return _context15.stop();
	        }
	      }
	    }, _callee15, this);
	  }));
	
	  return function success(_x29, _x30) {
	    return _ref15.apply(this, arguments);
	  };
	}();
	
	// Cancel
	
	
	var filterGetPug = exports.filterGetPug = function () {
	  var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(req, res) {
	    var type, resultData;
	    return regeneratorRuntime.wrap(function _callee16$(_context16) {
	      while (1) {
	        switch (_context16.prev = _context16.next) {
	          case 0:
	            type = req.body.status;
	            resultData = {};
	            _context16.next = 4;
	            return _memory2.default.find({ 'premium.isPremium': type, status: 'Odobreno' }).sort('-memoryid').skip(req.body.skip * 10).limit(10).exec(function (err, result) {
	              if (err) res.status(400).json(err);else {
	                if (result.len === null) {
	                  resultData.count = 0;
	                  resultData.msg = 'No memories found';
	                  res.status(200).json(resultData);
	                } else {
	                  resultData.memories = result;
	                  _memory2.default.count({ 'premium.isPremium': type, status: 'Odobreno' }).exec().then(function (count) {
	                    resultData.count = count;
	                    res.status(200).json(resultData);
	                  }).catch(function (err) {
	                    throw err;
	                  });
	                  //res.status(200).json(resultData);
	                }
	              }
	            });
	
	          case 4:
	          case 'end':
	            return _context16.stop();
	        }
	      }
	    }, _callee16, this);
	  }));
	
	  return function filterGetPug(_x31, _x32) {
	    return _ref16.apply(this, arguments);
	  };
	}();
	
	var filterInfScr = exports.filterInfScr = function () {
	  var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(req, res) {
	    var resultData;
	    return regeneratorRuntime.wrap(function _callee17$(_context17) {
	      while (1) {
	        switch (_context17.prev = _context17.next) {
	          case 0:
	            resultData = {};
	            _context17.next = 3;
	            return _memory2.default.find({ status: 'Odobreno' }).sort('-dateAdded').skip(req.body.skip * 10).limit(10).exec(function (err, result) {
	              if (err) res.status(400).json(err);else {
	                if (result.len === null) {
	                  resultData.count = 0;
	                  resultData.msg = 'No memories found';
	                  res.status(200).json(resultData);
	                } else {
	                  resultData.memories = result;
	                  _memory2.default.count({ status: 'Odobreno' }).exec().then(function (count) {
	                    resultData.count = count;
	                    res.status(200).json(resultData);
	                  }).catch(function (err) {
	                    throw err;
	                  });
	                  //res.status(200).json(resultData);
	                }
	              }
	            });
	
	          case 3:
	          case 'end':
	            return _context17.stop();
	        }
	      }
	    }, _callee17, this);
	  }));
	
	  return function filterInfScr(_x33, _x34) {
	    return _ref17.apply(this, arguments);
	  };
	}();
	
	// premium memories soon to expired
	var getSoonToExpireMems = exports.getSoonToExpireMems = function () {
	  var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(req, res) {
	    var currentDate, oldMemories;
	    return regeneratorRuntime.wrap(function _callee18$(_context18) {
	      while (1) {
	        switch (_context18.prev = _context18.next) {
	          case 0:
	            currentDate = new Date(Date.now());
	            oldMemories = new Array();
	            _context18.next = 4;
	            return _memory2.default.find({ 'premium.isPremium': true }, 'premium memoryid email').then(function (memory) {
	              memory.forEach(function (item) {
	                var date2 = new Date(item.premium.paidAt);
	                var timeDiff = Math.abs(currentDate.getTime() - date2.getTime());
	                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
	                if (diffDays >= 358 && diffDays <= 365) {
	                  console.log(item);
	                  oldMemories.push(item);
	                }
	              });
	            });
	
	          case 4:
	            console.log(oldMemories);
	            res.send(oldMemories);
	
	          case 6:
	          case 'end':
	            return _context18.stop();
	        }
	      }
	    }, _callee18, this);
	  }));
	
	  return function getSoonToExpireMems(_x35, _x36) {
	    return _ref18.apply(this, arguments);
	  };
	}();
	
	exports.cancel = cancel;
	exports.payByPaymentSlip = payByPaymentSlip;
	exports.payLater = payLater;
	
	var _memory = __webpack_require__(5);
	
	var _memory2 = _interopRequireDefault(_memory);
	
	var _sanitizeHtml = __webpack_require__(4);
	
	var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);
	
	var _multer = __webpack_require__(12);
	
	var _multer2 = _interopRequireDefault(_multer);
	
	var _mail = __webpack_require__(8);
	
	var _msgs = __webpack_require__(24);
	
	var _getToken = __webpack_require__(1);
	
	var _paypalRestSdk = __webpack_require__(37);
	
	var _paypalRestSdk2 = _interopRequireDefault(_paypalRestSdk);
	
	var _price = __webpack_require__(6);
	
	var _price2 = _interopRequireDefault(_price);
	
	var _acc = __webpack_require__(3);
	
	var _latinize = __webpack_require__(33);
	
	var _latinize2 = _interopRequireDefault(_latinize);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
	
	// Paypal configuration
	var acc = _acc.account;
	_paypalRestSdk2.default.configure({
	  mode: 'live',
	  client_id: 'AV2k99DxRVDToqSL2_yP2l0Ka2NJnOABr1vwyf7EZ3juAozarLoeUKGfjI-2uhNPh-4R3Ty8RoDyvVMg',
	  client_secret: 'EJi02cLj61Sfj0TkvvkfaPVsgevRgdUjtM2CbLWilDoXZLdHAdFR9N84IgdsIEBhZi2IqZq8KPK_gGgc'
	});function cancel(req, res) {
	  //res.status(400).send('Failed');
	  //to be updated;
	  //vidjet s damirom sta tacno ovdje da cini
	  res.status(408).json({ redirect: '/', msg: 'Payment was canceled! ' });
	}
	
	// Payment by slip
	function payByPaymentSlip(req, res) {
	  var handleMail = (0, _mail.mail)(req.body.email, _msgs.msg.paymentSlip(req.body.memID), 'Podaci o uplati za uspomenu');
	  if (handleMail.msg === 'Success') {
	    res.status(200).json({ msg: 'Dobili ste obavijest na mail o načinu uplate.' });
	  } else {
	    res.status(451).json({ msg: 'Error' });
	  }
	}
	
	function payLater(req, res) {
	  (0, _mail.mail)(req.body.email, _msgs.msg.payLater, 'Nova uspomena');
	  (0, _mail.mail)(acc.user, _msgs.msg.payLaterAdmin(req.body.memid), 'Nova uspomena');
	  res.status(200).json({ msg: 'Obavijeti su poslate' });
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getPrice = exports.setPrice = undefined;
	
	var setPrice = exports.setPrice = function () {
	  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
	    var token;
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            token = (0, _getToken.getToken)(req.headers);
	
	            if (!token) {
	              _context.next = 6;
	              break;
	            }
	
	            _context.next = 4;
	            return _price2.default.findOneAndUpdate({}, { $set: { value: req.body.value } }).then(function () {
	              res.status(200).json({ msg: 'Price updated' });
	            }).catch(function (err) {
	              res.status(500).json(err);
	            });
	
	          case 4:
	            _context.next = 7;
	            break;
	
	          case 6:
	            res.status(403).send({ success: false, msg: 'Unauthorized.' });
	
	          case 7:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));
	
	  return function setPrice(_x, _x2) {
	    return _ref.apply(this, arguments);
	  };
	}();
	
	var getPrice = exports.getPrice = function () {
	  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
	    return regeneratorRuntime.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            _context2.next = 2;
	            return _price2.default.findOne({}, 'value').then(function (price) {
	              res.status(200).json(price);
	            }).catch(function (err) {
	              res.status(500).json(err);
	            });
	
	          case 2:
	          case 'end':
	            return _context2.stop();
	        }
	      }
	    }, _callee2, this);
	  }));
	
	  return function getPrice(_x3, _x4) {
	    return _ref2.apply(this, arguments);
	  };
	}();
	
	var _price = __webpack_require__(6);
	
	var _price2 = _interopRequireDefault(_price);
	
	var _getToken = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.changePassword = exports.login = exports.deleteUser = exports.updateUser = exports.newUser = exports.getUser = exports.users = undefined;
	
	// get users
	var users = exports.users = function () {
	  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
	    var token, user;
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            token = (0, _getToken.getToken)(req.headers);
	
	            if (!token) {
	              _context.next = 14;
	              break;
	            }
	
	            _context.prev = 2;
	            _context.next = 5;
	            return _user2.default.find({ permission: 'Moderator' }).sort('-dateAdded').exec();
	
	          case 5:
	            user = _context.sent;
	
	            if (!user) {
	              res.status(204).json({ message: 'No moderators.' });
	            } else {
	              res.status(200).json({ user: user });
	            }
	            _context.next = 12;
	            break;
	
	          case 9:
	            _context.prev = 9;
	            _context.t0 = _context['catch'](2);
	
	            res.status(500).json(_context.t0);
	
	          case 12:
	            _context.next = 15;
	            break;
	
	          case 14:
	            res.status(403).send({ success: false, msg: 'Unauthorized.' });
	
	          case 15:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this, [[2, 9]]);
	  }));
	
	  return function users(_x, _x2) {
	    return _ref.apply(this, arguments);
	  };
	}();
	
	// get one user
	
	
	var getUser = exports.getUser = function () {
	  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
	    var token, user;
	    return regeneratorRuntime.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            token = (0, _getToken.getToken)(req.headers);
	
	            if (!token) {
	              _context2.next = 14;
	              break;
	            }
	
	            _context2.prev = 2;
	            _context2.next = 5;
	            return _user2.default.findById(req.params.id, 'username email permission').exec();
	
	          case 5:
	            user = _context2.sent;
	
	            if (!user) {
	              res.status(404).json({ msg: 'User not found' });
	            } else {
	              res.status(200).json({ user: user });
	            }
	            _context2.next = 12;
	            break;
	
	          case 9:
	            _context2.prev = 9;
	            _context2.t0 = _context2['catch'](2);
	
	            res.status(500).json(_context2.t0);
	
	          case 12:
	            _context2.next = 15;
	            break;
	
	          case 14:
	            res.status(403).send({ success: false, msg: 'Unauthorized.' });
	
	          case 15:
	          case 'end':
	            return _context2.stop();
	        }
	      }
	    }, _callee2, this, [[2, 9]]);
	  }));
	
	  return function getUser(_x3, _x4) {
	    return _ref2.apply(this, arguments);
	  };
	}();
	
	// add user
	
	
	var newUser = exports.newUser = function () {
	  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
	    var token, nUser;
	    return regeneratorRuntime.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            token = (0, _getToken.getToken)(req.headers);
	
	            if (!token) {
	              _context3.next = 12;
	              break;
	            }
	
	            if (!req.body.user.username || !req.body.user.password || !req.body.user.email) {
	              res.status(403).end();
	            }
	
	            nUser = new _user2.default(req.body.user);
	
	            nUser.username = (0, _sanitizeHtml2.default)(nUser.username);
	            nUser.password = (0, _sanitizeHtml2.default)(nUser.password);
	            nUser.email = (0, _sanitizeHtml2.default)(nUser.email);
	            nUser.password = hash(nUser.password);
	            _context3.next = 10;
	            return nUser.save().then(function (result) {
	              res.status(200).json({ message: 'User inserted.' });
	            }).catch(function (err) {
	              res.status(400).json(err);
	            });
	
	          case 10:
	            _context3.next = 13;
	            break;
	
	          case 12:
	            res.status(403).send({ success: false, msg: 'Unauthorized.' });
	
	          case 13:
	          case 'end':
	            return _context3.stop();
	        }
	      }
	    }, _callee3, this);
	  }));
	
	  return function newUser(_x5, _x6) {
	    return _ref3.apply(this, arguments);
	  };
	}();
	
	// update user
	
	
	var updateUser = exports.updateUser = function () {
	  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
	    var token, updatedUser;
	    return regeneratorRuntime.wrap(function _callee4$(_context4) {
	      while (1) {
	        switch (_context4.prev = _context4.next) {
	          case 0:
	            token = (0, _getToken.getToken)(req.headers);
	
	            if (!token) {
	              _context4.next = 17;
	              break;
	            }
	
	            _context4.prev = 2;
	            updatedUser = req.body.user;
	
	
	            updatedUser.username = (0, _sanitizeHtml2.default)(updatedUser.username);
	            updatedUser.email = (0, _sanitizeHtml2.default)(updatedUser.email);
	            updatedUser.permission = (0, _sanitizeHtml2.default)(updatedUser.permission);
	
	            if (checkPassword(req.params.id, updatedUser.password) === false) {
	              updatedUser.password = hash(updatedUser.password);
	            }
	
	            _context4.next = 10;
	            return _user2.default.findByIdAndUpdate(req.params.id, updatedUser, function (err) {
	              if (err) {
	                throw err;
	              } else {
	                res.status(202).json({ msg: 'User updated' });
	              }
	            });
	
	          case 10:
	            _context4.next = 15;
	            break;
	
	          case 12:
	            _context4.prev = 12;
	            _context4.t0 = _context4['catch'](2);
	
	            res.status(500).json(_context4.t0);
	
	          case 15:
	            _context4.next = 18;
	            break;
	
	          case 17:
	            res.status(403).send({ success: false, msg: 'Unauthorized.' });
	
	          case 18:
	          case 'end':
	            return _context4.stop();
	        }
	      }
	    }, _callee4, this, [[2, 12]]);
	  }));
	
	  return function updateUser(_x7, _x8) {
	    return _ref4.apply(this, arguments);
	  };
	}();
	
	// delete user
	
	
	var deleteUser = exports.deleteUser = function () {
	  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
	    var token;
	    return regeneratorRuntime.wrap(function _callee5$(_context5) {
	      while (1) {
	        switch (_context5.prev = _context5.next) {
	          case 0:
	            token = (0, _getToken.getToken)(req.headers);
	
	            if (!token) {
	              _context5.next = 12;
	              break;
	            }
	
	            _context5.prev = 2;
	            _context5.next = 5;
	            return _user2.default.findByIdAndRemove(req.params.id, function (err) {
	              if (err) {
	                throw err;
	              } else {
	                res.status(200).json({ msg: 'User deleted' });
	              }
	            });
	
	          case 5:
	            _context5.next = 10;
	            break;
	
	          case 7:
	            _context5.prev = 7;
	            _context5.t0 = _context5['catch'](2);
	
	            res.status(500).json(_context5.t0);
	
	          case 10:
	            _context5.next = 13;
	            break;
	
	          case 12:
	            res.status(403).send({ success: false, msg: 'Unauthorized.' });
	
	          case 13:
	          case 'end':
	            return _context5.stop();
	        }
	      }
	    }, _callee5, this, [[2, 7]]);
	  }));
	
	  return function deleteUser(_x9, _x10) {
	    return _ref5.apply(this, arguments);
	  };
	}();
	
	// login
	
	
	var login = exports.login = function () {
	  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
	    return regeneratorRuntime.wrap(function _callee6$(_context6) {
	      while (1) {
	        switch (_context6.prev = _context6.next) {
	          case 0:
	            _context6.prev = 0;
	            _context6.next = 3;
	            return _user2.default.findOne({ username: req.body.username }, function (err, user) {
	              if (err) {
	                throw err;
	              }
	
	              if (!user) {
	                res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
	              } else {
	                if (comparePassword(req.body.password, user.password)) {
	                  var token = _jsonwebtoken2.default.sign(user._id.toJSON(), _config2.default.secret);
	                  res.json({ success: true, id: user._id, token: 'JWT ' + token });
	                } else {
	                  res.status(401).send({ success: false, msg: 'Authentication failed. Wrong username/password.' });
	                }
	              }
	            });
	
	          case 3:
	            _context6.next = 8;
	            break;
	
	          case 5:
	            _context6.prev = 5;
	            _context6.t0 = _context6['catch'](0);
	
	            res.status(500).json(_context6.t0);
	
	          case 8:
	          case 'end':
	            return _context6.stop();
	        }
	      }
	    }, _callee6, this, [[0, 5]]);
	  }));
	
	  return function login(_x11, _x12) {
	    return _ref6.apply(this, arguments);
	  };
	}();
	
	// change password
	
	
	var changePassword = exports.changePassword = function () {
	  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
	    var token, user, passwordHashed;
	    return regeneratorRuntime.wrap(function _callee7$(_context7) {
	      while (1) {
	        switch (_context7.prev = _context7.next) {
	          case 0:
	            token = (0, _getToken.getToken)(req.headers);
	
	            if (!token) {
	              _context7.next = 15;
	              break;
	            }
	
	            if (!req.body.newPassword || !req.body.oldPassword) {
	              res.status(403).end();
	            }
	            _context7.prev = 3;
	            _context7.next = 6;
	            return _user2.default.findById(req.params.id).exec();
	
	          case 6:
	            user = _context7.sent;
	
	            if (comparePassword(req.body.oldPassword, user.password)) {
	              passwordHashed = hash(req.body.newPassword);
	
	              _user2.default.findByIdAndUpdate(req.params.id, { $set: { password: passwordHashed } }, function (err) {
	                if (err) {
	                  throw err;
	                } else {
	                  res.status(202).json({ msg: 'Password updated' });
	                }
	              });
	            } else {
	              res.status(409).json({ msg: 'Passwords don\'t match!' });
	            }
	            _context7.next = 13;
	            break;
	
	          case 10:
	            _context7.prev = 10;
	            _context7.t0 = _context7['catch'](3);
	
	            res.status(500).json(_context7.t0);
	
	          case 13:
	            _context7.next = 16;
	            break;
	
	          case 15:
	            res.status(403).send({ success: false, msg: 'Unauthorized.' });
	
	          case 16:
	          case 'end':
	            return _context7.stop();
	        }
	      }
	    }, _callee7, this, [[3, 10]]);
	  }));
	
	  return function changePassword(_x13, _x14) {
	    return _ref7.apply(this, arguments);
	  };
	}();
	
	var _user = __webpack_require__(7);
	
	var _user2 = _interopRequireDefault(_user);
	
	var _sanitizeHtml = __webpack_require__(4);
	
	var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);
	
	var _crypto = __webpack_require__(30);
	
	var _crypto2 = _interopRequireDefault(_crypto);
	
	var _jsonwebtoken = __webpack_require__(32);
	
	var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
	
	var _config = __webpack_require__(2);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _getToken = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
	
	var alg = 'sha512';
	var pass = 'd434fgsdfjebise';
	
	function hash(text) {
	  var password = _crypto2.default.createHmac(alg, pass);
	  password.update(text);
	  var value = password.digest('hex');
	
	  return value;
	}
	
	function checkPassword(id, password) {
	  var passwordFromUser = _user2.default.findOne({ _id: id }).select({ password: 1 }).exec();
	  if (passwordFromUser.password === password) {
	    return true;
	  }
	  return false;
	}
	
	function comparePassword(passEntered, passDB) {
	  var newPass = hash(passEntered);
	  if (newPass === passDB) {
	    return true;
	  }
	
	  return false;
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mongoose = __webpack_require__(0);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Schema = _mongoose2.default.Schema;
	
	var aboutSchema = new Schema({
	  name: { type: 'String', required: true },
	  text: { type: 'String', required: true },
	  photo: { type: 'String', default: 'uspomene.png' },
	  lastUpdated: { type: 'Date', default: Date.now }
	});
	
	exports.default = _mongoose2.default.model('About', aboutSchema);

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(10);
	
	var _user = __webpack_require__(21);
	
	var UserController = _interopRequireWildcard(_user);
	
	var _memory = __webpack_require__(19);
	
	var MemoryController = _interopRequireWildcard(_memory);
	
	var _about = __webpack_require__(18);
	
	var AboutController = _interopRequireWildcard(_about);
	
	var _price = __webpack_require__(20);
	
	var PriceController = _interopRequireWildcard(_price);
	
	var _passport = __webpack_require__(13);
	
	var _passport2 = _interopRequireDefault(_passport);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	__webpack_require__(9)(_passport2.default);
	var router = new _express.Router();
	
	// Users
	router.route('/api/users').get(_passport2.default.authenticate('jwt', { session: false }), UserController.users);
	router.route('/api/users/:id').get(_passport2.default.authenticate('jwt', { session: false }), UserController.getUser);
	router.route('/api/registration').post(UserController.newUser);
	router.route('/api/users/:id').put(_passport2.default.authenticate('jwt', { session: false }), UserController.updateUser);
	router.route('/api/users/chpw/:id').put(_passport2.default.authenticate('jwt', { session: false }), UserController.changePassword);
	router.route('/api/users/:id').delete(_passport2.default.authenticate('jwt', { session: false }), UserController.deleteUser);
	
	// Memories
	router.route('/api/memories').get(_passport2.default.authenticate('jwt', { session: false }), MemoryController.pendingMemories);
	router.route('/api/approvedMemories').get(MemoryController.approvedMemories);
	router.route('/api/archivedMemories').get(_passport2.default.authenticate('jwt', { session: false }), MemoryController.archivedMemories);
	router.route('/api/oneMemory/:id').get(MemoryController.oneMemory);
	router.route('/api/memories/new').post(MemoryController.createMemory);
	router.route('/api/memories/:id').put(_passport2.default.authenticate('jwt', { session: false }), MemoryController.updateMemory);
	router.route('/api/memories/:id').delete(_passport2.default.authenticate('jwt', { session: false }), MemoryController.deleteMemory);
	router.route('/api/update/:id').put(_passport2.default.authenticate('jwt', { session: false }), MemoryController.updateStatusMemory);
	router.route('/api/updateActivated/:id').put(_passport2.default.authenticate('jwt', { session: false }), MemoryController.updateActivated);
	router.route('/api/filterMemories').post(MemoryController.filterMemories);
	router.route('/api/oldMemories').get(_passport2.default.authenticate('jwt', { session: false }), MemoryController.getSoonToExpireMems);
	router.route('/api/form/:id').get(MemoryController.oneMemoryByID);
	
	// About us
	router.route('/api/about').get(AboutController.getAboutUs);
	router.route('/api/aboutCreate').post(AboutController.createAbout); // used to insert first and only about us
	router.route('/api/about/:id').put(_passport2.default.authenticate('jwt', { session: false }), AboutController.updateAboutUs);
	
	// Picture upload
	router.route('/api/picture').post(MemoryController.uploadPicture);
	router.route('/api/pictureAbout').post(AboutController.uploadPicture);
	router.route('/api/deathCertificate').post(MemoryController.uploadCertificate);
	
	// Price update
	router.route('/api/getprice').get(PriceController.getPrice);
	router.route('/api/setprice').put(_passport2.default.authenticate('jwt', { session: false }), PriceController.setPrice);
	
	// Login
	router.route('/login').post(UserController.login);
	
	// Paypal
	router.route('/pay').post(MemoryController.pay);
	router.route('/success').get(MemoryController.success);
	router.route('/cancel').get(MemoryController.cancel);
	
	// Payment by slip
	router.route('/paymentSlip').post(MemoryController.payByPaymentSlip);
	
	router.route('/filterGetPug').post(MemoryController.filterGetPug);
	
	router.route('/infScr').post(MemoryController.filterInfScr);
	
	router.route('/payLater').post(MemoryController.payLater);
	
	router.all('*', function (req, res) {
	  res.sendFile('index.html', { root: 'dist/client' });
	});
	
	exports.default = router;

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var msg = exports.msg = {
	  accepted: function accepted(memID) {
	    return "<h1>Va\u0161a zahtjev je primljen i obra\u0111uje se br: <a href=\"http://node.wereact.de/form/" + memID + "\">" + memID + "</a></h1>";
	  },
	  declined: function declined(memID) {
	    return "<h1>Vas zahtjev je odbijen</h1>";
	  },
	  approved: "<h1>Vas zahtjev je odobren</h1>",
	  paymentSlip: function paymentSlip(memId) {
	    return "<h1>Vas zahtjev je u obradi</h1>\n          <p>Molimo Vas da izvrsite uplatu na br. racuna: xxx,\n            <br/>\n            u iznosu od xxx.\n          </p>\n          <br>\n          <p>Zatim nas kontaktirajte na broj: xxx ili email: info@uspomene.ba </p>";
	  },
	  paypal: function paypal(memID, paypalID) {
	    return "<h1>PayPal uplata</h1>\n          <p>Br. narud\u017Ebe: <a href=\"http://node.wereact.de/form/" + memID + "\">" + memID + "</a>,<br/>PayPal ID: " + paypalID + "</p>";
	  },
	  cronMsg: function cronMsg(memID, paypalID) {
	    return "<h1>Obavijest o vasoj narud\u017Ebi</h1>\n          <p>Va\u0161a premium usluga isti\u010De za 7 dana</p>";
	  },
	  payLater: "<h1>Va\u0161a zahtjev je primljen i obra\u0111uje se, uskoro cete biti kontaktirani.</h1>",
	  payLaterAdmin: function payLaterAdmin(memID) {
	    return "<h1>Pristigla narud\u017Eba sa naznakom plati kasnije</h1>\n          <a href=\"http://node.wereact.de/form/" + memID + "\"><p>broj narud\u017Ebe: " + memID + "</p> </a>";
	  }
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	var webpack = __webpack_require__(15);
	var cssnext = __webpack_require__(38);
	var postcssFocus = __webpack_require__(39);
	var postcssReporter = __webpack_require__(40);
	
	module.exports = {
	  devtool: 'cheap-module-eval-source-map',
	
	  entry: {
	    app: ['eventsource-polyfill', 'webpack-hot-middleware/client', 'webpack/hot/only-dev-server', 'react-hot-loader/patch', './client/index.js'],
	    vendor: ['react', 'react-dom']
	  },
	
	  output: {
	    path: __dirname,
	    filename: 'app.js',
	    publicPath: 'http://0.0.0.0:8000/'
	  },
	
	  resolve: {
	    extensions: ['', '.js', '.jsx'],
	    modules: ['client', 'node_modules']
	  },
	
	  module: {
	    loaders: [{
	      test: /\.css$/,
	      exclude: /node_modules/,
	      loader: 'style-loader!css-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1&sourceMap!postcss-loader'
	    }, {
	      test: /\.css$/,
	      include: /node_modules/,
	      loaders: ['style-loader', 'css-loader']
	    }, {
	      test: /\.jsx*$/,
	      exclude: [/node_modules/, /.+\.config.js/],
	      loader: 'babel'
	    }, {
	      test: /\.(jpe?g|gif|png|svg)$/i,
	      loader: 'url-loader?limit=10000'
	    }, {
	      test: /\.json$/,
	      loader: 'json-loader'
	    }]
	  },
	
	  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.optimize.CommonsChunkPlugin({
	    name: 'vendor',
	    minChunks: Infinity,
	    filename: 'vendor.js'
	  }), new webpack.DefinePlugin({
	    'process.env': {
	      CLIENT: JSON.stringify(true),
	      'NODE_ENV': JSON.stringify('development')
	    }
	  })],
	
	  postcss: function postcss() {
	    return [postcssFocus(), cssnext({
	      browsers: ['last 2 versions', 'IE > 10']
	    }), postcssReporter({
	      clearMessages: true
	    })];
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = require("cors");

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = require("cron");

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = require("crypto");

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = require("helmet");

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = require("latinize");

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = require("mongoose-unique-validator");

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = require("nodemailer");

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = require("paypal-rest-sdk");

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = require("postcss-cssnext");

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = require("postcss-focus");

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = require("postcss-reporter");

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = require("webpack-dev-middleware");

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = require("webpack-hot-middleware");

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(17);
	module.exports = __webpack_require__(16);


/***/ }
/******/ ]);