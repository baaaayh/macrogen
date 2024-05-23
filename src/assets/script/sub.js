$(function () {
    AOS.init();

    const sub = {
        kvText() {},
        toggleBread(e) {
            $(e.target).parents('button').siblings('ul').slideToggle();
            $(e.target).parents('li').siblings('li').find('ul').slideUp();
        },
        closeBread(e) {
            if (!$(e.target).parents().hasClass('breadcrumb')) {
                $('.breadcrumb__toggle ul').slideUp();
            }
        },
        init() {
            this.kvText();
            $('.breadcrumb__toggle button').on('click', (e) => this.toggleBread(e));
            $(document).on('click', (e) => this.closeBread(e));
        },
    };

    sub.init();
});
