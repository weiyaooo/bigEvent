$(function () {

    var form = layui.form;
    var layer = layui.layer

    $('.login-box').on('click', 'a', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });

    $('.reg-box').on('click', 'a', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })


    form.verify({

        pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            var pwd = $('.reg-box [name=password]').val();
            if (value !== pwd) {
                return '两次密码输入不一样'
            }
        }
    });
    //监听表单注册提交事件
    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/api/reguser',
            data: $(this).serialize(),//seralize 获取当前表单的所有内容并且按name排列好
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功,请登录');

                $('#link-reg').click();
            }
        })
    })


    $('#form-login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/api/login',
            data: $(this).serialize(),//seralize 获取当前表单的所有内容并且按name排列好
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败');
                }
                layer.msg('注册成功,请登录');
                localStorage.setItem('token', res.token);

                location.href = '/index.html'
            }
        })
    })
}); 