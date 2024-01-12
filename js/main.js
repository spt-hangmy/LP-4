$(document).ready(function(){

    /*----Get Header Height ---*/
    function get_header_height() {
        var header_sticky=$("header").outerHeight()
        $('body').css("--header-height",header_sticky+'px')
    }

    setTimeout(function(){
        get_header_height()
    }, 500);

    $( window ).resize(function() {
      get_header_height()
    });


    function isEmpty( el ){
          return !$.trim(el.html())
    }


    //smoothscroll
    $('#menu-main-menu a').on('click', function (e) {
        if($('body').hasClass('home')) {
            var target = this.hash,
                menu = target;
            if( menu ){
                e.preventDefault();
                $(document).off("scroll");
    
                $('a').each(function () {
                    $(this).removeClass('active');
                })
                $(this).addClass('active');
    
                $target = $(target);
                $('html, body').stop().animate({
                    'scrollTop': $target.offset().top - 10
                });
                window.location.hash = target;
            }
        }
    });

    // Sticky navbar
    // =========================

    // Custom function which toggles between sticky class (is-sticky)
    var stickyToggle = function (sticky, stickyWrapper, scrollElement,stickyHeight) {
        var stickyTop = stickyWrapper.offset().top;
        if (scrollElement.scrollTop() >= stickyTop && scrollElement.scrollTop() > 0 ) {
            stickyWrapper.height(stickyHeight);
            sticky.addClass("is-sticky");
        }
        else {
            sticky.removeClass("is-sticky");
            stickyWrapper.height('auto');
        }
    };
    $('[data-toggle="sticky-onscroll"]').each(function () {
        var sticky = $(this);
        var stickyWrapper = $('<div>').addClass('sticky-wrapper'); // insert hidden element to maintain actual top offset on page
        sticky.before(stickyWrapper);
        sticky.addClass('sticky');
        var stickyHeight = sticky.outerHeight();
        // Scroll & resize events
        $(window).on('scroll.sticky-onscroll resize.sticky-onscroll', function () {
            stickyToggle(sticky, stickyWrapper, $(this),stickyHeight);
        });

        // On page load
        stickyToggle(sticky, stickyWrapper, $(window),stickyHeight);
        // Check scroll top
        var winSt_t = 0;
        $(window).scroll(function() {
            var winSt = $(window).scrollTop();
            if (winSt >= winSt_t) {
                $('body').addClass("top_show")
                sticky.removeClass("top_show")
            } else {
                sticky.addClass("top_show")

                $('body').removeClass("top_show")
            }
            winSt_t = winSt
        });
    });

    //check home
    // if($('body').hasClass( "home" )){
        // new WOW().init();
    // }

    //-------------------------------------------------
    // Menu
    //-------------------------------------------------
    $.fn.dnmenu = function( options ) {

        let thiz = this
        let menu = $(this).attr('id')
        let menu_id = '#'+menu
        var button = $('a[href="#'+menu+'"]')

        // Default options
        var settings = $.extend({
            name: 'John Doe'
        }, options );

        // get ScrollBar Width
        function getScrollBarWidth () {
            var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
                widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
            $outer.remove();
            return 100 - widthWithScroll;
        };
        let ScrollBarWidth = getScrollBarWidth() + 'px';

        // Create wrap
        // Button click
        button.click(function(e){
            e.preventDefault()
            console.log(button)
            if(button.hasClass('active')){
                $('body').removeClass('modal-open').css("padding-right","")
                button.removeClass('active')
                $(menu_id).removeClass('active')

            } else {
                $('body').addClass('modal-open').css("padding-right",ScrollBarWidth)
                button.addClass('active')
                $(menu_id).addClass('active')

            }
        });

        // Menu
        var el= $(thiz).find(".nav__mobile--ul");
        el.find(".menu-item-has-children>a").after('<button class="nav__mobile__btn"><i></i></button>'),

        el.find(".nav__mobile__btn").on("click",function(e){
            e.stopPropagation(),
            $(this).parent().find('.sub-menu').first().is(":visible")?$(this).parent().removeClass("sub-active"):
            $(this).parent().addClass("sub-active"),
            $(this).parent().find('.sub-menu').first().slideToggle()
        })
        // Apply options
        return;
    };

    $('#menu__mobile').dnmenu()


    //Tab plan
    $('.plan-tabs').on("click",function(e) {
        if( $(this).hasClass('active') ){
            $(this).removeClass('active')
        }else{
            $(this).addClass('active')
        }
    })

    $('.pageform__form .wpcf7-select option[value=""]').attr('disabled',true);


    // Fix right
    var fixed_contact=$(".fixed-contact")
    $(window).scroll(function(){
        $(this).scrollTop()>300?fixed_contact.addClass("fixed"):fixed_contact.removeClass("fixed")
    })

    // Fix ebook
    var fixed_ebook=$(".fixed-ebook")
    $(window).scroll(function(){
        $(this).scrollTop()>600?fixed_ebook.addClass("fixed"):fixed_ebook.removeClass("fixed")
    }),$('.fixed-ebook__close').on("click",function(o){$('.fixed-ebook').addClass('close')});


    $('.js-readmore-btn').click(function(e) {
        if( $(this).closest('.js-readmore').hasClass('show') ){
            $(this).closest('.js-readmore').removeClass('show')
        }else{
            $(this).closest('.js-readmore').addClass('show')
        }
    })

});


