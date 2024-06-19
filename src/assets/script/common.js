$(function () {
    AOS.init();
    window.lenis = null;
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
            lenis = new Lenis();
            function raf(time) {
                lenis.raf(time * 0.5);
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
            const mdfSection = document.querySelector('.sub-section--mdf');
            const toggleSection = document.querySelector('.toggle-box');
            const header = document.querySelector('.header');
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';

            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                const color = section.getAttribute('data-header-color');
                // const toggleColor = toggleSection.getAttribute('data-header-color');

                if (scrollDirection === 'down') {
                    // 스크롤 다운: 화면 중앙 기준점 넘어감
                    if (rect.top <= window.innerHeight / 8 && rect.bottom >= window.innerHeight / 8) {
                        if (color) {
                            header.classList.add(color);

                            // document.querySelector('.btn-lang__inner').classList.add(color);
                            // if (toggleColor === 'white') {
                            //     document.querySelector('.toggle-box').classList.add('white');
                            // }
                        } else {
                            header.className = 'header';
                            if (section.classList.contains('sub-section--mdf')) {
                                header.classList.add('mdf');
                                return;
                            }
                        }
                    }
                } else {
                    // 스크롤 업: 화면 중앙 기준점 넘어감
                    if (rect.top <= window.innerHeight / 10 && rect.bottom >= window.innerHeight / 10) {
                        if (color) {
                            header.classList.add(color);
                        } else {
                            header.className = 'header'; // 모든 색상 클래스를 제거
                        }
                    }
                }
            });

            if ($(window).scrollTop() < $(sections[0]).offset().top + $(sections[0]).innerHeight() / 2) {
                if ($('.swiper-slide-active').hasClass('main-kv__slide--02')) {
                    $('.scroll-down').removeClass('black');
                    $('.header').removeClass('black');
                } else {
                    // $('.header').removeClass('black');
                    // $('.header').addClass('black');
                    // $('.scroll-down').addClass('black');
                }
            }

            lastScrollTop = scrollTop;
        },

        init() {
            $(window).on('scroll touchmove', this.handleScroll);
            $(window).on('load', this.handleScroll);
        },
    };

    const header = {
        hideHeader() {
            if ($('.hide-area').length > 0) {
                let st = $(window).scrollTop();
                let firstSection = $('.hide-area').offset().top - 100;
                if (st >= firstSection) {
                    $('.header').addClass('hide');
                } else {
                    $('.header').removeClass('hide');
                }
            }
        },
        init() {
            $(window).on('wheel scroll', this.hideHeader);
        },
    };

    mouse.init();
    scroll.init();
    header.init();
});
