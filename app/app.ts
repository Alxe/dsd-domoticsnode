// app/app.ts
import express from "express";
import nunjucks from "nunjucks";
import mongoose, { Schema } from "mongoose";
import socketio from "socket.io";
import { Server as HttpServer} from "http";
import { join as path_join } from "path";
import { sensors_cfg, actuators_cfg, OnOffState } from "./gadget";
import { agents_cfg } from "./agents";

// Constants
const port = 8080;
const app = express();
const server = new HttpServer(app);
const io = socketio(server, { origins: '*:*' });
const db = mongoose.connect('mongodb://localhost:27017/MiSensores', { useNewUrlParser: true });

const updateSchema = new mongoose.Schema({
  'key': String,
  'message': String
});

const sensorModel = mongoose.model('Sensor', updateSchema);
const actuatorModel = mongoose.model('Actuator', updateSchema);

// Template configuration
nunjucks.configure('views', {
  express: app,
  autoescape: true,
  noCache: true,
});

app.set('view engine', 'nunjucks');
app.set('views', path_join(__dirname, './views'));

// Static files configuration
app.use(express.static(path_join(__dirname, '../static')));

// Gadgets
const sensorNamespace = io.of('/sensors').on('connect', socket => {
  socket.on('update', (id: string, value : number) => {
    // Forward
    sensorNamespace.emit('update', id, value);
    sensorModel.create({ key: id, message: ('set to ' + value) }, (err: mongoose.Error, rec: object) => {
      if(err) {
        console.log('error on saving', err);
      } else {
        console.log('saved', rec);
      }
    });
  })
});

const actuatorNamespace = io.of('/actuators').on('connect', socket => {
  socket.on('update', (id: string, value: OnOffState) => {
    // Forward
    actuatorNamespace.emit('update', id, value);
    actuatorModel.create({ key: id, message: ('set to ' + value) }, (err: mongoose.Error, rec: object) => {
      if(err) {
        console.log('error on saving', err);
      } else {
        console.log('saved', rec);
      }
    });
  }).on('toggle', (id: string) => {
    // Forward
    actuatorNamespace.emit('toggle', id);
    actuatorModel.create({ key: id, message: 'toggled' }, (err: mongoose.Error, rec: object) => {
      if(err) {
        console.log('error on saving', err);
      } else {
        console.log('saved', rec);
      }
    });
  }).on('increase', (id: string) => {
    actuatorNamespace.emit('increase', id);
  }).on('decrease', (id: string) => {
    actuatorNamespace.emit('decrease', id);
  });

  
});

// Express Routing 
app.get('/',
(req, res) => {
  res.render('index');
});

app.get(['/m', '/monitor'], 
(req, res) => {
  res.render('gadget', { 
    editable : false,
    sensors_cfg,
    actuators_cfg,
  });
});

app.get(['/e', '/editable'], 
(req, res) => {
  res.render('gadget', {
    editable : true,
    sensors_cfg,
    actuators_cfg,
  });
});

app.get(['/a', '/agent'], 
(req, res) => {
  res.render('agent', {
    agents_cfg,
  });
});

// Express Ignition, start
server.listen(port, (err?: Error) => {
  console.log(`Listening on http://localhost:${port}/`);
});