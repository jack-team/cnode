export default len => {
    len = len || 32;
    const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    const maxPos = $chars.length;
    let pwd = ``;
    for (let i = 0; i < len; i++) {
        const random = Math.random() * maxPos;
        pwd += $chars.charAt(Math.floor(random));
    }
    return pwd;
}