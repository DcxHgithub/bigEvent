//每次调用$.get。。。时会先调用ajaxPrefilter函数，可以拿到
// 我们给ajax提供的url
$.ajaxPrefilter(function(options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url);
})