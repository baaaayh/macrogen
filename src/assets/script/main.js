$(function () {
    let lastMouseX = window.innerWidth / 2;
    let lastMouseY = window.innerHeight / 2;

    AOS.init();

    const main = {
        mainKvInit() {
            let mainKV = new Swiper('.main-kv', {
                slidesPerView: 'auto',
                parallax: true,
                // autoplay: {
                //     delay: 7000,
                //     disableOnInteraction: false,
                // },
                // allowTouchMove: false,
                speed: 1000,
                loop: true,
                spaceBetween: 0,
            });
            mainKV.on('slideBeforeChange', function () {
                $('.label-container').removeClass('ani');
            });
        },
        init() {
            this.mainKvInit();
        },
    };

    const mouse = {
        scrollHeight() {
            const docH = $(document).innerHeight();
            const winH = $(window).innerHeight();
            $('.scroll__bar').css('height', (winH / docH) * 100 + '%');
        },
        scrollPos(e) {
            const scrollHeight = document.documentElement.scrollHeight;
            const barPos = $(window).scrollTop();
            $('.scroll__bar').css('top', (barPos / scrollHeight) * 100 + '%');
        },
        smoothScroll() {
            class Scrooth {
                constructor({ element = window, strength = 10, acceleration = 1.2, deceleration = 0.975 } = {}) {
                    this.element = element;
                    this.distance = strength;
                    this.acceleration = acceleration;
                    this.deceleration = deceleration;
                    this.running = false;

                    this.element.addEventListener('wheel', this.scrollHandler.bind(this), { passive: false });
                    this.element.addEventListener('mousewheel', this.scrollHandler.bind(this), { passive: false });
                    this.scroll = this.scroll.bind(this);
                }

                scrollHandler(e) {
                    e.preventDefault();

                    if (!this.running) {
                        this.top = this.element.pageYOffset || this.element.scrollTop || 0;
                        this.running = true;
                        this.currentDistance = e.deltaY > 0 ? 0.1 : -0.1;
                        this.isDistanceAsc = true;
                        this.scroll();
                    } else {
                        this.isDistanceAsc = false;
                        this.currentDistance = e.deltaY > 0 ? this.distance : -this.distance;
                    }
                }

                scroll() {
                    if (this.running) {
                        this.currentDistance *= this.isDistanceAsc === true ? this.acceleration : this.deceleration;
                        Math.abs(this.currentDistance) < 0.1 && this.isDistanceAsc === false ? (this.running = false) : 1;
                        Math.abs(this.currentDistance) >= Math.abs(this.distance) ? (this.isDistanceAsc = false) : 1;

                        this.top += this.currentDistance;
                        this.element.scrollTo(0, this.top);

                        requestAnimationFrame(this.scroll);
                    }
                }
            }

            const scroll = new Scrooth({
                element: window,
                strength: 30,
                acceleration: 1.25,
                deceleration: 0.875,
            });
        },

        pointerPos(e) {
            const boxes = document.querySelectorAll('.label');
            const currentX = e.clientX;
            const currentY = e.clientY;

            // Calculate the distance moved from the last position
            const deltaX = currentX - lastMouseX;
            const deltaY = currentY - lastMouseY;

            // Calculate the new position for the box
            const boxX = deltaX / 70;
            const boxY = deltaY / 70;

            boxes.forEach((item) => {
                if ($('.label-container').hasClass('ani')) {
                    item.style.transform = `translate3d(${boxX}px, ${boxY}px, 0px)`;
                    item.style.transition = 'transform 0.1s ease'; // Optional: to add smooth transition
                }
            });
        },
        addTransitionEndListener() {
            const boxes = document.querySelectorAll('.label');

            boxes.forEach((item) => {
                item.addEventListener('animationend', (event) => {
                    $('.label-container').addClass('ani');
                });
            });
        },
        init() {
            this.scrollHeight();
            this.smoothScroll();
            this.scrollPos();
            this.addTransitionEndListener();
            $(window).on('wheel scroll', (e) => this.scrollPos(e));
            $(window).on('mousemove', (e) => this.pointerPos(e));
        },
    };

    main.init();
    mouse.init();
});
