$(function() {
    let form = layui.form

    form.verify({
        psw: [/^[\w]{6,12}$/, '密码必须6-12位，且不能有空格'],
        samePsw: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        difPwd: function(value) {
            if (value !== $("[name=newPwd").val()) {
                return '两次密码不相同！'
            }
        }
    })

    $(".layui-form").on('submit', function(e) {
        console.log(123456);
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return '重置密码失败！'
                }
                layui.layer.msg('密码重置成功！')
            }
        })
    })
})