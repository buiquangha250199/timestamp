
var express = require('express');
var app = express();
var bodyParser = require('body-parser'); 


// --> 7)  Mount the Logger middleware here

// app.use(function middleware(req, res, next) {
//   var string = req.method + ' ' + req.path + ' - ' + req.ip;
//   console.log(string);
//   next();
// });


// --> 11)  Mount the body-parser middleware  here

app.use(bodyParser.urlencoded({extended: false}));


/** 1) Meet the node console. */

console.log("Hello World");


/** 2) A first working Express Server */

// app.get("/", function(req, res) {
//   res.send("Hello Express");
// });


/** 3) Serve an HTML file */

app.get("/", function(req, res) {
        res.sendFile( __dirname + "/views/index.html");
  });


/** 4) Serve static assets  */
 app.use(express.static(__dirname + "/public"));

/** 5) serve JSON on a specific route */

// app.get("/json", function(req, res) {
//         res.json({"message": "Hello json"});
//   });


/** 6) Use the .env file to configure the app */
var mes = {'message': 'Hello json'};

 app.get("/json", function(req, res) {
    if(process.env.MESSAGE_STYLE === "uppercase") 
         mes.message = mes.message.toUpperCase(); 
    else {
      mes.message = 'hello json';
    }
   
   res.json(mes);
        
  });
 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */
  app.get('/now', function(req, res, next) {
    req.time = new Date().toString();
    next();
}, function(req, res) {
    res.send({"time": req.time});
})


/** 9)  Get input from client - Route parameters */

app.get("/:word/echo", function(req, res) {
        res.json({"echo": req.params.word});
  });

  

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>

app.get("/name", function(req, res) {
   var firstName = req.query.first;
   var lastName = req.query.last;
   // Send the json object
  
  res.json({ name: firstName +' ' + lastName});
 });

  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */

app.post("/name", function(req, res) {
   var firstName = req.body.first;
   var lastName = req.body.last;
   // Send the json object
  
  res.json({ name: firstName +' ' + lastName});
 });




// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;