
//引入zepto
var $ = require('./components/zepto-modules/_custom');
require('./components/zepto-modules/ajax');

module.exports = $;


//引入swiper
var Swiper=require('./components/swiper/swiper.min.js');
//打印swiper


var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        direction: 'vertical',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 30,
        autoplay: 6000,
        mousewheelControl: true,
        autoplayDisableOnInteraction: false
    });


$('.mainContent').hide();
$('.swiper-container').hide();


$('#enter').tap(function(){
	$('.mainContent').show();
	$('.swiper-container').hide();
	console.log($)
	pageload('skill');
})



//引入swiper.animate1.0.2.min.js
var SwiperAnimate =require('./components/swiper/swiper.animate1.0.2.min.js');
var IScroll=require("./components/iscroll/iscroll.js")




 var mySwiper = new Swiper ('.swiper-container', {
  onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
    SwiperAnimate.swiperAnimateCache(swiper); //隐藏动画元素 
    SwiperAnimate.swiperAnimate(swiper); //初始化完成开始动画
  }, 
  onSlideChangeEnd: function(swiper){ 
    SwiperAnimate.swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
  } 
  })    


$('.button').tap(function(){
	
	var app=$(this).attr('id');
	console.log(app);
	pageload(app);
})

function pageload(app){
	$.post('/api/'+app,{},function(response){
		var html="";
		for (var i = 0;i<response.length; i++) {
			html+='<li>'+response[i].category+'</li>'
		};
		$('#scroller ul').html(html);
		myScroll =new IScroll('#wrapper',{mouseWheel:true})
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	})	
}



var interval=setInterval(function(){
	if(document.readyState==='complete'){
		clearInterval(interval);
		$('#preload').hide();
		$('.swiper-container').show();
		mySwiper.updateContainerSize();
		mySwiper.updateSlidesSize();
	}else{
		$('#preload').show();
	}
},100);

