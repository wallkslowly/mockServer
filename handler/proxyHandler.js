const srcProxyHandler = require('./srcProxyHandler.js');
const apiProxyHandler = require('./apiProxyHandler.js');

module.exports = (mockConfig) => {
	const { mockPaths, apiTarget, srcTarget } = mockConfig;
	return async (ctx, next) => {
		if (mockPaths && mockPaths.indexOf(ctx.path) !== -1) {
			await next();
		} else {
			// 判断是否需要开启api代理
			if (apiTarget) {
				await apiProxyHandler(ctx, mockConfig);
			}
			// 判断是否需要src代理
			if(srcTarget && !ctx.ready) {
				await srcProxyHandler(ctx, mockConfig);
			}
			if(!ctx.ready) {
				await next();
			}
		}
	}
}