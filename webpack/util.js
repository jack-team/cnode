/**
 * Created by jiangtao on 2017/2/14.
 */

// 获取本机的ip

module.exports.getIPAddress=function (){
    const interfaces = require('os').networkInterfaces();
    for(let devName in interfaces){
        let iface = interfaces[devName];
        for(let i=0;i<iface.length;i++){
            let alias = iface[i];
            if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                return alias.address;
            }
        }
    }
};

//端口号
module.exports.port = 8088;


