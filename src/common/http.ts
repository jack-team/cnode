import $http from 'axios';

export const baseUrl: string = `https://cnodejs.org`;

const Ajax = $http.create({
    baseURL: `${baseUrl}/api/v1`,
    timeout: 1000 * 10
});

interface Para {
    readonly method: string,
    readonly url: string,
    readonly data?: any,
    readonly params?: any
}

const Send = (para: Para) => (
    new Promise((resolve, reject) => (
        Ajax(para).then(res => {
            const {
                data,
                success
            } = res.data;
            if (success) {
                return (
                    resolve(data)
                )
            }
            reject({
                code: 500,
                data: {},
                message: `请求失败.`
            })
        }).catch(() => {
            reject({
                code: 500,
                data: {},
                message: `请求失败!`
            })
        })
    ))
)

export const get = (
    url: string,
    data?: any
) => Send({
    url: url,
    params: data,
    method: `get`
});

export const post = (
    url: string,
    data?: any
) => Send({
    url: url,
    data: data,
    method: `post`
});
