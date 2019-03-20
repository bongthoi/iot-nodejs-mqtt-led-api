import express from 'express';
import MqttService from '../services/MqttService';
import httpStatus from '../../configs/httpStatus.json';
import data from '../../configs/data.json'

/** */
let router = express.Router();
var mqttService=new MqttService();
mqttService.connect();

/**public */
router.get("/", (req, res) => {
	res.json({"Project Name":"iot-nodejs-mqtt-led-api"});;
});

/**
 * Mqtt API
 */

router.get("/api/stc/floor1/showroom/light/:status", function(req, res) {
	let method=data.topic1;
	console.log(method+" ===>start");

	let topic=data.topic1;
	let message=req.params.status;
	try {
		mqttService.subscribeTopic(topic);
		mqttService.publishMessage(topic,message,0,false);	

		console.log(method+" -->success");
		res.json({"status":httpStatus.success,"data":{topic:topic,message:message}});	
	} catch (error) {
		console.log(method+" -->failed");
		res.json({"status":httpStatus.failed});			
	}
	
	//res.status(200).send(topic+" -->"+ message);
  });

  


/**export */
module.exports = router;