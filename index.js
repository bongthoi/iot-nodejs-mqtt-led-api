import express from 'express';
import bodyParser from 'body-parser';


/** */
import SERVER_CONFIG from './configs/server_config.json';
import routers from './src/routers/index';

/** */
var app=express();

/**config MiddleAware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

app.use('/', routers);


/** */
var server=app.listen(SERVER_CONFIG.server_port,()=>{
    console.log(`Server running at http://${SERVER_CONFIG.server_ip}:${server.address().port}/`);
});