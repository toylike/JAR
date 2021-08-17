$(function(){

    $('.gallery_body').slick({
        arrows: true,
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 700,
        autoplay: false

    })

    $('.g_popup').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        cssEase: 'linear',
        speed: 0,
        nextArrow: "<img src='img/right-arrow.svg' class='slick-next' alt='2'>",
        prevArrow: "<img src='img/right-arrow.svg' class='slick-prev' alt='1'>"
    })

})

let checkPlayVideo = 1

const gallery_body = document.querySelector('.gallery_body');

  gallery_body.addEventListener('click', event => {
    event.preventDefault();

    if(event.target.closest('.gallery_card')){

        document.querySelector('.g_wrapp_popup').classList.remove('g_popup-hidden')
        $('.g_popup').slick('slickGoTo', event.target.closest('.gallery_card').getAttribute('name'));
        // console.log(event.target.closest('.gallery_card').getAttribute('name'))
        // document.querySelector('.g_popup__numbering--elem').innerHTML = +event.target.closest('.gallery_card').getAttribute('name') + 1
        // console.log($('.slick-current iframe').attr('src'))
        if(checkPlayVideo === 1){
            playVideo($('.g_popup .slick-current iframe'));

            // checkPlayVideo = 0;
            // console.log(checkPlayVideo)
        }
        setTimeout(function() {
            checkPlayVideo = 0;
        }, 1000);
        // playVideo($('.g_popup .slick-current iframe'))
        
    }
  
  });

  let closed_butt = document.querySelector('.closed_popup');

    closed_butt.addEventListener('click', function(e){
        e.preventDefault();
        stopVideo($('.slick-current iframe'));
        document.querySelector('.g_wrapp_popup').classList.add('g_popup-hidden');
        checkPlayVideo = 1;
        
})


 $('.g_popup').on('afterChange', function(event, slick, currentSlide, nextSlide) {
    document.querySelector('.g_popup__numbering--elem').innerHTML = +$('.g_popup .slick-active').attr('name');
    
});



function playVideo(nextSlide){
    let changeSrc = nextSlide.attr('src') + '?autoplay=1&';
    nextSlide.attr('src', changeSrc);
}

function stopVideo(currentSlide){
    let arrSrc = currentSlide.attr('src').split('');
    arrSrc.splice(-12)
    currentSlide.attr('src', arrSrc.join(''));
    
}

$('.g_popup').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    if(checkPlayVideo === 0){
        stopVideo($('.g_popup .slick-current iframe'))
    }
    
});

$('.g_popup').on('afterChange', function(event, slick, currentSlide, nextSlide) {

    if(checkPlayVideo === 0){
        playVideo($('.g_popup .slick-current iframe'))
    }
    
});

      
    // var tag = document.createElement('script');

    //   tag.src = "https://www.youtube.com/iframe_api";
    //   var firstScriptTag = document.getElementsByTagName('script')[0];
    //   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


    //   var player;
    //   function onYouTubeIframeAPIReady() {
    //     player = new YT.Player('player', {
    //       height: '360',
    //       width: '640',
    //       videoId: 'M7lc1UVf-VE',
    //       events: {
    //         'onReady': onPlayerReady,
    //       }
    //     });
    //   }

    //   function onPlayerReady(event) {
    //     event.target.playVideo();
    //   }
