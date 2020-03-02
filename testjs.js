/*eslint-disable*/
var express = require('express');
var multer = require('multer');
var cors = require('cors');
var fs = require('fs');
var app = express();
const fileUpload = require('express-fileupload');
var DIR = './uploads/';
 
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'POST');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

app.use(cors());
// =======   Settings for CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(fileUpload());
// app.use(multer({
  //dest: DIR
  // rename: function (fieldname, filename) {
  //   return filename + Date.now();
  // },
  // onFileUploadStart: function (file) {
  //   console.log(file.originalname + ' is starting ...');
  // },
  // onFileUploadComplete: function (file) {
  //   console.log(file.fieldname + ' uploaded to  ' + file.path);
  // }
// }));
 
app.get('/api', function (req, res) {
  res.end('file catcher example');
});
 
app.post('/api', function(req, res) {
  let name = req.files.file.name;
  req.files.file.mv('./uploads/'+name, function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
  });
});
 
 
var PORT = process.env.PORT || 3000;
 
app.listen(PORT, function () {
  console.log('Working on port ' + PORT);
});