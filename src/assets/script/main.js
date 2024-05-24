$(function () {
    let lastMouseX = window.innerWidth / 2;
    let lastMouseY = window.innerHeight / 2;

    AOS.init();

    const main = {
        scrollTriggerInit() {
            gsap.registerPlugin(ScrollTrigger);
            // const arr = gsap.utils.toArray('.main-section');

            const tl1 = gsap.timeline({
                scrollTrigger: {
                    trigger: '.main-section--kv',
                    start: 'center center',
                    end: '+=150%',
                    scrub: 1,
                    toggleClass: 'active',
                    pin: '.main-section--kv',
                },
            });

            tl1.to('.main-kv__mobile', {
                bottom: 0,
                transform: 'translateX(-50%) scale(0.8)',
            })
                .to(
                    '.main-kv__content .btn-wrap',
                    {
                        opacity: 1,
                        visibility: 'visible',
                    },
                    '<'
                )
                .to('.main-section--kv', {
                    duration: 0.5,
                });

            const tl2 = gsap.timeline({
                scrollTrigger: {
                    trigger: '.main-section--02 h2',
                    start: 'center center',
                    end: '+=400%',
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
                .to('.section02__row--01', {
                    opacity: 0,
                    filter: 'blur(5px)',
                    duration: 30,
                })
                .to(
                    '.section02__row--02',
                    {
                        opacity: 0,
                        filter: 'blur(5px)',
                        duration: 30,
                    },
                    '<'
                );

            const tl3 = gsap.timeline({
                scrollTrigger: {
                    trigger: '.main-section--03',
                    start: 'center center',
                    end: '+=550%',
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

            const tl5 = gsap.timeline({
                scrollTrigger: {
                    trigger: '.toggle-box',
                    start: 'top bottom',
                    end: '+=200%',
                    toggleClass: 'active',
                },
            });

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
                duration: 6,
            })
                .to(
                    '.parallax__row--02',
                    {
                        opacity: 1,
                        x: '0',
                        duration: 6,
                    },
                    '<'
                )
                .to(
                    '.parallax__row--03',
                    {
                        opacity: 1,
                        x: '0',
                        duration: 6,
                    },
                    '<'
                )
                .to('.parallax__row', {
                    duration: 4,
                })
                .to('.parallax__block--top', {
                    y: '-50vh',
                    duration: 8,
                })
                .to(
                    '.parallax__block--bottom',
                    {
                        y: '50vh',
                        duration: 8,
                    },
                    '<'
                )
                .to(
                    '.parallax__block--top .parallax__text--01',
                    {
                        top: 'calc(100% + 100px)',
                        duration: 5,
                    },
                    '<'
                )
                .to(
                    '.parallax__block--bottom .parallax__text--01',
                    {
                        bottom: 'calc(100% + 100px)',
                        duration: 5,
                    },
                    '<'
                )
                .to(
                    '.parallax__content',
                    {
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        opacity: 1,
                        duration: 10,
                    },
                    '<'
                )
                .to('.main-section--03', {
                    duration: 2,
                });
        },
        mainKvInit() {
            let mainKV = new Swiper('.main-kv', {
                slidesPerView: 'auto',
                parallax: true,
                autoplay: {
                    delay: 7000,
                    disableOnInteraction: false,
                },
                // allowTouchMove: false,
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
                    slideChange() {},
                },
            });
        },
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
            });
        },
        toggleBox() {
            $('.toggle-box__item').hover(function () {
                $(this).toggleClass('active');
            });
        },
        newsImage() {
            $('.news__item').hover(function () {
                $(this).toggleClass('active');
                $(this).find('.news__image').stop().fadeToggle();
            });
        },
        marquee() {
            const rows = document.querySelectorAll('.rolling__inner');
            const speed = 1; // 이동 속도 (픽셀)
            const interval = 20; // 이동 간격 (밀리초)

            function cloneItems(row) {
                const rowWidth = row.offsetWidth;
                let totalWidth = 0;
                const items = Array.from(row.children);
                items.forEach((item) => {
                    const clone = item.cloneNode(true);
                    row.appendChild(clone);
                    totalWidth += clone.offsetWidth + 20; // 아이템 너비 + 마진
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
                    if (Math.abs(currentTranslateX) >= firstItemWidth + 20) {
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
                        row.style.transform = `translateX(-${firstItemWidth + 20}px)`;
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
            this.scrollTriggerInit();
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

            document.addEventListener('mousemove', (e) => {
                cursorCircle.style.top = `${e.clientY}px`;
                cursorCircle.style.left = `${e.clientX}px`;
            });

            customCursorLinks.forEach((link) => {
                link.addEventListener('mouseenter', () => {
                    cursorCircle.classList.add('active');
                });
                link.addEventListener('mouseleave', () => {
                    cursorCircle.classList.remove('active');
                });
            });
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
                    img: 'thumb_map01',
                },
                {
                    name: '마크로젠 지놈센터',
                    location: '서울, 대한민국',
                    img: 'thumb_map02',
                },
                {
                    name: '마크로젠 모델동물센터',
                    location: '서울, 대한민국',
                    img: 'thumb_map03',
                },
                {
                    name: '마크로젠 대전지사',
                    location: '서울, 대한민국',
                    img: 'thumb_map04',
                },
                {
                    name: '마크로젠 송도 글로벌 지놈센터',
                    location: '서울, 대한민국',
                    img: 'thumb_map05',
                },
                {
                    name: '마크로젠 세종캠퍼스',
                    location: '서울, 대한민국',
                    img: 'thumb_map06',
                },
            ],
        },
        {
            name: 'area-be',
            office: [
                {
                    name: '마크로젠 강남본사',
                    location: '서울, 대한민국',
                    img: 'thumb_map01',
                },
                {
                    name: '마크로젠 지놈센터',
                    location: '서울, 대한민국',
                    img: 'thumb_map02',
                },
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
        },
        {
            name: 'area-mc',
            office: [
                {
                    name: '마크로젠 송도 글로벌 지놈센터',
                    location: '서울, 대한민국',
                    img: 'thumb_map05',
                },
                {
                    name: '마크로젠 세종캠퍼스',
                    location: '서울, 대한민국',
                    img: 'thumb_map06',
                },
            ],
        },
        {
            name: 'area-fr',
            office: [
                {
                    name: '마크로젠 세종캠퍼스',
                    location: '서울, 대한민국',
                    img: 'thumb_map06',
                },
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

                {
                    name: '마크로젠 송도 글로벌 지놈센터',
                    location: '서울, 대한민국',
                    img: 'thumb_map05',
                },
                {
                    name: '마크로젠 세종캠퍼스',
                    location: '서울, 대한민국',
                    img: 'thumb_map06',
                },
            ],
        },
        {
            name: 'area-es',
            office: [
                {
                    name: '마크로젠 강남본사',
                    location: '서울, 대한민국',
                    img: 'thumb_map01',
                },
                {
                    name: '마크로젠 지놈센터',
                    location: '서울, 대한민국',
                    img: 'thumb_map02',
                },
            ],
        },
        {
            name: 'area-it',
            office: [
                {
                    name: '마크로젠 송도 글로벌 지놈센터',
                    location: '서울, 대한민국',
                    img: 'thumb_map05',
                },
                {
                    name: '마크로젠 세종캠퍼스',
                    location: '서울, 대한민국',
                    img: 'thumb_map06',
                },
            ],
        },
        {
            name: 'area-yt',
            office: [
                {
                    name: '마크로젠 강남본사',
                    location: '서울, 대한민국',
                    img: 'thumb_map01',
                },
                {
                    name: '마크로젠 지놈센터',
                    location: '서울, 대한민국',
                    img: 'thumb_map02',
                },
                {
                    name: '마크로젠 모델동물센터',
                    location: '서울, 대한민국',
                    img: 'thumb_map03',
                },
            ],
        },
        {
            name: 'area-sg',
            office: [
                {
                    name: '마크로젠 대전지사',
                    location: '서울, 대한민국',
                    img: 'thumb_map04',
                },
                {
                    name: '마크로젠 송도 글로벌 지놈센터',
                    location: '서울, 대한민국',
                    img: 'thumb_map05',
                },
                {
                    name: '마크로젠 세종캠퍼스',
                    location: '서울, 대한민국',
                    img: 'thumb_map06',
                },
            ],
        },
        {
            name: 'area-kr',
            office: [
                {
                    name: '마크로젠 송도 글로벌 지놈센터',
                    location: '서울, 대한민국',
                    img: 'thumb_map05',
                },
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
                {
                    name: '마크로젠 지놈센터',
                    location: '서울, 대한민국',
                    img: 'thumb_map02',
                },
                {
                    name: '마크로젠 모델동물센터',
                    location: '서울, 대한민국',
                    img: 'thumb_map03',
                },
                {
                    name: '마크로젠 대전지사',
                    location: '서울, 대한민국',
                    img: 'thumb_map04',
                },
            ],
        },
        {
            name: 'area-us',
            office: [
                {
                    name: '마크로젠 강남본사',
                    location: '서울, 대한민국',
                    img: 'thumb_map01',
                },
            ],
        },
        {
            name: 'area-mx',
            office: [
                {
                    name: '마크로젠 송도 글로벌 지놈센터',
                    location: '서울, 대한민국',
                    img: 'thumb_map05',
                },
                {
                    name: '마크로젠 세종캠퍼스',
                    location: '서울, 대한민국',
                    img: 'thumb_map06',
                },
            ],
        },
    ];
    const map = {
        getOfficeList(e) {
            const info = $(e.target).attr('class');
            let office;
            nations.map((item, index) => {
                if (item.name === info) {
                    office = item.office;
                }
            });

            $('.map-thumb ul').empty();
            office.map((item, index) => {
                $('.map-thumb ul').append(`<li>
                                            <div class="map-thumb__inner">
                                                <div class="map-thumb__image">
                                                    <img src="../resources/assets/images/main/${item.img}.svg" alt="" />
                                                </div>
                                                <div class="map-thumb__text">
                                                    <b>${item.name}</b>
                                                    <span>${item.location}</span>
                                                </div>
                                            </div>
                                        </li>`);
            });
        },
        init() {
            $('.image-map area').on('click', (e) => this.getOfficeList(e));
        },
    };

    main.init();
    mouse.init();
    map.init();
});
