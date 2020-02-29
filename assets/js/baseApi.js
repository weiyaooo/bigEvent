//注意:今后每个页面,凡是需要发起ajax 请求
// 都必须导入这个baseAPI.js 之后,再发起请求
//否则 就无法统一为ajax 请求 ,拼接URL根路径

$.ajaxPrefilter(function (option) {
    option.url = 'http://www.liulongbin.top:3007' + option.url

    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token')
        }


        option.complete = function (res) {

            console.log(res.responseJSON.status);
            // 使用 res.responseJSON 获取到服务器的响应内容
            if (res.responseJSON.status === 1 && res.responseJSON.message === '登录失败！') {
                // 用户没有登录，就来访问 index 页面
                // 1. 清空假 token
                console.log(res.responseJSON.status);
                localStorage.removeItem('token')
                // 2. 强制用户跳转到 登录页面
                location.href = '/login.html'
            }
        }

    }

})