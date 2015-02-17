// COMMON 

(function() {
    "use strict";

    // Вывод дампа через pre делаем в виде простого дерева
    $("pre").each(function() {
        $(this).html(
            $(this).text()
            .split("Array\n").join("<b>Array toggle</b>")
            .split("(").join("<i> [all]</i><div><pre>")
            .split(")").join("</pre></div>")
        )
    });

    $("pre").each(function() {
        var ptext = $(this).text(),
            ptextlen = ptext.length;
        if (ptextlen < 40) { /*  || (ptextlen < 20 && ptext.indexOf(' ') == -1) */
            $(this).parent().prev("i").remove();
            $(this).parent().prev("b").remove();
            $(this).parent().html("(" + ptext + ")").contents().unwrap();
        }
    });

    $("pre b").click(function(e) {
        $(this).next().next("div").toggle();
    });
    $("pre i").click(function(e) {
        $(this).parent().find("div").show();
    });

    $("pre b, pre i").css({
        "font-size": "12px",
        "color": "#000",
        "cursor": "pointer",
    });
    $("pre div").hide();

})(jQuery);