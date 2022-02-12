const jsonServer = require('json-server');
const auth = require('json-server-auth')

const server = jsonServer.create();
const router = jsonServer.router('db.json');

const middlewares = jsonServer.defaults({
         logger: true,
		 noCors  :true
    });

const port = process.env.PORT || 3001;
const origineServer= ['https://enima-eshopping.herokuapp.com','http://localhost:4200/','http://127.0.0.1:4200/' ];
// /!\ Bind the router db to the app
server.db = router.db

// Add headers
server.use(function (req, res, next) {
  'use strict';

  res.header('Access-Control-Allow-Origin', origineServer ); //'https://enima-eshopping.herokuapp.com');

  if (req.headers['access-control-request-method']) {
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  }
 
  if (req.headers['access-control-request-headers']) {
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
 
  if (req.method === 'OPTIONS') {
      res.sendStatus(200);
  } else  {
      next();
  }
});


// You must apply the auth middleware before the router
server.use(auth)
server.use(middlewares);
server.use(router);

server.listen(port,() => {
  console.log('JSON Server is running')
}) 
