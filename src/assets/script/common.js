$(function () {
    AOS.init();

    const mouse = {
        scrollHeight() {
            const docH = $(document).outerHeight();
            const winH = $(window).outerHeight();
            $('.scroll__bar').css('height', ((winH / docH) * 100) / 2 + '%');
        },
        scrollPos(e) {
            const scrollHeight = document.documentElement.scrollHeight;
            const barPos = $(window).scrollTop();
            $('.scroll__bar').css('top', (barPos / scrollHeight) * 100 + '%');
        },
        smoothScroll() {
            const lenis = new Lenis();
            lenis.on('scroll', function () {});
            function raf(time) {
                lenis.raf(time * 0.9);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
        },
        toggleAllMenu() {
            $('.btn-allmenu').on('click', function () {
                $(this).toggleClass('active');
            });
        },
        init() {
            this.toggleAllMenu();
            this.scrollHeight();
            this.smoothScroll();
            this.scrollPos();
            $(window).on('wheel scroll', (e) => this.scrollPos(e));
        },
    };

    mouse.init();
});
