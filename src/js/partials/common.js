/* 
* @Author: Siarhei
* @Date:   2015-03-06 23:54:36
* @Last Modified by:   Siarhei
* @Last Modified time: 2015-03-23 14:52:40
*/

var Common = (function(){
	
	// Private vars	

	return {
		
		// Init module
		init: function(){
			this.pre();
		},

		// Events here
		pre: function(){

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
			
		}

	}

})();