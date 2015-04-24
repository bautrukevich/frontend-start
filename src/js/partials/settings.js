/* 
* @Author: Siarhei
* @Date:   2015-03-06 23:54:36
* @Last Modified by:   Siarhei
* @Last Modified time: 2015-04-03 22:22:09
*/

"use strict";

Date.prototype.ddmmyyyy = function(delimeter) {
	var yyyy = this.getFullYear().toString();
	var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
	var dd  = this.getDate().toString();
	var hh = this.getHours().toString();
	// var m = this.getMinutes();
	if (this.getMinutes() < 10) {
		var m = '0' + this.getMinutes().toString();
	} else {
		var m = this.getMinutes().toString();
	}
	return (dd[1]?dd:"0"+dd[0]) + delimeter + (mm[1]?mm:"0"+mm[0]) + delimeter + yyyy + " " + hh + ":" + m; // padding
};

$('input').on('focus', function (e) {
	$(this)
		.one('mouseup', function () {
			$(this).select();
			return false;
		})
		.select();
});