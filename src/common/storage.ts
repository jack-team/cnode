export const get = (key: string) => {
    const res = sessionStorage.getItem(key) as string;
    try {
        return JSON.parse(res);
    }
    catch (e) {
        return res;
    }
}

export const set = (key: string, value: any) => {
    sessionStorage.setItem(key, JSON.stringify(value));
    return value;
}


export const JUMP_PATH:string = `jump/path`;


