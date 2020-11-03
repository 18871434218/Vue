const config = {
    mqtt: {
        brokerUrl: "mqtt://127.0.0.1",
        options: {
            port: 1884,
            clean: true,
            connectTimeout: 40000,
            keepAliveInterval: 1000,
            clientId:
                "mqtt_frontend" + Math.random().toString(16).substr(2, 8)
        }
    },
    http: {
        baseURL: "http://127.0.0.1:8888"
    }
};

// 开发时，修改此处配置参数
if (process.env.NODE_ENV !== "production") {
    config.mqtt.brokerUrl = "mqtt://10.0.16.25";
    config.http.baseURL = "http://10.0.12.78:8888";
}

export default config;
