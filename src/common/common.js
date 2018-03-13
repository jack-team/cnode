/**
 * Created by jiangtao on 2017/5/18.
 */
import '../styles/reset.scss';
import '../styles/common.scss';

import FastClick from "fastclick";
FastClick.attach(document.body);

window.diffTime=time=>{
    const diff = Date.now()-new Date(time).getTime();
    const h = ~~(diff / 3600000),
        m = ~~(diff % 3600000 / 60000 ),
        d = ~~(h / 24);
    //如果时间小于1天
    if(h < 24 ) return h > 0 ? `${h}小时前`:`${m}分钟前`;
    //如果时间小于等于30天
    if(d <= 30 ) return `${d}天前`;
    //如果大于30天
    const mouth = ~~(d/30);
    return mouth < 12 ? `${mouth}个月前`:`${~~(mouth/12)}年前`
};