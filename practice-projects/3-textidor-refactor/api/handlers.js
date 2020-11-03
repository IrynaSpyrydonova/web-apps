const fs = require('fs');
const path = require('path');
const config = require('../config');

// define FILES_DIR
const FILES_DIR = path.join(__dirname,'..', config.FILES_DIR);
console.log(FILES_DIR);

// declare the handlers
const handlers = {
    getListOfFiles: (req, res, next) => {
    fs.readdir(FILES_DIR, (err, list) => {
        if (err && err.code === 'ENOENT') {
          res.status(404).end();
          return;
        }
        if (err) {
          next(err);
          return;
        }
    
        res.json(list);
      });
    },

    fetchAndLoadFile: (req, res)=> {
        const fileName = req.params.name;

        fs.readFile(`${FILES_DIR}/${fileName}`, 'utf-8', (err, fileText) => {
        if (err && err.code === 'ENOENT') {
        res.status(404).end();
        return;
        }
        if (err) {
        next(err);
        return;
        }

        const responseData = {
        name: fileName,
        text: fileText,
        };
        res.json(responseData);
        });
    },

    saveFile: (req, res)=>{
        const fileName = req.params.name;
        const fileText = req.body.text;
        fs.writeFile(`${FILES_DIR}/${fileName}`, fileText, err => {
            console.log(err);
          if (err && err.code === 'ENOENT') {
            res.status(404).end();
            return;
          }
          if (err) {
            next(err);
            return;
          }
      
          // refactor hint:
          res.redirect(303, '/api/files');
        //   handlers.getListOfFiles(req, res, next);
        });
    },

    deleteFile: (req, res) => {
        const fileName = req.params.name;
        fs.unlink(`${FILES_DIR}/${fileName}`, err => {
        if (err && err.code === 'ENOENT') {
        res.status(404).end();
        return;
        }
        if (err) {
        next(err);
        return;
        }

        // refactor hint:
        res.redirect(303, '/api/files');
        // handlers.getFiles(req, res, next);
        });
    }
};

// export the handlers
module.exports = handlers;
