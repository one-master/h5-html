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
            animEndEventNames = {
                'WebkitAnimation': 'webkitAnimationEnd',
                'OAnimation': 'oAnimationEnd',
                'msAnimation': 'MSAnimationEnd',
                'animation': 'animationend'
            },
        // animation end event name
            animEndEventName = animEndEventNames[ Modernizr.prefixed('animation') ],
        // support css animations
            support = Modernizr.cssanimations;

        function init() {

            $pages.each(function () {
                var $page = $(this);
                $page.data('originalClassList', $page.attr('class'));
            });

            $pages.eq(current).addClass('pt-page-current');
            var answer = [
                [false, true],
                [true, false],
                [true, false],
                [false, true],
                [true, false]
<<<<<<< HEAD
            ]
            $(".pt-page-question").each(function (i) {
                var dd = $(this).find('dd');
                dd.on('click', answer[i], function (e) {
=======
            ];
            var isCorrect = true;
            $(".pt-page-question").each(function(i){
                var dd= $(this).find('dd');
                dd.on('click',answer[i],function(e){
>>>>>>> 1f20dcb58aeebeccd75aa5153edae15496c3cec3
                    dd.find('.selectdot').show();
                    dd.find(".check").hide();
                    var curIndex = $(this).index() - 1;
                    $(this).find('.selectdot').hide().siblings().show();

                    if ((e.data[curIndex])) {
                        $('.yes').show();
<<<<<<< HEAD
                        $('.yes img').attr('src', 'assets/images/yes.gif');
                        nextPage();

                    } else {
                        $('.yes img').attr('src', 'assets/images/no.gif');
=======
                        isCorrect = true;
                       $('.yes img').attr('src','assets/images/yes.gif');
                        nextPage();

                    }else{
                        isCorrect = false;
                      $('.yes img').attr('src','assets/images/no.gif')
>>>>>>> 1f20dcb58aeebeccd75aa5153edae15496c3cec3

                    };

                });

            })
            $('.test').click(function () {
                isCorrect && nextPage();
            });


        }

        function nextPage(animation) {
            if (isAnimating) {
                return false;
            }

            isAnimating = true;

            var $currPage = $pages.eq(current);

            if (current < pagesCount - 1) {
                ++current;
            }
            else {
                current = 0;
            }
            var dongClass = ['pt-page-moveFromTop', 'pt-page-rotateCarouselRightIn', 'pt-page-rotateCarouselLeftIn', 'pt-page-scaleUp', 'pt-page-scaleUpDown']
            var $nextPage = $pages.eq(current).addClass('pt-page-current'),
                outClass = 'pt-page-scaleDown';
            inClass = 'pt-page-moveFromBottom pt-page-ontop';
            $pages.find("[data-aniclss]").removeClass(dongClass.join(' '));
            var cur = $nextPage.find("[data-aniclss]");


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

        return { init: init };

    })();

    $(".title1 .title-pic1").addClass('pt-page-moveFromTop');
    $(".title1 .title-pic2").addClass('pt-page-rotateCarouselLeftIn');
})
