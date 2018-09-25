const mockPaths = require('./mock.json').mockPaths;
const srcProxyHandler = require('./srcProxyHandler.js');
const apiProxyHandler = require('./apiProxyHandler.js');

module.exports = async (ctx, next) => {
	if (mockPaths.includes(ctx.path)) {
		await next()
	} else {
		await apiProxyHandler(ctx, next);
		if(!ctx.ready) {
			await srcProxyHandler(ctx, next);
		}
		if(!ctx.ready) {
			await next();
		}
	}
}