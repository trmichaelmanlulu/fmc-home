$(function() { // On ready

    /* Shop Gear carousel */
    $('.sg_carousel').slick({
    slidesToShow: 3,
    centerPadding: '320px',
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
        {
        breakpoint: 3000,
        settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '230px',
                slidesToShow: 3
            }
        },
        {
        breakpoint: 1350,
        settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '180px',
                slidesToShow: 3
            }
        },
        {
        breakpoint: 992,
            settings: {
                arrows: false,
                centerPadding: '0px',
                slidesToShow: 2
            }
        },
        {
        breakpoint: 768,
            settings: {
                arrows: false,
                centerPadding: '0px',
                slidesToShow: 1
            }
        }
    ]
    });

    /* Carousel buttons */
    $('.sg_carousel-prev').on('click', function() {
        $('.sg_carousel').slick('slickPrev');
    });
    $('.sg_carousel-next').on('click', function() {
        $('.sg_carousel').slick('slickNext');
    });

});