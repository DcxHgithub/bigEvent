$(function() {
    //注册账号的连接
    $('#link-reg').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    $('#link-login').on('click', function() {
        $('.reg-box').show()
        $('.login-box').hide()
    })

    // 从layui中获取form对象
    let form = layui.form
        //自定义名为psw校验规则 ==> 引用到UI结构中
    form.verify({
            //配置项以键值对形式，两边都必须加""
            psw: [/^[^\s]{6,12}$/, '密码6-12位且不能含空格'],
            // 娇艳两次密码是否一致
            repwd: function(value) {
                //拿到确认密码中的内容，密码框中的内容没拿到
                let pwd = $('.reg-box [name=password]').val()

                if (pwd !== value) {
                    return "两次密码不一致!"
                }
            }
        })
        //监听注册表单提交事件
    $("#form_reg").on("submit", function(e) {
        e.preventDefault()
        $.post('/api/reguser', {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },

            function(res) {

                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                console.log(res)
                layui.layer.msg('注册成功，请登录!')
                $("#link-reg").click()
            })
    })

    //登录功能
    //监听登录按钮
    $("#form_login").submit(function(e) {
        e.preventDefault()
            //发起ajax 请求
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('登录失败!')
                }
                layui.layer.msg('登录成功!')

                console.log(res);
                // 将服务器发送的token保存到localStorage中
                localStorage.setItem('token', res.token)
                    //跳转index
                location.href = '/index.html'
            }
        })
    })





})