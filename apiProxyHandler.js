const ServerResponse = require('http').ServerResponse;
const httpProxy  = require('http-proxy');
const mockConfig = require('./mock');
const proxy = httpProxy.createProxyServer({
    target: mockConfig.apiTarget
});
proxy.on('end', (req, res, proxyRes) => {
    res.emit('proxyEnd', req, res, proxyRes);
})
module.exports = async (ctx, next) => {
    const res = new ServerResponse(ctx.req);
    const bodyBuffers = [];
    res.write = (chunk) => {
        bodyBuffers.push(chunk);
        return true;
    }
    await new Promise((resolve) => {
        proxy.web(ctx.req, res);
        res.once('proxyEnd', (req, resAssist, proxyRes) => {
            resAssist.body = Buffer.concat(bodyBuffers);
            resolve(proxyRes);
        })
    })
    if (res.statusCode !== 404) {
        ctx.status = res.statusCode;
        for (const name in res._headers) {
            ctx.set(name, res._headers[name]);
        }
        ctx.body = res.body;
        ctx.ready = true;
    }
}