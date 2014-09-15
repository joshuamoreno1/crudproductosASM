exports.config = {
    specs: [
//        'e2e/*.js',
        'e2e/**/*.js'
    ],
    baseUrl: 'http://localhost:9001',
    allScriptsTimeout: 60000,
//    seleniumAddress: 'http://localhost:4444/wd/hub',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};