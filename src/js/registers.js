$(function() {
    $('#register').validate({
        rules: {
            username: {
                required: true,
                minlength: 6,
                maxlength: 10
            },
            password: {
                required: true,
                minlength: 5,
                maxlength: 12
            },
            nickname: {
                required: true,
                minlength: 5,
                maxlength: 10
            },
            repeat: {
                equalTo: "#password"
            }
        },
        messages: {
            username: {
                required: '请设置您的账号',
                minlength: '最少需要填写 6 个字符',
                maxlength: '最多可以填写 10 个字符'
            },
            password: {
                required: '请设置您的密码',
                minlength: '最少需要填写 5 个字符',
                maxlength: '最多可以填写 12 个字符'
            },
            nickname: {
                required: '请设置您的昵称',
                minlength: '最少需要填写 5 个字符',
                maxlength: '最多可以填写 10 个字符'
            },
            repeat: {
                equalTo: '两次密码不一致'
            }
        },
        submitHandler(form) {
            const info = $(form).serialize()
            $.post('/zhang/registers.php', info, null, 'json').then(function(res) {
                console.log(res)
                if (res.code === 0) {
                    $('.login_error').removeClass('hide')
                } else if (res.code === 1) {
                    setCookie('nickname', res.nickname)
                    window.location.href = '../pages/login.html'
                }
            })
        }
    })
})