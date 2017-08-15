(function(angular) {
   'use strict';
	function inputController() {
		var ctrl = this;
		ctrl.emailpattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	    
	    /**
	     * Update email
	     * @param {value} string - The new value
	     */
	    ctrl.update = function(value) {
	        ctrl.onUpdate({value: value});
	    };
	}
	angular.module('myapp').component('myInputEmail', {
		templateUrl: '../components/email.html',
		controller: inputController,
		 bindings:{
	       formReference:'<',
	       myInputModel:'<',
	       onUpdate:'&'
	     },
	});
})(window.angular);
