(function(angular) {
  'use strict';
  function ItemDetailController() {
    var ctrl = this;

    /**
     * Delete task
     */
    ctrl.delete = function() {
      ctrl.onDelete({item: ctrl.item});
    };

    /**
     * Update task
     * @param {prop} string - The property 
     * @param {value} string - The new value
     */
    ctrl.update = function(prop, value) {
      ctrl.onUpdate({item: ctrl.item, prop: prop, value: value});
    };
  }

  angular.module('myapp').component('itemDetail', {
    templateUrl: '../components/itemDetail.html',
    controller: ItemDetailController,
    bindings: {
      item: '<',
      onDelete: '&',
      onUpdate: '&'
    }
  });
})(window.angular);