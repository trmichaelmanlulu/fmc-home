$(function() { // On ready

    /* Multi Item Carousel */
    $('.shop-gear_carousel').slick({
    centerMode: true,
    slidesToShow: 3,
    centerPadding: '320px',
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
        {
        breakpoint: 1700,
        settings: {
                arrows: true,
                centerMode: true,
                centerPadding: '230px',
                slidesToShow: 3
            }
        },
        {
        breakpoint: 1350,
        settings: {
                arrows: true,
                centerMode: true,
                centerPadding: '180px',
                slidesToShow: 3
            }
        },
        {
        breakpoint: 1200,
        settings: {
                arrows: true,
                centerMode: true,
                centerPadding: '50px',
                slidesToShow: 3
            }
        },
        {
        breakpoint: 992,
            settings: {
                arrows: true,
                centerMode: true,
                centerPadding: '0px',
                slidesToShow: 2
            }
        },
        {
        breakpoint: 768,
            settings: {
                arrows: true,
                centerMode: true,
                centerPadding: '0px',
                slidesToShow: 1
            }
        }
    ]
    });

});