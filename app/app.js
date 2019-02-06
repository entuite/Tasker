'use strict';

var taskerApp = angular.module('Tasker', ['ngRoute','ngAnimate', 'ui.bootstrap','angularjs-datetime-picker','angular-atc']);
// Declare app level module which depends on views, and core components


taskerApp.controller('taskCtrl',function($scope,$uibModal,$document,$window){
  $scope.tasks = [];
  $scope.objIndex = -1;
  $scope.deleteIndex = -1;
  
  
 
  $scope.MakeEmpty = function(){
    $scope.task = {
      taskName:'',
      description:'',
      StartDateTime:'',
      endDateTime:''
      
    };
    $scope.objIndex = -1;
   
  }

  $scope.MakeEmpty();
 
  $scope.createTask = function(){
     
    $scope.tasks.push($scope.task);
    console.log($scope.tasks);
    $scope.MakeEmpty();
   
  }
  $scope.editTask = function(index){
    $scope.objIndex = index;
    angular.copy($scope.tasks[index], $scope.task);
  }

  $scope.saveTask = function(){
    angular.copy($scope.task,$scope.tasks[$scope.objIndex]);
    $scope.MakeEmpty();
  }


  $scope.confirmDelete = function () {
    var $uibModalInstance = $uibModal.open({
      templateUrl: 'modal.html',
      animate: true,
      scope:$scope,

      controller: function ($uibModalInstance) {
        $scope.ok = function (delIndex) {
          console.log($scope);
          $scope.tasks.splice(delIndex, 1);  
          $uibModalInstance.close();
        };
      
        $scope.closeModal = function () {
         console.log($scope)
         $uibModalInstance.dismiss();
        };
      }
    })


  };
  $scope.OpenEvent = function(index){
    console.log($scope.tasks[index])
    var thisEvent = $scope.tasks[index],
    startDate = $scope.tasks[index].StartDateTime.toString().split(".")[0].replace(/[-:]/g,'')+'Z',
    endDate = $scope.tasks[index].endDateTime.toString().split(".")[0].replace(/[-:]/g,'')+'Z',
    
    url = 'https://calendar.google.com/calendar/r/eventedit?text='+thisEvent.taskName+'&dates='+startDate+'/'+endDate+'&details='+thisEvent.description+'&sf=true&output=xml'
    $window.open(url, '_blank');
  }
  
  $scope.formatDate = function(dateVal){
   return dateVal.split(".").split(".")[0].replace(/[-:]/g,'')+'Z';

  }
  
}).


config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

 
}]);
