"use strict";$(function(){var e=getCookie("nickname");e?($(".off").addClass("hide"),$(".on").removeClass("hide").html("您好：".concat(e,'   <span class="esc" style="color:red; cursor:pointer;">退出</span>')),function(){var e=JSON.parse(window.localStorage.getItem("cart"))||[];if(!e.length)return $(".cartNum").html("0");var o=0;e.forEach(function(e){return o+=+e.cart_number}),$(".cartNum").html(o)}()):($(".off").removeClass("hide"),$(".on").addClass("hide")),$("ul li").on("click","span.esc",function(){setCookie("nickname","",-1),window.location.reload()})});