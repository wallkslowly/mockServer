const path = require('path');
const fs = require('fs');
const url = require('url');

module.exports = (mockConfig) => {
    const folderPath = mockConfig.folderPath || `${process.cwd()}/mock/`;
    return async (ctx) => {
        const method = ctx.method.toLowerCase();
        const urlInfo = url.parse(ctx.url);
        let pathname = urlInfo.pathname;
        if (pathname[pathname.length-1] === '/') {
            pathname = pathname.substring(0, pathname.length - 1);
        }
        // 处理请求/后缀
        const filePath = `/${method}${pathname}.json`;
        console.log('from mock: ', path.join(folderPath, filePath));
        if (fs.existsSync(path.join(folderPath, filePath))) {
            const data = fs.readFileSync(path.join(folderPath, filePath), 'utf8');
            ctx.body = data.toString();
            ctx.type = 'json';
        }
    }
}