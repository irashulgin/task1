(function() {
  'use strict';
  function itemsListController ($rootScope, UserService,$scope) {

    var ctrl = this;
    ctrl.list = [];
    self.currentLen = 0;
    self.filtered = false;

    $scope.sortableOptions = {
      handle: '> .task-content',
      update: function(e, ui) {
        console.log('updating');
      },
      stop: function(e, ui) {
        var from = ui.item.sortable.index;
        var to = ui.item.sortable.dropindex;
        if (angular.isUndefined(from) || angular.isUndefined(to)) {
          return;
        }
        if (Math.abs(to - from) == 1) {
          ctrl.list[to].order = to + 1;
          ctrl.list[from].order = from + 1;
          ctrl.updateItem (ctrl.list[to], 'order', ctrl.list[to].order);
          ctrl.updateItem (ctrl.list[from], 'order', ctrl.list[from].order);
        }
        else resetTasksOrder();
      }
    };

    function resetTasksOrder () {
      angular.forEach(ctrl.list, function(value, key) {
        ctrl.updateItem (value, 'order', key + 1);
      });
    }

    /**
     * Get all tasks
     */
    ctrl.getTasks = function() {
      ctrl.taskSearch = "";
      UserService.GetAll().then(function (response) {
        if (response) {
          if(response.tasks) {
              response.tasks.forEach(function(task) {
                Object.keys(task).forEach(function(key) {
                  var newkey = "id";
                  if(key == "_id") {
                    task[newkey] = task[key];
                    delete task[key];
                  }
                });
              });
              ctrl.list  = response.tasks;
              ctrl.list  = ctrl.list.sort(function(a, b) {
                  return a.order == b.order ? 0 : a.order < b.order ? -1 : 1;
              });
              self.currentLen = ctrl.list.length;
              self.filtered = false;
          } else {
            if( !response.success) {
              self.error = response.message;
              console.log(self.error); 
            }
          }
        } else { 
          self.error = response.message;
          console.log(self.error);  
        }
      }); 
    }

    /**
     * search for task
     * @param {query} string - The query for task search 
     */
    ctrl.searchTask = function(query) {
      self.currentLen = ctrl.list.length;
      UserService.SearchTask(query) 
        .then(function (response) {
          if (response) {
            ctrl.list = response.tasks;
            self.filtered = true;
          } else {
            ctrl.list = [];
          }
      });
    };
  
    /**
     * Adding new  task
     * @param {text} string - The text description for new task  
     */
    ctrl.addTask =  function(text) {
      var last = 1;
      if (ctrl.list && ctrl.list.length > 0) { 
        last = self.currentLen + 1;
      }
      UserService.AddTask({'id': Math.floor(Math.random() * 10),'task':text,'order': last})
        .then(function (response) {
          if (response) {
            var task = {'id': response.task._id,'order':response.task.order, 'task':response.task.task};
            ctrl.list.push(task);
            ctrl.taskText = "";
            self.currentLen++;
          } else {
            $ctrl.error = response.message;
            }
        }); 
    }

    /**
     * Update task
     * @param {item} object - The task to update
     * @param {prop} string - The property to update
     * @param {value} string - The new value
     */
    ctrl.updateItem = function(item, prop, value) {
      item[prop] = value;
      UserService.Update(item).then(function (response) {
        if (response) {
          item[prop] = value;
        } else {
          $ctrl.error = response.message;
        }
      }); 
    };

    /**
     * Reset order for folowing items in the list
     * @param {idx} number - The index of deleted item
     */
    ctrl.resetOrder = function(idx) {
      var sortedList = ctrl.list.sort(function(a, b) {
        return a.order == b.order ? 0 : a.order < b.order ? -1 : 1;
      })
      angular.forEach(sortedList, function(value, key) {
        if(value.order > idx) {
          value.order -= 1;
          UserService.Update(value).then(function (response) {
            if (response) {
              console.log('updated');
            } else {
              console.log(response.message);
            }
          });
        }
      });
    }

    /**
     * Delete task from list
     * @param {item} object - The task to be deleted
     */
    ctrl.deleteItem = function(item) {
      var idx = ctrl.list.indexOf(item);
        UserService.Delete(item.id).then(function (response) {
          if (response) {
            ctrl.list.splice(idx, 1);
            ctrl.resetOrder(item.order);
            self.currentLen--;
          } else { 
            console.log(response.message);
          }
        });
    };
    ctrl.getTasks();
  }

  angular.module('myapp').component('itemsList', {
    templateUrl: '../components/itemsList.html',
    controller: ['$rootScope', 'UserService','$scope',itemsListController]
  });
})();