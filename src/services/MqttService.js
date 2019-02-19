import mqtt from 'mqtt';
import mqtt_config from '../../configs/mqtt_config.json' 


class MqttService {
  constructor() {
    this.mqttClient = null;
    this.host = mqtt_config.host;
/*     this.username = mqtt_config.username; 
    this.password = mqtt_config.password; */
  }
  
  connect() {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    /* this.mqttClient = mqtt.connect(this.host, { username: this.username, password: this.password }); */
    this.mqttClient = mqtt.connect(this.host);

    // Mqtt error calback
    this.mqttClient.on('error', (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on('connect', () => {
      console.log(`Mqtt client is connected`);
    });

    // mqtt subscriptions
    

    // When a message arrives, console.log it
    this.mqttClient.on('message', function (topic, message) {
      console.log(topic+" -->"+message.toString());
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
  }

// subscribe to topic: mytopic
  subscribeTopic(_topic){
    this.mqttClient.subscribe(_topic, {qos: 0});
  }

  // Sends a mqtt message to topic: mytopic
  publishMessage(_topic,_message) {
    this.mqttClient.publish(_topic, _message);
  }
}

module.exports = MqttService;
