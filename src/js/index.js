// jQuery 的入口函数
$(function() {

    // 1. 根据 cookie 中的信息
    // 判断用户信息面板中显示哪一个内容
    const nickname = getCookie('nickname')

    // 2. 根据 nickname 信息进行判断
    if (nickname) {
        // 表示存在, 不是 undefined
        $('.off').addClass('hide')
        $('.on').removeClass('hide').html(`您好：${nickname}   <span class="esc" style="color:red; cursor:pointer;">退出</span>`)

        // 才制作购物车联动
        setCartNum()
    } else {
        // 表示不存在, 是 undefined
        $('.off').removeClass('hide')
        $('.on').addClass('hide')
    }

    // 3. 拿到购物车里面有多少数据
    // 填充到指定位置
    function setCartNum() {
        // 拿到 localStorage 里面的那个数组
        const cart = JSON.parse(window.localStorage.getItem('cart')) || []
            // 3-2. 判断 cart 是一个 [], 那么就用 0 填充到指定位置
        if (!cart.length) {
            $('.cartNum').html('0')
            return
        }

        // 3-3. 能来到这里, 表示购物车里面有数据
        // 需要把每一条数据的 cartNum 叠加咋一起
        let count = 0
        cart.forEach(item => count += item.cart_number - 0)
        $('.cartNum').html(count)
    }

    $('ul li').on('click', 'span.esc', function() {
        setCookie('nickname', '', -1)
        window.location.reload()
    })



})