import Path from 'path';
import colors from 'colors';

//绝对路径
export const resolve = path => (
    Path.resolve(process.cwd(), path)
);

//字节单位转换
export const bytesToSize = bytes => {
    if (!bytes) return `0 B`;
    const k = 1024;
    const sizes = [`B`, `KB`, `MB`, `GB`, `TB`, `PB`, `EB`, `ZB`, `YB`];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

//打包输出打印
export const outputLog = (err, stats) => {
    if (!!err) {
        const {
            stack,
            details
        } = err || {}
        const msg = !!details ? details : (stack || err);
        return console.log(colors.red(msg));
    }
    const {
        assets
    } = stats.toJson();
    const output = {};
    assets.forEach(({name, size}) => (
        output[name] = {
            size: bytesToSize(size)
        }
    ));
    console.table(output);
    console.log(colors.green(`build successful!\n`));
}