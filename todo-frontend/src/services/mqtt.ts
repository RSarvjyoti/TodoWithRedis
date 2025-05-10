import mqtt from "mqtt";

const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt", {
  protocol: "wss",
  clientId: "web-client-" + Math.random().toString(16).substr(2, 8),
  reconnectPeriod: 1000,
});

client.on("connect", () => {
  console.log("Connected to MQTT Broker via WebSocket");
});

client.on("error", (err) => {
  console.error(" MQTT connection error:", err);
});

export const publishTask = (message: string) => {
  if (client.connected) {
    client.publish("/add", message);
  } else {
    console.warn("MQTT not connected, retrying in 1s...");
    setTimeout(() => publishTask(message), 1000);
  }
};
