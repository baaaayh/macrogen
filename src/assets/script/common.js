$(function () {
    AOS.init();

    const mouse = {
        scrollHeight() {
            const docH = document.documentElement.scrollHeight;
            const winH = $(window).innerHeight();

            $('.scroll__bar').css('height', (winH / docH) * 100 + '%');
        },
        scrollPos() {
            const docH = document.documentElement.scrollHeight;
            const winH = $(window).innerHeight();
            const barPos = $(window).scrollTop();
            const barH = $('.scroll__bar').height();
            const scrollableHeight = docH - winH;
            const scrollBarMaxPos = 100 - (barH / winH) * 100;
            const pos = (barPos / scrollableHeight) * scrollBarMaxPos;
            $('.scroll__bar').css('top', pos + '%');
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
            $(window).on('wheel scroll', this.scrollPos);
        },
    };

    let lastScrollTop = 0;
    const scroll = {
        handleScroll() {
            const sections = document.querySelectorAll('[class*="-section--"]');
            const header = document.querySelector('.header');
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';

            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                const color = section.getAttribute('data-header-color');

                if (scrollDirection === 'down') {
                    // 스크롤 다운: 화면 중앙 기준점 넘어감
                    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                        if (color) {
                            header.classList.add(color);
                        } else {
                            header.className = 'header'; // 모든 색상 클래스를 제거
                        }
                    }
                } else {
                    // 스크롤 업: 화면 중앙 기준점 넘어감
                    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                        if (color) {
                            header.classList.add(color);
                        } else {
                            header.className = 'header'; // 모든 색상 클래스를 제거
                        }
                    }
                }
            });

            lastScrollTop = scrollTop;
        },
        init() {
            $(window).on('scroll', this.handleScroll);
            $(window).on('load', this.handleScroll);
        },
    };

    mouse.init();
    scroll.init();
});
