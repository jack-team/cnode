const matchImageUrl=str=>{
    const imgReg=/<img.*?(?:>|\/>)/gi;
    const srcReg=/src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    const arr = str.match(imgReg);
    return arr.map(imgStr => {
        const src = imgStr.match(srcReg);
        return src[1];
    })
};

export {
    matchImageUrl
}