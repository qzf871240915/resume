
//引入zepto
var $ = require('./components/zepto-modules/_custom');
require('./components/zepto-modules/ajax');

module.exports = $;


//引入swiper
var Swiper=require('./components/swiper/swiper.min.js');

//引入swiper.animate1.0.2.min.js
var SwiperAnimate =require('./components/swiper/swiper.animate1.0.2.min.js');
var IScroll=require("./components/iscroll/iscroll.js")



/*对于swiper的初始化*/
 var mySwiper = new Swiper ('.swiper-container', {
  onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
    SwiperAnimate.swiperAnimateCache(swiper); //隐藏动画元素 
    SwiperAnimate.swiperAnimate(swiper); //初始化完成开始动画
  }, 
  onSlideChangeEnd: function(swiper){ 
    SwiperAnimate.swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
  } 
  })    



//设置翻页动画效果
var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true,
        spaceBetween: 0,
        centeredSlides: true,
        //autoplay: 6000,
        autoplayDisableOnInteraction: false
});


$('.mainContent').hide();
$('.swiper-container').hide();


$('.enter').tap(function(){
	$('.mainContent').show();
	$('.swiper-container').hide();
	console.log($)
	pageload('skill');
	$('#skill').css({'color':'#00e09e'});
})




$('.button').tap(function(){
	$(this).css({'color':'#00e09e'}).siblings().css({'color':'#000'});
	var app=$(this).attr('id');
	console.log(app);
	pageload(app);
})

function pageload(app){
	if (app==='skill') {
		$.post('/api/'+app,{},function(response){
			var html="";
			for (var i = 0;i<response.length; i++) {
				html+='<li><p>'+response[i].category+'</p><p><span>'+response[i].name+'</span><span>'+response[i].level+'</span></p></li>'
			};
			$('#scroller ul').html(html);
			myScroll =new IScroll('#wrapper',{mouseWheel:true})
			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		})	
	}else if (app==='my'){
		$.post('/api/'+app,{},function(response){
			var html="";
			for (var i = 0;i<response.length; i++) {
				html+='<li><p>'+response[i].category+'</p><p><span>'+response[i].name+'</span><span>'+response[i].detail+'</span></p></li>'
			};
			$('#scroller ul').html(html);
			myScroll =new IScroll('#wrapper',{mouseWheel:true})
			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		})	
	}else if(app==='work'){
		$.post('/api/'+app,{},function(response){
			var html="";
			for (var i = 0;i<response.length; i++) {
				html+='<li><p>'+response[i].category+'</p><p><span>'+response[i].name+'</span><span>'+response[i].time+'</span></p></li>'
			};
			$('#scroller ul').html(html);
			myScroll =new IScroll('#wrapper',{mouseWheel:true})
			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		})	
	}else if(app==='project'){
		$.post('/api/'+app,{},function(response){
			var html="";
			for (var i = 0;i<response.length; i++) {
				html+='<li><p>'+response[i].category+'</p><p><span>'+response[i].name+'</span><span>'+response[i].description+'</span></p></li>'
			};
			$('#scroller ul').html(html);
			myScroll =new IScroll('#wrapper',{mouseWheel:true})
			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		})	
	}else if(app==='instructs'){
		$.post('/api/'+app,{},function(response){
			var html="";
			for (var i = 0;i<response.length; i++) {
				html+='<li><p>'+response[i].category+'</p><p><span>'+response[i].name+'</span><span>'+response[i].url+'</span></p></li>'
			};
			$('#scroller ul').html(html);
			myScroll =new IScroll('#wrapper',{mouseWheel:true})
			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		})	
	}
	
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


// $("#pre-enter").tap(function(){
// 	$('.swiper-container').hide();
// 	$('.mainContent').show();
// })
