# mockserver

安装：

    npm install --save-dev mockserver
    
    注意-dev，只在开发环境生效
    
使用：

    1.启动mock服务
    
    const mockServer = require('mockserver')
    
    mockServer(options)
    
    2.将请求代理到mockserver，可以用浏览器代理，webpack-dev-server代理
    
    mockServer会进行代理，如果远端资源可用，就获取远端资源。否则，会走本地mock
    
配置说明：

    options.srcTarget => 项目资源路径
    
    options.apiTarget => 网络请求路径）
    
    options.port => mockserver启动端口
    
    mockPaths => 配置请求path，直接访问数据
    
    一个配置的例子：
    
    {
        srcTarget: "http://10.3.51.13:80",
        apiTarget: "http://10.3.51.13:80",
        port: 3000,
        mockPaths: [
            "/pgc/serial/novel/book/v1/book_volume/add_volume",
            "/pgc/serial/novel/book/v1/book_volume/modify",
            "/pgc/serial/novel/book/v1/modify_order",
            "/pgc/serial/novel/book/v1/create_book"
        ]
    }
    
tips:

    一些需要mock的数据的请求，可以配置在mockPaths中
