import express from 'express';
import MqttService from '../services/MqttService';

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

router.get("/api/stc/floor1/showroom/brightness/led/:status", function(req, res) {
	let topic="stc/floor1/showroom/brightness/led";
	let message=req.params.status;

	mqttService.subscribeTopic(topic);
	mqttService.publishMessage(topic,message);
	res.status(200).send(topic+" -->"+ req.params.status);
  });


/**export */
module.exports = router;