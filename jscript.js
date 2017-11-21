/* Footer Adjustment by au2001 */
function calc () {
	var scroll = $(window).height() > $("body").height()+75;
	$("footer").css("position", scroll? "absolute" : "");
}
$(document).ready(function () { setTimeout(calc, 100) });
$(window).resize(calc);

var interval = null;
function nextslide () {
    if (interval != null) clearInterval(interval);
    interval = setInterval(function () {
        var i = parseInt($("#slideshow-wrap input[type=radio]:checked").attr("id").substr(6))+1;
        if ($("#button" + i).length)
            $("#button" + i).click();
        else
            $("#button1").click();
    }, 8000);
};