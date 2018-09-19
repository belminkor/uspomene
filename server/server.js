import Express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import Memory from './models/memory';
import { mail } from './util/mail';
import { account } from './util/acc.config';
// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Initialize the Express App
const app = new Express();

// Set Development modes checks
const isDevMode = process.env.NODE_ENV === 'development' || false;

// Run Webpack dev server in development mode
if (isDevMode) {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}
// Import required modules
import serverConfig from './config';
import router from './routes/post.routes';

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
});

app.use(cors());
app.use(helmet());
app.options(cors());
app.use((req, res, next) => {
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
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '../dist/client/slike')));
app.use(Express.static(path.resolve(__dirname, '../dist/client/about')));
app.use(Express.static(path.resolve(__dirname, '../dist/client/Slike')));
app.use(Express.static(path.resolve(__dirname, '../dist/client')));
app.use('/', router);

// middleware for error handling
app.use((err, req, res) => {
  res.status(500).json(err);
});

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`MERN is running on port: ${serverConfig.port}!`); // eslint-disable-line
  }
});

// cron job
const CronJob = require('cron').CronJob;
const job = new CronJob({
  cronTime: '00 00 02 * * 0-6',
  onTick: function() {
    const date1 = new Date(Date.now());
    Memory.find({ 'premium.isPremium': true }, 'premium memoryid email').
    then(memory => {
      memory.forEach(item => {
        let date2 = new Date(item.premium.paidAt);
        const timeDiff = Math.abs(date1.getTime() - date2.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if (diffDays >= 358 && diffDays <= 365) {
          let msg = `<h1>Obavijest o Premium</h1>
                     <p>Vasa premium (id: ${item.memoryid}) uspomena istice za manje od 7 dana</p>`;
          mail(item.email, msg, 'Uspomene obavijet o premium');
        } else if (diffDays > 365) {
          let msg2 = `<h1>Obavijest o Premium</h1>
                     <p>Vasa premium (id: ${item.memoryid}) uspomena je istekla i status vase uspomene je free</p>`;

          Memory.findOneAndUpdate({ memoryid: item.memoryid }, { $set: { 'premium.isPremium': false } }).
          then(res => {}).catch(err => {
            throw err;
          });
          mail(item.email, msg2, 'Uspomene obavijest o premium');
        }
      });
    }).
    catch(err => { throw err; });
  },
  start: false,
  timeZone: 'Europe/Sarajevo'
});
job.start();

export default app;
