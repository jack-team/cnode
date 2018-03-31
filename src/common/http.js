import axios from 'axios';
import Qs from 'qs'

const instance = axios.create({
    baseURL: `https://cnodejs.org/api/v1`,
    timeout: 1000 * 10,
});

const common = (method, url, params) => {
    return new Promise((resolve, reject) => {
        const para = method === `get` ? {params} : params;
        instance[method](url, para).then(res => {
            const {data} = res;
            if (data.success) {
                resolve(data);
            } else {
                reject(data);
            }
        }).catch(({response}) => {
            reject({
                ...response.data,
                success: false,
            });
        })
    });
};

const get = (url, para) => common(`get`, url, para);

const post = (url, para) => common(`post`, url, para);

const upload = para => {
    const uploadUrl = `http://upload.yutao2012.com`;
    return axios.put(uploadUrl, para, {
        headers: {
            Authorization: `CE3CA381E7675B4F61D6E316BA156131`
        }
    }).then(({data}) => {
        if (data.code !== 200) {
            return Promise.reject(`上传失败！`);
        } else {
            return data.data;
        }
    }).catch(() => {
        return Promise.reject(`上传失败！`);
    })
};

export default {
    get,
    post,
    upload
};