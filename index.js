const path = require('path');
const fs = require('fs');
const koa = require('koa');
const mockHandler = require('./handler/mockHandler.js');
const proxyHandler = require('./handler/proxyHandler.js');
const mockMiddleware = require('./middleware/mockMiddleware');

const app = new koa();
const mockServer = (options) => {
    // 传参配置/mock.json配置
    let mockConfig = options;
    if (!mockConfig) {
        if (fs.existsSync(path.join(process.cwd(), '/mock.json'))) {
            mockConfig = JSON.parse(fs.readFileSync(path.join(process.cwd(), '/mock.json')));
        } else {
            mockConfig = {}
        }
    }
    // 代理中间件
    app.use(proxyHandler(mockConfig));
    // 读取mock数据中间件
    app.use(mockHandler(mockConfig));
    const { port = 3000 } = mockConfig;
    app.listen(port, () => {
        console.log(`mock at ${port}`);
    });
}

module.exports = {
    mockServer,
    mockMiddleware
}