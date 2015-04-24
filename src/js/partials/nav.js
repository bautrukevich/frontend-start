/* 
 * @Author: Siarhei
 * @Date:   2015-03-06 23:54:36
 * @Last Modified by:   Siarhei
 * @Last Modified time: 2015-04-04 01:10:41
 */

var Nav = (function() {

	// Private vars	

	return {

		// Init module
		init: function() {

			// $('#pagepiling').pagepiling({
			// 	menu: '#menu',
			// 	anchors: ['main', 'how', 'contacts'],
			// 	sectionsColor: ['#fff', '#fff', '#2891f7'],
			// 	scrollingSpeed: 300,
			// 	navigation: {
			// 		// 'textColor': '#f2f2f2',
			// 		// 'bulletsColor': '#ccc',
			// 		'position': 'right',
			// 		'tooltips': ['Платформа', 'Как работает?', 'Контакты']
			// 	}
			// });

			$('#fullpage').fullpage({
				menu: '#menu',
				anchors: ['', 'how', 'contacts'],
				sectionsColor: ['#fff', '#fff', '#2891f7'],
				animateAnchor: true,
				scrollingSpeed: 1000,
				navigation: {
					// 'textColor': '#f2f2f2',
					// 'bulletsColor': '#ccc',
					'position': 'right',
					//'tooltips': ['Платформа', 'Как работает?', 'Контакты']
				},
				//navigationTooltips: ['','Как работает?', 'Контакты'],
				onLeave: function(index, nextIndex, direction){

					$("#fp-nav").fadeOut();

					if(nextIndex == 1 || nextIndex == 5) {
						$(".header").addClass("hide-header");
					} else {
						$(".header").removeClass("hide-header");
					}

					if(nextIndex == 2) {
						$(".js-write-us").addClass("hide");
					} else {
						$(".js-write-us").removeClass("hide");
					}

					if(nextIndex == 3) {
						$(".js-mail-me").addClass("hide");
					} else {
						$(".js-mail-me").removeClass("hide");
					}

					// if(index == 1) {
					// 	$("#fp-nav").fadeOut();
					// }

					if(nextIndex == 1) {
						$("#fp-nav").fadeOut();
					}

					// if(nextIndex == 5) {
					// 	$("#fp-nav li").removeClass('on-image');
					// } else {
					// 	$("#fp-nav li").addClass('on-image');
					// }
				},

				afterLoad: function(anchorLink, index){
					//using index
					if(index != 1 && index != 5) {
						$("#fp-nav").fadeIn();
					}
				},
			});

			$(".to-how").on("click", function(evt) {
				evt.preventDefault();

				// Move to slide 2
				$.fn.fullpage.moveTo(2);

				return false;
			});

		}

	}

})();
