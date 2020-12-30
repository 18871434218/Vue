// 项目环境可能有开始环境、测试环境和生产环境

// 环境的切换
if (process.env.NODE_ENV == 'development') {    
    axios.defaults.baseURL = 'https://www.baidu.com';} 
else if (process.env.NODE_ENV == 'debug') {    
    axios.defaults.baseURL = 'https://www.ceshi.com';
} 
else if (process.env.NODE_ENV == 'production') {    
    axios.defaults.baseURL = 'https://www.production.com';
}

// 请求超时
// 通过axios.defaults.timeout设置默认的请求超时时间，例如超过了10s,就会告知用户当前请求超时，请刷新等
axios.defaults.timeout = 10000;

