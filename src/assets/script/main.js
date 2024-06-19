$(function () {
    let lastMouseX = window.innerWidth / 2;
    let lastMouseY = window.innerHeight / 2;

    AOS.init();

    const main = {
        mainKvInit() {
            return new Swiper('.main-kv', {
                slidesPerView: 'auto',
                parallax: true,
                speed: 1000,
                loop: true,
                spaceBetween: 0,
                on: {
                    slideChangeTransitionEnd() {
                        $('.swiper-slide').find('.label-container').removeClass('ani');
                        if ($('.swiper-slide-active').hasClass('main-kv__slide--02')) {
                            $('.header').removeClass('black');
                            $('.scroll-down').removeClass('black');
                        } else {
                            $('.header').addClass('black');
                            $('.scroll-down').addClass('black');
                        }
                    },
                },
            });
        },
        scrollTriggerInit(mainKV) {
            gsap.registerPlugin(ScrollTrigger);
            // const arr = gsap.utils.toArray('.main-section');

            const tl1 = gsap.timeline({
                scrollTrigger: {
                    trigger: '.main-section--kv',
                    start: 'center center',
                    // end: '+=250%',
                    end: () => (window.innerWidth <= 375 ? '+=400%' : '+=250%'),
                    scrub: 1,
                    // toggleClass: 'active',
                    pin: '.main-section--kv',
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const totalSlides = mainKV.slides.length;
                        console.log(progress);
                        const slideIndex = Math.round(progress * 3 * (totalSlides - 1));
                        mainKV.slideTo(slideIndex, 1000);
                    },
                },
            });

            tl1.to('.main-section--kv', {
                duration: 0.5,
            });

            const tl2 = gsap.timeline({
                scrollTrigger: {
                    trigger: '.main-section--02 h2',
                    start: 'center center',
                    end: '+=600%',
                    scrub: 1,
                    pin: '.main-section--02 h2',
                },
            });

            tl2.to('.section02__row--01 span', {
                width: '0%',
                duration: 80,
            })

                .to(
                    '.section02__row--02 span',
                    {
                        width: '0%',
                        delay: 60,
                        duration: 100,
                    },
                    '<'
                )
                .to('.text-gradient--01', {
                    color: '#fff',
                })
                .to('.text-gradient--01 > div', {
                    width: '100%',
                    borderRadius: '10px',
                    duration: 40,
                })
                .to('.text-gradient--02', {
                    color: '#fff',
                })
                .to('.text-gradient--02 > div', {
                    width: '100%',
                    borderRadius: '10px',
                    duration: 40,
                })
                .to('.text-gradient--03', {
                    color: '#fff',
                })
                .to('.text-gradient--03 > div', {
                    width: '100%',
                    borderRadius: '10px',
                    duration: 40,
                })
                .to('.text-gradient--03 > div', {
                    duration: 80,
                })
                .to('.section02__row--01', {
                    opacity: 0,
                    filter: 'blur(5px)',
                    duration: 60,
                })
                .to(
                    '.section02__row--02',
                    {
                        opacity: 0,
                        filter: 'blur(5px)',
                        duration: 60,
                    },
                    '<'
                );

            const tl3 = gsap.timeline({
                scrollTrigger: {
                    trigger: '.main-section--03',
                    start: 'center center',
                    end: '+=750%',
                    scrub: 1,
                    pin: true,

                    onEnter: () => {
                        document.querySelector('.main-section--03').parentNode.classList.add('custom-pin-spacer');
                    },
                },
            });

            const tl4 = gsap.timeline({
                scrollTrigger: {
                    trigger: '.parallax__bg',
                    start: 'center center',
                    endTrigger: '.main-section--04',
                    end: 'bottom bottom',
                    scrub: 1,
                    pin: true,
                },
            });

            // const isSmallScreen = window.innerWidth <= 375;

            // const tl5 = gsap.timeline({
            //     scrollTrigger: {
            //         trigger: '.toggle-box',
            //         start: () => (window.innerWidth <= 375 ? 'top-=20% top' : 'top+=2% bottom'),
            //         end: () => (window.innerWidth <= 375 ? '+=240%' : '+=240%'),
            //         onEnter: () => {
            //             if (!isSmallScreen) {
            //                 gsap.to('.toggle-box', { y: -1000, opacity: 1, duration: 0.8 });
            //             }
            //         },
            //         onLeave: () => {
            //             if (!isSmallScreen) {
            //                 gsap.to('.toggle-box', { y: 0, opacity: 0, duration: 0.8 });
            //             }
            //         },
            //         onEnterBack: () => {
            //             if (!isSmallScreen) {
            //                 gsap.to('.toggle-box', { y: -1000, opacity: 1, duration: 0.8 });
            //             }
            //         },
            //         onLeaveBack: () => {
            //             if (!isSmallScreen) {
            //                 gsap.to('.toggle-box', { y: 0, opacity: 0, duration: 0.8 });
            //             }
            //         },
            //         pin: !isSmallScreen, // 작은 화면일 때만 pin 옵션을 활성화합니다.
            //         // pinSpacing: false,
            //     },
            // });

            if (window.innerWidth >= 375) {
                let tl5 = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.toggle-fixed',
                        pin: true,
                        scrub: 1,
                        start: 'top top',
                        end: '+=30%',
                        ease: 'power3.inOut',
                    },
                });
            }

            const newsList = gsap.utils.toArray('.news__container ul li');

            newsList.forEach((item, index) => {
                gsap.to(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: 'top bottom-=300px',
                        onEnter: () => item.classList.add('active'),
                    },
                });
            });

            tl3.to('.parallax__row--01', {
                opacity: 1,
                x: '0',
                duration: 25,
            })
                .to(
                    '.parallax__row--02',
                    {
                        opacity: 1,
                        x: '0',
                        duration: 25,
                    },
                    '<'
                )
                .to(
                    '.parallax__row--03',
                    {
                        opacity: 1,
                        x: '0',
                        duration: 25,
                    },
                    '<'
                )
                .to('.parallax__row', {
                    duration: 4,
                })
                .to('.text-gradient--04', {
                    color: '#fff',
                })
                .to(
                    '.text-gradient--04 > div',
                    {
                        width: '100%',
                        borderRadius: '10px',
                        duration: 20,
                    },
                    '<'
                )
                .to('.text-gradient--05', {
                    color: '#fff',
                })
                .to(
                    '.text-gradient--05 > div',
                    {
                        width: '100%',
                        borderRadius: '10px',
                        duration: 20,
                    },
                    '<'
                )
                .to('.text-gradient--05', {
                    duration: 30,
                })
                .to('.parallax__text--01', {
                    opacity: 0,
                    filter: 'blur(5px)',
                    duration: 30,
                })
                .to('.parallax__block--top', {
                    y: '-50vh',
                    duration: 30,
                })
                .to(
                    '.parallax__block--bottom',
                    {
                        y: '50vh',
                        duration: 30,
                    },
                    '<'
                )
                .to('.parallax__block', {
                    backgroundColor: 'transparent',
                    duration: 1,
                    onComplete: () => {
                        // Ensure the background is fully transparent after animation
                        gsap.set('.parallax__block', { backgroundColor: 'transparent' });
                    },
                })
                .to(
                    '.parallax__content',
                    {
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        opacity: 1,
                        duration: 50,
                    },
                    '<'
                )
                .to('.main-section--03', {
                    duration: 20,
                });
        },
        // mainKvInit() {
        //     let mainKV = new Swiper('.main-kv', {
        //         slidesPerView: 'auto',
        //         parallax: true,
        //         autoplay: {
        //             delay: 7000,
        //             disableOnInteraction: false,
        //         },
        //         // allowTouchMove: false,
        //         speed: 1000,
        //         loop: true,
        //         spaceBetween: 0,
        //         on: {
        //             slideChangeTransitionEnd() {
        //                 $('.swiper-slide').find('.label-container').removeClass('ani');
        //                 if ($('.swiper-slide-active').hasClass('main-kv__slide--02')) {
        //                     $('.header').removeClass('black');
        //                     $('.scroll-down').removeClass('black');
        //                 } else {
        //                     // $('.header').addClass('black');
        //                     $('.scroll-down').addClass('black');
        //                 }
        //             },
        //             slideChange() {},
        //         },
        //     });
        // },
        sliderInit() {
            let numberSlider = new Swiper('.number-mac__slider', {
                slidesPerView: 1,
                parallax: true,
                allowTouchMove: false,
                speed: 1000,
                loop: true,
                spaceBetween: 0,
            });

            $('.number-mac__item button').on('click', function () {
                $(this).parents('.number-mac__item').addClass('active').siblings('.number-mac__item').removeClass('active');
                let idx = $(this).parents('li').index();
                numberSlider.slideTo(idx);
                // if ($(window).innerWidth() > 375) {
                // }
            });

            // if ($(window).innerWidth() <= 375) {
            //     gsap.registerPlugin(ScrollTrigger);
            //     let tl1 = gsap.timeline({
            //         scrollTrigger: {
            //             trigger: '.main-section--08',
            //             start: 'center-=2.7% center',
            //             end: '+=400%',
            //             scrub: true,
            //             pin: true,
            //             onUpdate: (self) => {
            //                 let progress = self.progress.toFixed(2); // 현재 진행 상황 (0.00 - 1.00)
            //                 let slideIndex = Math.floor(progress * 4); // 0, 1, 2, 3 (총 4구간)
            //                 $('.number-mac__item').eq(slideIndex).addClass('active').siblings('.number-mac__item').removeClass('active');
            //                 numberSlider.slideTo(slideIndex); // 해당 슬라이드로 이동
            //             },
            //         },
            //     });
            // }
        },
        toggleBox() {
            if ($(window).width() <= 375) {
                $('.toggle-box__item').addClass('active');
            } else {
                $('.toggle-box__item').hover(function () {
                    $(this).toggleClass('active');
                });
            }
        },
        newsImage() {
            if ($(window).width() > 375) {
                $('.news__item').hover(function () {
                    $(this).toggleClass('active');
                    $(this).find('.news__image').stop().fadeToggle();
                });
            }
        },
        marquee() {
            const rows = document.querySelectorAll('.rolling__inner');
            const speed = 1; // 이동 속도 (픽셀)
            const interval = 20; // 이동 간격 (밀리초)
            const isSmallScreen = window.innerWidth <= 375;

            function cloneItems(row) {
                const rowWidth = row.offsetWidth;
                let totalWidth = 0;
                const items = Array.from(row.children);
                items.forEach((item) => {
                    const clone = item.cloneNode(true);
                    row.appendChild(clone);
                    totalWidth += clone.offsetWidth + (isSmallScreen ? 10 : 20);
                });
                if (totalWidth < rowWidth * 2) {
                    cloneItems(row);
                }
            }

            function moveItems(row) {
                const direction = row.getAttribute('data-direction');
                const firstItemWidth = row.firstElementChild.offsetWidth;
                const currentTransform = getComputedStyle(row).transform;
                const matrixValues = currentTransform.match(/matrix.*\((.+)\)/);
                let currentTranslateX = 0;

                if (matrixValues) {
                    currentTranslateX = parseFloat(matrixValues[1].split(', ')[4]);
                }

                if (direction === 'left') {
                    if (Math.abs(currentTranslateX) >= firstItemWidth + (isSmallScreen ? 10 : 20)) {
                        // 아이템 너비 + 마진
                        row.style.transition = 'none'; // 트랜지션 일시 중지
                        row.style.transform = 'translateX(0)';
                        row.appendChild(row.firstElementChild); // 첫 번째 아이템을 맨 끝으로 이동
                        setTimeout(() => {
                            row.style.transition = ''; // 트랜지션 재개
                        }, interval);
                    } else {
                        row.style.transform = `translateX(${currentTranslateX - speed}px)`;
                    }
                } else if (direction === 'right') {
                    if (currentTranslateX >= 0) {
                        row.style.transition = 'none'; // 트랜지션 일시 중지
                        row.style.transform = `translateX(-${firstItemWidth + (isSmallScreen ? 10 : 20)}px)`;
                        row.insertBefore(row.lastElementChild, row.firstElementChild); // 마지막 아이템을 맨 앞으로 이동
                        setTimeout(() => {
                            row.style.transition = ''; // 트랜지션 재개
                        }, interval);
                    } else {
                        row.style.transform = `translateX(${currentTranslateX + speed}px)`;
                    }
                }
            }

            function initRow(row) {
                cloneItems(row);
                setInterval(() => moveItems(row), interval);
            }

            function handleResize() {}

            window.addEventListener('resize', handleResize);

            // 페이지 로드 시 초기화
            window.addEventListener('load', () => {
                rows.forEach(initRow);
            });
        },
        init() {
            const mainKV = this.mainKvInit();
            this.scrollTriggerInit(mainKV);
            this.newsImage();
            this.toggleBox();
            this.marquee();
            this.mainKvInit();
            this.sliderInit();
        },
    };

    const mouse = {
        pointerPos(e) {
            const currentX = e.clientX;
            const currentY = e.clientY;

            // Calculate the distance moved from the last position
            const deltaX = currentX - lastMouseX;
            const deltaY = currentY - lastMouseY;

            // Calculate the new position for the box
            const boxX = -(deltaX / 70);
            const boxY = -(deltaY / 70);

            if ($('.label-container').hasClass('ani')) {
                $('.label-container.ani').css({ transform: `translate3d(${boxX}px, ${boxY}px, 0px)` });
            }
        },
        addTransitionEndListener() {
            $('.swiper-slide-active .main-kv__text').on('transitionend', () => {
                $('.swiper-slide-active .label-container').addClass('ani');
            });
        },
        customCursor() {
            const cursorCircle = document.getElementById('cursorCircle');
            const customCursorLinks = document.querySelectorAll('a');

            const screenWidth = window.innerWidth;

            // 화면 너비가 375px 초과인 경우에만 customCursor 함수 실행
            if (screenWidth > 375) {
                document.addEventListener('mousemove', (e) => {
                    cursorCircle.style.top = `${e.clientY}px`;
                    cursorCircle.style.left = `${e.clientX}px`;
                });

                customCursorLinks.forEach((link) => {
                    link.addEventListener('mouseenter', () => {
                        if (!link.classList.contains('not-cursor')) {
                            cursorCircle.classList.add('active');
                        }
                    });
                    link.addEventListener('mouseleave', () => {
                        cursorCircle.classList.remove('active');
                    });
                });
            }
        },
        init() {
            this.addTransitionEndListener();
            $(window).on('mousemove', (e) => this.pointerPos(e));
            this.customCursor();
        },
    };

    let nations = [
        {
            name: 'area-uk',
            office: [
                {
                    name: '마크로젠 강남본사',
                    location: '서울, 대한민국',
                    img: 'thumb_map02',
                },
            ],
            officeSub: [
                { name: '마크로젠 강남본사', location: '서울, 대한민국' },
                { name: '마크로젠 지놈센터', location: '서울, 대한민국' },
                { name: '마크로젠 강남본사', location: '서울, 대한민국' },
            ],
        },
        {
            name: 'area-be',
            office: [{ name: '마크로젠 대전지사', location: '대전, 대한민국', img: 'thumb_map01' }],
            officeSub: [
                { name: '마크로젠 강남본사', location: '서울, 대한민국' },
                { name: '마크로젠 지놈센터', location: '서울, 대한민국' },
                { name: '마크로젠 강남본사', location: '서울, 대한민국' },
            ],
        },
        {
            name: 'area-ch',
            office: [
                {
                    name: '마크로젠 강남본사',
                    location: '서울, 대한민국',
                    img: 'thumb_map01',
                },
            ],
            officeSub: [
                { name: '마크로젠 강남본사', location: '서울, 대한민국' },
                { name: '마크로젠 지놈센터', location: '서울, 대한민국' },
                { name: '마크로젠 강남본사', location: '서울, 대한민국' },
                { name: '마크로젠 대전지사', location: '대전, 대한민국' },
            ],
        },
        {
            name: 'area-mc',
            office: [
                {
                    name: '마크로젠 강남본사',
                    location: '서울, 대한민국',
                    img: 'thumb_map01',
                },
            ],
            officeSub: [
                { name: '마크로젠 강남본사', location: '서울, 대한민국' },
                { name: '마크로젠 지놈센터', location: '서울, 대한민국' },
                { name: '마크로젠 강남본사', location: '서울, 대한민국' },
            ],
        },
        {
            name: 'area-fr',
            office: [
                {
                    name: '마크로젠 강남본사',
                    location: '서울, 대한민국',
                    img: 'thumb_map01',
                },
            ],
            officeSub: [
                { name: '마크로젠 강남본사', location: '서울, 대한민국' },
                { name: '마크로젠 지놈센터', location: '서울, 대한민국' },
                { name: '마크로젠 강남본사', location: '서울, 대한민국' },
            ],
        },
        {
            name: 'area-de',
            office: [
                {
                    name: '마크로젠 강남본사',
                    location: '서울, 대한민국',
                    img: 'thumb_map01',
                },
            ],
            officeSub: [
                { name: '마크로젠 강남본사', location: '서울, 대한민국' },
                { name: '마크로젠 지놈센터', location: '서울, 대한민국' },
                { name: '마크로젠 지놈센터', location: '서울, 대한민국' },
                { name: '마크로젠 대전지사', location: '대전, 대한민국' },
            ],
        },
        {
            name: 'area-es',
            office: [{ name: '마크로젠 지놈센터', location: '서울, 대한민국', img: 'thumb_map03' }],
            officeSub: [
                { name: '마크로젠 강남본사', location: '서울, 대한민국' },
                { name: '마크로젠 지놈센터', location: '서울, 대한민국' },
                { name: '마크로젠 강남본사', location: '서울, 대한민국' },
            ],
        },
        {
            name: 'area-it',
            office: [
                {
                    name: '마크로젠 강남본사',
                    location: '서울, 대한민국',
                    img: 'thumb_map05',
                },
            ],
            officeSub: [
                { name: '마크로젠 강남본사', location: '서울, 대한민국' },
                { name: '마크로젠 강남본사', location: '서울, 대한민국' },
                { name: '마크로젠 지놈센터', location: '서울, 대한민국' },
                { name: '마크로젠 강남본사', location: '서울, 대한민국' },
            ],
        },
        {
            name: 'area-yt',
            office: [
                {
                    name: '마크로젠 지놈센터',
                    location: '서울, 대한민국',
                    img: 'thumb_map03',
                },
            ],
            officeSub: [
                { name: '마크로젠 강남본사', location: '서울, 대한민국' },
                { name: '마크로젠 지놈센터', location: '서울, 대한민국' },
                { name: '마크로젠 강남본사', location: '서울, 대한민국' },
            ],
        },
        {
            name: 'area-sg',
            office: [
                {
                    name: '마크로젠 강남본사',
                    location: '서울, 대한민국',
                    img: 'thumb_map01',
                },
            ],
            officeSub: [
                { name: '마크로젠 세종캠퍼스', location: '세종, 대한민국' },
                { name: '마크로젠 지놈센터', location: '서울, 대한민국' },
                { name: '마크로젠 강남본사', location: '서울, 대한민국' },
            ],
        },
        {
            name: 'area-kr',
            office: [
                {
                    name: '마크로젠 강남본사',
                    location: '서울, 대한민국',
                    img: 'thumb_map02',
                },
            ],
            officeSub: [
                { name: '마크로젠 지놈센터', location: '서울, 대한민국' },
                { name: '마크로젠 모델동물센터', location: '서울, 대한민국' },
                { name: '마크로젠 대전지사', location: '대전, 대한민국' },
                { name: '마크로젠 송도 글로벌 지놈센터', location: '송도, 대한민국' },
                { name: '마크로젠 세종캠퍼스', location: '세종, 대한민국' },
            ],
        },
        {
            name: 'area-jp',
            office: [
                {
                    name: '마크로젠 강남본사',
                    location: '서울, 대한민국',
                    img: 'thumb_map01',
                },
            ],
            officeSub: [
                { name: '마크로젠 강남본사', location: '서울, 대한민국' },
                { name: '마크로젠 지놈센터', location: '서울, 대한민국' },
                { name: '마크로젠 대전지사', location: '대전, 대한민국' },
            ],
        },
        {
            name: 'area-us',
            office: [
                {
                    name: '마크로젠 강남본사',
                    location: '서울, 대한민국',
                    img: 'thumb_map02',
                },
            ],
            officeSub: [
                { name: '마크로젠 강남본사', location: '서울, 대한민국' },
                { name: '마크로젠 대전지사', location: '대전, 대한민국' },
                { name: '마크로젠 강남본사', location: '서울, 대한민국' },
            ],
        },
        {
            name: 'area-mx',
            office: [
                {
                    name: '마크로젠 강남본사',
                    location: '서울, 대한민국',
                    img: 'thumb_map01',
                },
            ],
            officeSub: [
                { name: '마크로젠 강남본사', location: '서울, 대한민국' },
                { name: '마크로젠 지놈센터', location: '서울, 대한민국' },
                { name: '마크로젠 송도 글로벌 지놈센터', location: '송도, 대한민국' },
            ],
        },
    ];
    const map = {
        swipers: null,
        getOfficeList(e) {
            const info = $(e.target).attr('class');
            let office;
            let officeSub;
            nations.map((item, index) => {
                if (item.name === info) {
                    office = item.office;
                    officeSub = item.officeSub;
                }
                console.log(office);
                console.log(officeSub);
            });

            $('.map-thumb ul').empty();
            office.map((item, index) => {
                $('.map-thumb ul').append(`<li class="swiper-slide">
                                            <div class="map-thumb__inner">
                                                <div class="map-thumb__image">
                                                    <img src="../resources/assets/images/main/${item.img}.svg" alt="" />
                                                </div>
                                                <div class="map-thumb__text">
                                                    <b>${item.name}</b>
                                                    <span>${item.location}</span>
                                                </div>
                                            </div>

                                        </li>
                                        <ul class="sub-list"></ul>

                                        `);
            });
            officeSub.map((item, index) => {
                $('.map-thumb ul .sub-list').append(`<li>
                                                <div class="map-thumb__text">
                                                    <b>${item.name}</b>
                                                    <span class="blind">${item.location}</span>
                                                </div>
                                            </li>

                                        `);
            });
            this.updateSwiper();
        },
        initSwiper() {
            this.swipers = new Swiper('.map-thumb .swiper', {
                slidesPerView: 'auto',
                spaceBetween: 0,
                speed: 800,
                grabCursor: true,
            });
        },
        updateSwiper() {
            if (this.swipers !== null) {
                this.swipers.update();
                this.swipers.slideTo(0, 0);
            }
        },

        init() {
            this.initSwiper();
            $('.image-map area').on('click', (e) => this.getOfficeList(e));
        },
    };

    main.init();
    mouse.init();
    map.init();
});
