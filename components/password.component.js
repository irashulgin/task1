(function() {
   'use strict';
	function inputController() {
		var ctrl = this;
		ctrl.passpattern = /^.*(?=.{6,})(?=.*\d)(?=.*[a-zA-Z]).*$/;

		/**
	     * Update password
	     * @param {value} string - The new value
	     */    
	    ctrl.update = function(value) {
	        ctrl.onUpdate({value: value});
	    };
	}
	angular.module('myapp').component('myInputPassword', {
		templateUrl: '../components/password.html',
		controller: inputController,
		 bindings:{
	       formReference:'<',
	       myInputModel:'<',
	       onUpdate:'&'
	     },
	});
})(); 