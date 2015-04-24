/* 
* @Author: Siarhei
* @Date:   2015-03-06 23:54:36
* @Last Modified by:   Siarhei
* @Last Modified time: 2015-04-04 01:10:46
*/

var App = (function(){
	// Private vars

	// Object public API
	return {

		// Init module
		init: function(){
			// Init all modules
			Common.init();
			Nav.init();
			Slider.init();
			//Modal.init();
		}

	}

})();

// Init global module
App.init();