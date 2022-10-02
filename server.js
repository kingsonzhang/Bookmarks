const EXPRESS = require('express');
const APP = EXPRESS();
const MONGOOSE = require('mongoose');
const PASSPORT = require('passport');
const SESSION = require('express-session');
const MONGOSTORE = require('connect-mongo')(SESSION);
const FLASH = require('express-flash');
const LOGGER = require('morgan');
const METHODOVERRIDE = require('method-override');
const CONNECTDB = require('./config/database');
const mainRoutes = require('./routes/main');
const BOOKMARKROUTES = require("./routes/bookmarksRoute");

require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(PASSPORT)

CONNECTDB()

APP.set('view engine', 'ejs')
APP.use(EXPRESS.static('public'))
APP.use(EXPRESS.urlencoded({ extended: true }))
APP.use(EXPRESS.json())
APP.use(LOGGER('dev'))
APP.use(METHODOVERRIDE('_method'));
// Sessions
APP.use(
  SESSION({
      secret: 'testinggrounds',
      resave: false,
      saveUninitialized: false,
      store: new MONGOSTORE({ mongooseConnection: MONGOOSE.connection }),
    })
  )
  
// Passport middleware
APP.use(PASSPORT.initialize())
APP.use(PASSPORT.session())

APP.use(FLASH())
  
APP.use('/', mainRoutes)
APP.use("/bookmarks", BOOKMARKROUTES);
 
APP.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    