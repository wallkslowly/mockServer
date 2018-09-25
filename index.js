const koa = require('koa');
const mockHandler = require('./mockHandler.js');
const proxyHandler = require('./proxyHandler.js');
const mockInfo = require('./mock.json');
const app = new koa();
const { port } = mockInfo

app.use(proxyHandler);
app.use(mockHandler);
app.listen(port, function() {
    console.log(`mock at ${port}`);
});