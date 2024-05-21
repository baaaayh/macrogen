/*
 * marquee plugin 1.0v
 * This offers an alternative to the <marquee> tag, which doesn't align with HTML5 standards.
 * https://github.com/wdevbc/marquee
 *
 * copyright 2024 wdevbc
 *
 * Released under the MIT License
 *
 * Released on: May 14, 2024
 *
 */
((e, t) => {
    class n {
        constructor(e, t = {}) {
            (this.selector = e),
                (this.options = Object.assign({}, n.defaultOptions, t)),
                (this.parentElement = document.querySelector(e)),
                (this.contentClone = this.parentElement.innerHTML),
                (this.firstChild = this.parentElement.children[0]),
                (this.currentPosition = 0),
                (this.isPlaying = !1),
                this.init();
        }
        init() {
            this.parentElement.insertAdjacentHTML('beforeend', this.contentClone),
                this.parentElement.insertAdjacentHTML('beforeend', this.contentClone),
                this.options.direction === 'right' ? (this.currentPosition = -this.firstChild.clientWidth) : (this.currentPosition = 0),
                this.options.autoplay ? (this.startAutoplay(), this.handleMouseEvents()) : (this.startAnimation(), this.handleMouseEvents());
        }
        startAutoplay() {
            (this.isPlaying = !0),
                setInterval(() => {
                    if (this.isPlaying) {
                        if (this.options.direction === 'right') {
                            (this.firstChild.style.marginLeft = `${this.currentPosition}px`), this.currentPosition >= 0 && (this.currentPosition = -this.firstChild.clientWidth), (this.currentPosition += this.options.speed);
                        } else {
                            (this.firstChild.style.marginLeft = `-${this.currentPosition}px`), this.currentPosition > this.firstChild.clientWidth && (this.currentPosition = 0), (this.currentPosition += this.options.speed);
                        }
                    }
                }, 0);
        }
        handleMouseEvents() {
            this.options.pauseOnMouseEnter &&
                (this.parentElement.addEventListener('mouseenter', () => {
                    this.isPlaying = !1;
                }),
                this.parentElement.addEventListener('mouseleave', () => {
                    this.isPlaying = !0;
                }));
        }
    }
    (n.defaultOptions = { speed: 0.9, autoplay: !0, pauseOnMouseEnter: !1, direction: 'left' }), (e.SimpleMarquee = n);
})(window, document);
