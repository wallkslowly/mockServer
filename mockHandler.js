const path = require('path');
const fs = require('fs');
const url = require('url');

module.exports = async (ctx, next) => {
    const method = ctx.method.toLowerCase()
    const urlInfo = url.parse(ctx.url)
    const pathname = urlInfo.pathname
    // 处理请求/后缀
    const filePath = `/${method}${pathname}.json`;
    console.log(filePath)
    if (fs.existsSync(path.join(__dirname, '/mock/', filePath))) {
        const data = fs.readFileSync(path.join(__dirname, '/mock/', filePath), 'utf8');
        ctx.body = data.toString();
        ctx.type = 'json'
    }
}