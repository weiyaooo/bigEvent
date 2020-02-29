$(function () {
    // 获取用户基本信息
    var layer = layui.layer
    getUserInfo()

    $('#btnLogout').on('click', function () {
        layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token');
            location.href = '/login.html'

            layer.close(index);
        });

    })
})

function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     AuAuthorization: localStorage.getItem('token')
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layui.msg('获取用户信息失败!')
            }
            renderAvatar(res.data)
        }

    })
}



function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    if (user.user_pic) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    }
    else {
        //渲染文本的头像
        $('.layui-nav-img').hide()
        //获取用户名的第一字符串
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}


