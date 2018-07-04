const fullFormat = (d, gap = ' ', max = 19) => {
    if (!d) return;
    if (typeof(gap) === 'number') {
        max = gap
        gap = ' '
    }
    const t = new Date(+new Date(d) + 288e5).toJSON().substr(0, max)
    return gap==='T' ? t : t.replace('T', gap)
}

const regExp = (p, t = 'mp') => {        // 正則判断
    switch(t){
        case 'pw':                      // 驗證8-16位密碼
            return /\w{8,16}$/.test(p);
        case 'mp':                      // 驗證手機號
            return /^1[3,4,5,7,8]{1}[0-9]{9}$/.test(p);
        case 'id':                      // 验证身份证(超级严格)
            return /^[1-9]\d{5}[1-2]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(p);
        default:
            return;
    }
}

export {
    fullFormat,
    regExp
}