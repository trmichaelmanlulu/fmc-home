var Home = function() {
    return {
        /* Initialize function */
        init: function() {
            Home.viewCartCarousel();
            Home.shopGearCarousel();
            Home.mainMenu();
            Home.materialInput();
            Home.collapsableSection();
        },

        /* Shop Gear carousel */
        shopGearCarousel: function() {
            // Slick carousel
            $('.sg_carousel').slick({
            slidesToShow: 3,
            centerPadding: '320px',
            autoplay: true,
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

            // Carousel buttons
            $('.sg_carousel-prev').on('click', function(e) {
                $('.sg_carousel').slick('slickPrev');
                e.preventDefault();
            });
            $('.sg_carousel-next').on('click', function(e) {
                $('.sg_carousel').slick('slickNext');
                e.preventDefault();
            });
        },

        /* View Cart carousel */
        viewCartCarousel: function() {
            // Slick carousel
            $('.vc_carousel').slick({
            slidesToShow: 1,
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
                        slidesToShow: 1
                    }
                },
                {
                breakpoint: 1350,
                settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '180px',
                        slidesToShow: 1
                    }
                },
                {
                breakpoint: 992,
                    settings: {
                        arrows: false,
                        centerPadding: '0px',
                        slidesToShow: 1
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

            // Carousel buttons
            $('.vc_carousel-prev').on('click', function(e) {
                $('.vc_carousel').slick('slickPrev');
                e.preventDefault();
            });
            $('.vc_carousel-next').on('click', function(e) {
                $('.vc_carousel').slick('slickNext');
                e.preventDefault();
            });
        },

        /* Mobile and Tablet Menu behavior */
        mainMenu: function() {
            // Slide In
            $('#fmc-home-header a').on('click', function(e) {
                $('#fmc-home-header a').removeClass('active');
                $(this).addClass('active');
                $('.header-tabs-content').hide();
                var currentTab = $(this).attr('data-tabs');
                $(currentTab).show();
                e.preventDefault();
            });

            $('.sidebar-actions a:not(.sidebar-cart)').on('click', function(e) {
                $('.sidebar-actions').removeClass('active');
                $(this).parents('.sidebar-actions').addClass('active');
                var currentTab = $(this).attr('data-tabs');
                $(currentTab).addClass('slideIn');
                e.preventDefault();
            });

            $('.sidebar-items a').on('click', function(e) {
                var currentTab = $(this).attr('data-tabs');
                $(currentTab).addClass('slideIn');
                e.preventDefault();
            });

            $('.ms-burger').on('click', function(e) {
                $('.header-sidebar').addClass('slideIn');
                e.preventDefault();
            });

            $('.sidebar-forgot-password, .sidebar-create-account-btn').on('click', function(e) {
                var currentTab = $(this).attr('data-tabs');
                $(currentTab).addClass('slideIn');
                e.preventDefault();
            });

            // Slide Out
            $('.sidebar-contents-back').on('click', function(e) {
                $('.sidebar-actions').removeClass('active');
                $('.sidebar-actions:last-child').addClass('active');
                var currentTab = $(this).attr('data-tabs');
                $(currentTab).removeClass('slideIn');
                e.preventDefault();
            });

            $('.sidebar-close').on('click', function(e) {
                $('.header-sidebar').removeClass('slideIn');
                $('.sidebar-contents').removeClass('slideIn');
                e.preventDefault();
            });

            /* Mobile header icons action */
            $('.ms-search').on('click', function(e) {
                $('.sidebar-actions').removeClass('active');
                $('.sidebar-actions:first-child').addClass('active');
                var currentTab = $(this).attr('data-tabs');
                $(currentTab).addClass('slideIn');
                $('.ms-burger').trigger('click');
                e.preventDefault();
            });
        },

        /* Material Input behavior */
        materialInput: function() {
            $('.m-input, .header-search').on('focus', function(e) {
                // If input is empty
                if($(this).val().length === 0) {
                    $(this).siblings('.m-label').addClass('focus');
                    e.preventDefault();
                }
            });
            $('.m-input, .header-search').on('blur', function(e) {
                // If input is empty
                if($(this).val().length === 0) {
                    $(this).siblings('.m-label').removeClass('focus');
                    e.preventDefault();
                }
            });
        },

        /* Read More - Collapsable section */
        collapsableSection: function() {
            $('.community_more').on('click', function(e) {
                if($(this).text() === 'Read more') {
                    $(this).text('Read less')
                } else {
                    $(this).text('Read more');
                }
                $('.community_details-more').slideToggle(300);
                e.preventDefault();
            });
        }
    }
}();

// Call init on ready
$(function() {
    $(Home.init());
});