// require the handlers
const handlers = require('./handlers.js');
const express = require('express');

// build the router
const router = express.Router();

router.get('/', (req, res) => {
  res.send('files API!');
});

router.use((req, res, next) => {
  console.log('routes!');
  next();
}); 

// add routes to router

router.get('/files', handlers.getListOfFiles);

router.get('/files/:name', handlers.fetchAndLoadFile);

router.post('/files/:name', handlers.saveFile);

router.delete('/files/:name', handlers.deleteFile);

// export the router
module.exports = router;
