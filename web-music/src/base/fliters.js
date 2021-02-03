//首字母大写
export const capitalize = function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
}

//性别过滤器
export const filterGender = function (value) {
    if (!value) return ''
    if (value === 1) {
        return "男"
    } else {
        return "女"
    }
}

//时间戳转换
export const filterDate = function (value) {
    const date = new Date(value)
    const y = date.getFullYear()
    let MM = date.getMonth() + 1
    MM = MM < 10 ? ('0' + MM) : MM
    let d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    let h = date.getHours()
    h = h < 10 ? ('0' + h) : h
    let m = date.getMinutes()
    m = m < 10 ? ('0' + m) : m
    let s = date.getSeconds()
    s = s < 10 ? ('0' + s) : s
    return y + '-' + MM + '-' + d
    // return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
}
//年龄过滤器
export const filterAge = function (timeStamp) {
    let birthDate = timeStamp.substr(0, 4);
    let newDate = new Date().getFullYear();
    return (newDate - parseInt(birthDate));
}

export default {
    install(Vue) {
        Vue.filter('capitalize', capitalize);
        Vue.filter('filterGender', filterGender);
        Vue.filter('filterDate', filterDate);
        Vue.filter('filterAge', filterAge);


    }
};
