$(function() {
    var delay = 8000;
    var interval = setInterval(nextpage, delay);

    var $htmlbody = $("html, body");
    $(".fa.fa-chevron-down").on("click", function(e) {
        e.preventDefault();

        $htmlbody.animate({
            "scrollTop": $("body > section").offset().top-36-15
        }, 300, "swing");
    });

    $("img[data-img]:not(.highres)").on("load", function() {
        var $img = $(this);
        var img = $img.data("img");
        var $highres = $("img[data-img=" + img + "].highres");
        var src = $highres.data("src");
        $highres.on("load", function() {
            $img.attr("src", src);
            $highres.remove();
        });
        $highres.attr("src", src);
    });

    // $(".slide1").on("swiperight", function() {
    //     $("#btn4").click();
    // }).on("swipeleft", function() {
    //     $("#btn2").click();
    // });
    // $(".slide2").on("swiperight", function() {
    //     $("#btn1").click();
    // }).on("swipeleft", function() {
    //     $("#btn3").click();
    // });
    // $(".slide3").on("swiperight", function() {
    //     $("#btn2").click();
    // }).on("swipeleft", function() {
    //     $("#btn4").click();
    // });
    // $(".slide4").on("swiperight", function() {
    //     $("#btn3").click();
    // }).on("swipeleft", function() {
    //     $("#btn1").click();
    // });

    $("#btn1, #btn2, #btn3, #btn4").on("change", function() {
        if (interval != null) {
            clearInterval(interval);
            interval = null;
        }
        interval = setInterval(nextpage, delay);
    });

    var $section = $(".slider section");
    var origin = { x: null, y: null, scrolling: false };

    $(".slider").on("touchstart", function(event) { // mousedown
        if (interval != null) {
            clearInterval(interval);
            interval = null;
        }

        if (origin.x == null || origin.y == null) {
            origin.x = event.originalEvent.pageX;
            origin.y = event.originalEvent.pageY;
            origin.scrolling = false;
        }
    });

    $(window).on("touchmove", function(event) { // mousemove
        if (origin.x == null || origin.y == null) return;

        var deltaX = origin.x - event.originalEvent.pageX;
        var deltaY = origin.y - event.originalEvent.pageY;

        if (Math.abs(deltaY) > Math.abs(deltaX)) return;

        if (Math.abs(deltaX) >= 10) origin.scrolling = true;
        else if (!origin.scrolling) return;

        event.preventDefault();

        var page = 1;
        if ($("#btn1").is(":checked")) page = 1;
        else if ($("#btn2").is(":checked")) page = 2;
        else if ($("#btn3").is(":checked")) page = 3;
        else if ($("#btn4").is(":checked")) page = 4;

        if (deltaX < 0 && page <= 1)
            deltaX = -Math.pow(Math.max(0, -deltaX), 0.75);
        else if (deltaX > 0 && page >= 4)
            deltaX = Math.pow(Math.max(0, deltaX), 0.75);

        $section.css("transition", "none");
        $section.css("margin-left", -($(window).width() * (page - 1) + deltaX) + "px");
    });

    $(window).on("touchend", function(event) { // mouseup
        if (interval == null) interval = setInterval(nextpage, delay);

        if (origin.x == null || origin.y == null) return;

        var deltaX = origin.x - event.originalEvent.pageX;
        var deltaY = origin.y - event.originalEvent.pageY;

        origin.x = null;
        origin.y = null;

        if (Math.abs(deltaY) > Math.abs(deltaX)) {
            $section.css("transition", "");
            $section.css("margin-left", "");
            return;
        }

        if (Math.abs(deltaX) >= 10) origin.scrolling = true;
        else if (!origin.scrolling) {
            $section.css("transition", "");
            $section.css("margin-left", "");
            return;
        }

        event.preventDefault();

        if (Math.abs(deltaX) < $(window).width() / 3) {
            $section.css("transition", "margin-left .3s ease-out");
            $section.css("margin-left", "");

            setTimeout(function() {
                $section.css("transition", "");
                $section.css("margin-left", "");
            }, 300);
            return;
        }

        var page = 1;
        if ($("#btn1").is(":checked")) page = 1;
        else if ($("#btn2").is(":checked")) page = 2;
        else if ($("#btn3").is(":checked")) page = 3;
        else if ($("#btn4").is(":checked")) page = 4;

        if (page < 4 && deltaX > 0) {
            page++;
            deltaX = $(window).width() - deltaX;
        } else if (page > 1 && deltaX < 0) {
            page--;
            deltaX = $(window).width() + deltaX;
        } else {
            $section.css("transition", "margin-left .3s ease-out");
            $section.css("margin-left", "");

            setTimeout(function() {
                $section.css("transition", "");
                $section.css("margin-left", "");
            }, 300);
            return;
        }

        $("#btn" + page).click();

        var marginLeft = -($(window).width() * (page - 1));
        var deltaMargin = Math.abs(parseInt($section.css("margin-left")) - marginLeft);

        $section.css("transition", "margin-left " + (deltaMargin / $(window).width()) + "s ease-out");
        $section.css("margin-left", marginLeft + "px");

        setTimeout(function() {
            $section.css("transition", "");
            $section.css("margin-left", "");
        }, deltaMargin / $(window).width() * 1000);
    });

    $(window).on("touchcancel", function(event) {
        $(window).trigger("touchend");
    });

    function nextpage () {
        if ($("#btn1").is(":checked")) $("#btn2").click();
        else if ($("#btn2").is(":checked")) $("#btn3").click();
        else if ($("#btn3").is(":checked")) $("#btn4").click();
        else if ($("#btn4").is(":checked")) $("#btn1").click();
    }

    // (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    // (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    // m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    // })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    // ga('create', 'UA-79674303-1', 'auto');
    // ga('send', 'pageview');
});

// $(document).on("mobileinit", function() {
//     $.extend($.mobile, {
//         autoInitializePage: false
//     });
// });
