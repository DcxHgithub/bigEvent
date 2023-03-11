$(function() {
    let layer = layui.layer
    const form = layui.form
    initArtCateList()
        // 获取文章列表数据
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: (res) => {
                const htmlStr = template('tpl_table', res)
                $("tbody").html(htmlStr)
            }
        })
    }

    // 为添加类别按钮绑定点击事件
    let addIndex = null
    $("#btnAddCate").on('click', function() {
        addIndex = layer.open({
            title: '添加文章分类',
            type: '1',
            area: ['500px', '250px'],
            content: $('#dialog-add').html(),
        })
    })

    //通过代理形式为form 绑定提交时间---因为表单还未生成
    //给已经存在的父级绑定提交事件，并加一个参数
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    console.log(res);
                    return layer.msg('新增分类失败！')
                }
                initArtCateList()
                layer.msg('新增分类成功！')
                layer.close(addIndex)
            }
        })
    })

    //通过代理形式为 编辑 绑定提交事件---因为表单还未生成
    let editIndex = null
    $('tbody').on('click', '.btn-edit', function() {
        editIndex = layer.open({
            title: '修改文章分类',
            type: '1',
            area: ['500px', '250px'],
            content: $('#dialog-edit').html(),
        })
        let id = $(this).attr('data-id')
            //发请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                console.log(res);
                form.val('form-edit', res.data)
            }
        })

    })

    //通过代理形式 为修改分类添加表单绑定submit 事件
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新数据失败！')
                }
                layer.msg('更新数据成功！')
                layer.close(editIndex)
                initArtCateList()
            }
        })
    })

    //代理形式
    $("body").on('click', '.btn-delete', function(e) {
        let id = $(this).attr('data-id')
            //提示用户是否删除
        layer.confirm('确认删除', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: "GET",
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        console.log(res);
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)

                    initArtCateList()
                }
            })
        })
    })








})