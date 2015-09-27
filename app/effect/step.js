$(function () {
    var PageTransitions = (function () {

        var $main = $('#pt-main'),
            $pages = $main.children('div.pt-page'),
            $iterate = $('#iterateEffects'),
            animcursor = 1,
            pagesCount = $pages.length,
            current = 0,
            isAnimating = false,
            endCurrPage = false,
            endNextPage = false,
            stopAutoMove = false,
            hasIncorrect = false,
            animEndEventNames = {
                'WebkitAnimation': 'webkitAnimationEnd',
                'OAnimation': 'oAnimationEnd',
                'msAnimation': 'MSAnimationEnd',
                'animation': 'animationend'
            },
        // animation end event name
            animEndEventName = animEndEventNames[Modernizr.prefixed('animation')],
        // support css animations
            support = Modernizr.cssanimations;

        function init() {

            $pages.each(function () {
                var $page = $(this);
                $page.data('originalClassList', $page.attr('class'));
            });

            $pages.eq(current).addClass('pt-page-current');
            var answer = [
                [true, false],
                [true, false],
                [true, false],
                [true, false],
                [true, false]
            ];

            var isCorrect = true;

            $(".pt-page-question").each(function (i) {
                var dd = $(this).find('.answer-right dd');
                dd.on('click', answer[i], function (e) {
                    dd.find('.selectdot').show();
                    dd.find(".check").hide();
                    var curIndex = $(this).index() - 1;
                    $(this).find('.selectdot').hide().siblings().show();

                    if ((e.data[curIndex])) {
                        $('.yes').show();
                        isCorrect = true;
                        $('.yes img').attr('src', 'assets/images/yes.gif');
                        setTimeout(function () {
                            nextPage();
                        }, 700);
                    } else {
                        isCorrect = false;
                        hasIncorrect = true;
                        $(this).parents('.pt-page-question').find(".answer-error").show();
                        $(this).parents('.pt-page-question').find(".answer-right").hide();

                        $('.yes img').attr('src', 'assets/images/no.gif')
                    }
                    ;

                });

            });

            $('.reanswer').click(function () {
                $('.yes,.check').hide();
                $('.selectdot').show();
                $(this).parents('.pt-page-question').find(".answer-error").hide;
                $(this).parents('.pt-page-question').find(".answer-right").show();
            });


            $('.test').click(function () {
                isCorrect && nextPage();
            });


            //touch   event --------------------------- start
            var startX,
                startY,
                $this = $('body');

            $this.bind('touchstart', touchstart);

            function touchstart(event) {
                var touches = event.originalEvent.touches;
                if (touches && touches.length) {
                    startX = touches[0].pageX;
                    startY = touches[0].pageY;
                    $this.bind('touchmove', touchmove);
                }
            }

            function touchmove(event) {
                var touches = event.originalEvent.touches;
                if (touches && touches.length) {
                    var deltaX = startX - touches[0].pageX;
                    var deltaY = startY - touches[0].pageY;

                    if (deltaX >= 50) {
                        //$this.trigger("swipeLeft");
                    }
                    if (deltaX <= -50) {
                        //$this.trigger("swipeRight");
                    }
                    if (deltaY >= 50) {
                        //$this.trigger("swipeUp");
                        !stopAutoMove && nextPage();
                    }
                    if (deltaY <= -50) {
                        //$this.trigger("swipeDown");
                    }
                    if (Math.abs(deltaX) >= 50 || Math.abs(deltaY) >= 50) {
                        $this.unbind('touchmove', touchmove);
                    }
                }
            }

            //touch   event --------------------------- end


        }

        function totaoResult($nextPage) {
            if ($nextPage.hasClass('total-finish') && hasIncorrect) {
                $('.finish-error').show().siblings().hide();
            }
        }
        function endNextAnimation(){
            $('.yes').hide();
        }
        function nextPage() {
            if (isAnimating) {
                return false;
            }

            isAnimating = true;

            var $currPage = $pages.eq(current);

            if (current < pagesCount - 1) {
                ++current;
            } else {
                return;
            }

            var dongClass = ['pt-page-moveFromTop', 'pt-page-rotateCarouselRightIn', 'pt-page-rotateCarouselLeftIn', 'pt-page-scaleUp', 'pt-page-scaleUpDown']
            var $nextPage = $pages.eq(current).addClass('pt-page-current');
            var outClass = 'pt-page-scaleDown';
            var inClass = 'pt-page-moveFromBottom pt-page-ontop';
            var cur = $nextPage.find("[data-aniclss]");
            if ($nextPage.hasClass('pt-page-question')) {
                stopAutoMove = true;
                $('.Move').hide();
            } else {
                stopAutoMove = false;
                $('.Move').show();
            }
            totaoResult($nextPage)
            $pages.find("[data-aniclss]").removeClass(dongClass.join(' '));
            endNextAnimation();
            $currPage.addClass(outClass).on(animEndEventName, function () {
                $currPage.off(animEndEventName);
                endCurrPage = true;
                if (endNextPage) {
                    cur.addClass(cur.data('aniclss'));

                    onEndAnimation($currPage, $nextPage);
                }
            });

            $nextPage.addClass(inClass).on(animEndEventName, function () {
                $nextPage.off(animEndEventName);
                endNextPage = true;
                if (endCurrPage) {
                    onEndAnimation($currPage, $nextPage);
                }
            });

            if (!support) {
                onEndAnimation($currPage, $nextPage);
            }

        }

        function onEndAnimation($outpage, $inpage) {

            endCurrPage = false;
            endNextPage = false;
            resetPage($outpage, $inpage);
            isAnimating = false;
        }

        function resetPage($outpage, $inpage) {
            $outpage.attr('class', $outpage.data('originalClassList'));
            $inpage.attr('class', $inpage.data('originalClassList') + ' pt-page-current');
        }

        init();

        return {init: init};

    })();

    $(".title1 .title-pic1").addClass('pt-page-moveFromTop');
    $(".title1 .title-pic2").addClass('pt-page-rotateCarouselLeftIn');
})
