$(function () {
    AOS.init();

    const sub = {
        kvText() {},
        toggleBread(e) {
            $(e.target).parents('button').toggleClass('active').siblings('ul').slideToggle();
            $(e.target).parents('li').siblings('li').find('ul').slideUp();
        },
        closeBread(e) {
            if (!$(e.target).parents().hasClass('breadcrumb')) {
                $('.breadcrumb__toggle ul').slideUp();
                $('.breadcrumb__toggle button').removeClass('active');
            }
        },

        init() {
            this.kvText();
            $('.breadcrumb__toggle button').on('click', (e) => this.toggleBread(e));
            $(document).on('click', (e) => this.closeBread(e));
            $('.sub-box__list li').hover(function () {
                if ($(window).innerWidth() > 375) {
                    $(this).find('.sub-box__text p').stop().slideToggle(350);
                }
            });
        },
    };

    sub.init();
});
