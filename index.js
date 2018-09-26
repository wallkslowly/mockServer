const path = require('path');
const fs = require('fs');
const koa = require('koa');
const mockHandler = require(path.join(__dirname, '/handler/mockHandler.js'));
const proxyHandler = require(path.join(__dirname, '/handler/proxyHandler.js'));
const app = new koa();
module.exports = (options) => {
    // 传参配置/mock.json配置
    let mockConfig = options;
    if (!mockConfig) {
        mockConfig = JSON.parse(fs.readFileSync(path.join(process.cwd(), '/mock.json')));
    }
    // 代理中间件
    app.use(proxyHandler(mockConfig));
    // 读取mock数据中间件
    app.use(mockHandler);
    const { port=3000 } = mockConfig;
    app.listen(port, function() {
        console.log(`mock at ${port}`);
    });
}