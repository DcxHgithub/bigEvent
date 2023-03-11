$(function() {
    //获取用户基本信息
    getUserInfo()
    $("#logoutBtn").on('click', function() {
        layui.layer.confirm('确定要退出？', { icon: 3, title: "提示" }, function(index) {
            //登陆反方向 清除token 跳回登录
            localStorage.removeItem('token')
            location.href = '/login.html'
        })
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        /* headers: {
            Authorization: localStorage.getItem('token') || ''
        }, */
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('用户信息获取失败')
            }
            //渲染头像
            // layui.layer.msg('用户信息获取成功')
            renderAvatar(res.data)

        },
        //服务器发送成功，失败，完成三个状态，完成是不管成功失败都会发生，通过完成判断token
        complete: function(res) {
            // 判断接收的状态，成功或失败
            if (res.responseJSON.status === 1 && res.responeseJSON.message == '身份认证失败！ ') {
                //强制清空token
                localStorage.removeItem('token')
                    //强制跳转到登录
                location.href = '/login.html'
            }

        }
    })
}

// 渲染用户的头像
function renderAvatar(user) {

    // 1. 获取用户的名称
    var name = user.nickname || user.username
        // 2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide()
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar')
            .html(first)
            .show()
    }
}