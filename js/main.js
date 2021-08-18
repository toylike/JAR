$(function(){

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

new Swiper(".mySwiper", {
    effect: "coverflow",
    slidesPerView: 3,
    loop: true,
    speed: 700,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    autoplay: {
       delay: 4000,
       stopOnLastSlide: false,
       disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
      },
    breakpoints: {
        1027: {
            slidesPerView: 3,
        },

        760: {
            slidesPerView: 2,
        },

        100: {
            slidesPerView: 1,
        }
    }
  });

let checkPlayVideo = 1

const gallery_body = document.querySelector('._gallery__body');

  gallery_body.addEventListener('click', event => {
    event.preventDefault();

    if(event.target.closest('._gallery__card')){

        document.querySelector('.g_wrapp_popup').classList.remove('g_popup-hidden')
        $('.g_popup').slick('slickGoTo', event.target.closest('._gallery__card').getAttribute('name'));
        if(checkPlayVideo === 1){
            playVideo($('.g_popup .slick-current iframe'));
        }
        setTimeout(function() {
            checkPlayVideo = 0;
        }, 1000);
        
    }
  
  });

  let closed_butt = document.querySelector('.closed_popup');

    closed_butt.addEventListener('click', function(e){
        e.preventDefault();
        stopVideo($('.slick-current iframe'));
        document.querySelector('.g_wrapp_popup').classList.add('g_popup-hidden');
        checkPlayVideo = 1;

        if($('.g_popup__tools--expand a i').hasClass('fa-compress')){
            $('.g_wrapp_popup').removeClass('g_wrapp_popup--active')
            $('.slick-current iframe').removeClass('g_popup__wrappVideo--video--active');
            $('.g_popup__tools--expand a i').removeClass('fa-compress');
            $('.g_popup__tools--expand a i').addClass('fa-expand');
        }
        
    })


 $('.g_popup').on('afterChange', function(event, slick, currentSlide, nextSlide) {
    document.querySelector('.g_popup__numbering--elem').innerHTML = +$('.g_popup .slick-active').attr('name');
    
});



function playVideo(nextSlide){
    let changeSrc = nextSlide.attr('src') + '&autoplay=1';
    nextSlide.attr('src', changeSrc);
}

function stopVideo(currentSlide){
    let arrSrc = currentSlide.attr('src').split('');
    arrSrc.splice(-11)
    currentSlide.attr('src', arrSrc.join(''));
    
}

$('.g_popup').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    
    if(checkPlayVideo === 0){
        stopVideo($('.g_popup .slick-current iframe'))
    }

    if(!$('.g_popup__tools--expand a i').hasClass('fa-expand')){
        $('.slick-current iframe').removeClass('g_popup__wrappVideo--video--active');
    }

    });

$('.g_popup').on('afterChange', function(event, slick, currentSlide, nextSlide) {
    
    
    if(checkPlayVideo === 0){
        playVideo($('.g_popup .slick-current iframe'))
    }

    if(!$('.g_popup__tools--expand a i').hasClass('fa-expand')){
        $('.slick-current iframe').addClass('g_popup__wrappVideo--video--active');
    }
    
});

$('.g_popup__tools--expand')


$('.g_popup__tools--expand a').on('click', function (event) {
    event.preventDefault();

    if($('.g_popup__tools--expand a i').hasClass('fa-expand')){
        $('.g_wrapp_popup').addClass('g_wrapp_popup--active')
        $('.slick-current iframe').addClass('g_popup__wrappVideo--video--active')
        $('.g_popup__tools--expand a i').removeClass('fa-expand');
        $('.g_popup__tools--expand a i').addClass('fa-compress');
    }else{
        $('.g_wrapp_popup').removeClass('g_wrapp_popup--active')
        $('.slick-current iframe').removeClass('g_popup__wrappVideo--video--active')
        $('.g_popup__tools--expand a i').addClass('fa-expand');
        $('.g_popup__tools--expand a i').removeClass('fa-compress');
    }
    
})

