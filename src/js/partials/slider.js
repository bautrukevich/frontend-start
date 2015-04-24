/* 
 * @Author: Siarhei
 * @Date:   2015-03-06 23:54:36
 * @Last Modified by:   Siarhei
 * @Last Modified time: 2015-04-04 01:10:41
 */

var Slider = (function() {

	// Private vars	

	return {

		// Init module
		init: function() {

			// var slider = Peppermint(document.getElementById('peppermint'), {
			// 	// dots: true,
			// 	// //slideshow: true,
			// 	// speed: 500,
			// 	// slideshowInterval: 5000,
			// 	// stopSlideshowAfterInteraction: true,
			// 	// onSetup: function(n) {
			// 	// 	console.log('Peppermint setup done. Slides found: ' + n);
			// 	// },
			// 	//скорость перехода между слайдами, мс
			// 	speed: 300,

			// 	//скорость перехода между слайдами после тача, мс
			// 	touchSpeed: 300,

			// 	//включить слайдшоу
			// 	slideshow: false,

			// 	//интервал переключения слайдов, мс
			// 	slideshowInterval: 4000,

			// 	//останавливать слайдшоу после переключения слайда пользователем
			// 	stopSlideshowAfterInteraction: false,

			// 	//начальный слайд
			// 	startSlide: 0,

			// 	//разрешить управление мышкой
			// 	mouseDrag: true,

			// 	//не включать Peppermint, если слайд один
			// 	disableIfOneSlide: true,

			// 	//Префикс для служебных классов слайдера,
			// 	//таких как `inactive`, `active`, `mouse`, `drag` и т. д.
			// 	//Не забудьте поменять стили соответствующим образом!
			// 	cssPrefix: 'peppermint-',

			// 	//показывать точки
			// 	dots: true,

			// 	//положить точки в начало блока `dotsContainer` (по умолчанию кладутся в конец)
			// 	dotsPrepend: false,

			// 	//Элемент, в который положить точки. По умолчанию корневой элемент слайдера.
			// 	//Может быть где угодно на странице.
			// 	dotsContainer: undefined,  

			// 	//Элемент, содержащий слайды. По умолчанию корневой элемент слайдера.
			// 	slidesContainer: undefined,

			// 	//Callback-функция, вызывается при смене слайда.
			// 	//В качестве параметра получает номер слайда.
			// 	onSlideChange: undefined,

			// 	//Callback-функция, вызывается пойсле завершения установки.
			// 	//В качестве параметра получает количество слайдов.
			// 	onSetup: undefined
			// });

			//сохранить jQuery-ссылку на блок слайдера
			// var slider = $('#peppermint');

			// //запустить Peppermint
			// slider.Peppermint();
			
			// //клик по `#right-arr` переключит на следующий слайд
			// $('.js-right-arrow').click(slider.data('Peppermint').next);

			// //клик по `#left-arr` переключит на предыдущий слайд
			// $('.js-left-arrow').click(slider.data('Peppermint').prev);

			$(".owl-carousel").owlCarousel({
 
				//navigation : true, // Show next and prev buttons
				slideSpeed : 300,
				paginationSpeed : 400,
				singleItem:true

				// "singleItem:true" is a shortcut for:
				// items : 1, 
				// itemsDesktop : false,
				// itemsDesktopSmall : false,
				// itemsTablet: false,
				// itemsMobile : false

			});

		}

	}

})();
