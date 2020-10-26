const { connect } = require('mqtt')

function createClient (brokerUrl) {
    brokerUrl = brokerUrl || 'mqtt://127.0.0.1'
    const options = {
        clean: true,
        connectTimeout: 40000,
        keepAliveInterval: 100,
        clientId: `mqtt-client-backend-${Math.random().toString(16).substr(2, 8)}`
    }
    const client = connect(brokerUrl, options)

    if (process.env.NODE_ENV !== 'production') {
        client.on('connect', (packet) => {
            // console.log("mqtt client connected ID:", options.clientId);
        })

        client.on('error', (err) => {
            console.error('mqtt error:', err)
        })

        client.on('message', (topic, message) => {
            // console.log('topic:', topic, '\n', 'message:', message.toString());
        })
    }
}
// 'wss://www.sunnyiov.com/mqtt'
// const clinet = createClient('mqtt://127.0.0.1');
const client = createClient('wss://www.sunnyiov.com/mqtt')

module.exports = { client }
