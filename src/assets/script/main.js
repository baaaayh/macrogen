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
                on: {
                    slideChangeTransitionEnd() {
                        $('.swiper-slide').find('.label-container').removeClass('ani');
                    },
                },
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
                $(this).find('.news__image').fadeToggle();
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
            this.newsImage();
            this.toggleBox();
            this.marquee();
            this.mainKvInit();
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
        init() {
            this.addTransitionEndListener();
            $(window).on('mousemove', (e) => this.pointerPos(e));
        },
    };

    main.init();
    mouse.init();
});
