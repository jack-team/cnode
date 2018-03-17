import axios from 'axios';

const instance = axios.create({
    baseURL: `https://cnodejs.org/api/v1`,
    timeout: 1000 * 10,
});

const common = (method, url, params) => {
    return new Promise((resolve, reject) => {
        const para = method === `get` ? { params } : params;
        instance[method]( url, para).then(res => {
            const { data } = res;
            if (data.success) {
                resolve(data);
            } else {
                reject(data);
            }
        }).catch(({response}) => {
            reject({
                ...response.data,
                success:false,
            });
        })
    });
};

const get = (url, para) => common(`get`, url, para);

const post = (url, para) => common(`post`, url, para);

export default {
    get,
    post
};