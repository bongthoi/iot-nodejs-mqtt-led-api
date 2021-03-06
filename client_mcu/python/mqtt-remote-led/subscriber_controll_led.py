import paho.mqtt.client as mqtt
from gpiozero import LED
import time

led = LED(20)
# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.
    print("subscribe to stc/floor1/showroom/brightness/led")
    client.subscribe("stc/floor1/showroom/brightness/led")
   
    

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))
    if msg.payload == "on":
        led.on()
    if msg.payload == "off":
        led.off()

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect("103.77.169.244", 1883, 60)

# Blocking call that processes network traffic, dispatches callbacks and
# handles reconnecting.
# Other loop*() functions are available that give a threaded interface and a
# manual interface.
client.loop_forever()