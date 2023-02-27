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
        "psw": "[/^[\s]{6,12}$/, '密码6-12位，且不能含空格']"
    })







})