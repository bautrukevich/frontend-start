/* 
* @Author: Siarhei
* @Date:   2015-03-06 23:54:36
* @Last Modified by:   Siarhei
* @Last Modified time: 2015-03-23 14:53:04
*/

var Modal = (function(){
	
	// Private vars	

	return {
		
		// Init module
		init: function(){
			
			$('#js-show-modal').on('loading.tools.modal', function(modal)
			{
				console.log("Loading…");
				this.createCancelButton('Cancel');

				var buttonDelete = this.createDeleteButton('Delete');
				var buttonAction = this.createActionButton('Save');

				buttonDelete.on('click', $.proxy(function()
				{
					// your code

					this.modal.close();

				}, this));

				buttonAction.on('click', $.proxy(function()
				{
					// your code

					this.modal.close();

				}, this));
			});

		},

	}

})();