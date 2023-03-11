$(function() {
    layui.form.verify({
        nickname: function(value) {
            if (value.length > 7) {
                return '昵称长度必须在1-6位数之间'
            }
        }
    })
    initUserInfo()

    //初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败')
                }
                // 调用form.val()快速赋值
                console.log(layui.form);
                layui.form.val('form_userInfo', res.data)
            }
        })
    }

    //重置表单
    $("#btn-reset").on('click', function(e) {
        e.preventDefault()
        initUserInfo()
    })
})

//
$(".layui-form").on('submit', function(e) {
    e.preventDefault()
    $.ajax({
        method: 'POST',
        url: '/my/userinfo',
        data: $(this).serialize(),
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('更新用户信息失败！')
            }
            layui.layer.msg('更新用户信息成功！')
            window.parent.getUserInfo()
        }
    })
})