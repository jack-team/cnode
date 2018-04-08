/**
 * Created by jiangtao on 2017/5/18.
 */
import '../styles/reset.scss';
import '../styles/common.scss';

import FastClick from "fastclick";
FastClick.attach(document.body);

window.formatTime = time => {
    const diff = Date.now()-new Date(time).getTime();
    const h = ~~(diff / 3600000),
        m = ~~(diff % 3600000 / 60000 ),
        d = ~~(h / 24);
    //如果时间小于1天
    if(h < 24 ) return h > 0 ? `${h}小时前`:m>0?`${m}分钟前`:`刚刚`;
    //如果时间小于等于30天
    if(d <= 30 ) return `${d}天前`;
    //如果大于30天
    const mouth = ~~(d/30);
    return mouth < 12 ? `${mouth}个月前`:`${~~(mouth/12)}年前`;
};

//日期格式化
Date.prototype.pattern=function(fmt) {
    let o = {
        "M+" : this.getMonth()+1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours()%12 === 0 ? 12 : this.getHours()%12, //小时
        "H+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S" : this.getMilliseconds() //毫秒
    };
    let week = {
        "0" : "日",
        "1" : "一",
        "2" : "二",
        "3" : "三",
        "4" : "四",
        "5" : "五",
        "6" : "六"
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "星期" : "周") : "")+week[this.getDay()+""]);
    }
    for(let k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length===1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
};

window.trim=str=>{
    str=str||``;
    return str.replace(/(^\s*)|(\s*$)/g,``);
};