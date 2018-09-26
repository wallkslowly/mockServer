const path = require('path');
const srcProxyHandler = require(path.join(__dirname, '/srcProxyHandler.js'));
const apiProxyHandler = require(path.join(__dirname, '/apiProxyHandler.js'));

module.exports = (mockConfig) => {
	const { mockPaths } = mockConfig;
	return async (ctx, next) => {
		if (mockPaths.includes(ctx.path)) {
			await next()
		} else {
			await apiProxyHandler(ctx, mockConfig);
			if(!ctx.ready) {
				await srcProxyHandler(ctx, mockConfig);
			}
			if(!ctx.ready) {
				await next();
			}
		}
	}
}