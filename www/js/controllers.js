angular.module('brightstarConnect.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('homeCtrl', function($scope) {
  $scope.technologies = [
    { name: 'Ionic 1' },
    { name: 'Angular 1.x'}
  ];
})

.controller('eventsCtrl', ['$scope', 'eventService', function($scope, eventService) {
  $scope.events = [];

  eventService.GetAll()
    .then(function (events) {
      $scope.events = events;
    });
}])

.controller('eventDetailsCtrl', ['$scope', 'eventService', '$stateParams', '$ionicModal', '$ionicPopup', '$state', function($scope, eventService, $stateParams, $ionicModal, $ionicPopup, $state) {

  $scope.event = {};

  initController();

  function initController() {
    if($stateParams._id) {
      eventService.GetById($stateParams._id)
        .then(function(event) {
          $scope.event = event;
        });
    }
  }

  $scope.registration = {};

  // create the registration modal that we will use later
  $ionicModal.fromTemplateUrl('templates/register.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.registerForm = modal;
  });

  // triggered in the register modal to close it
  $scope.closeRegister = function() {
    $scope.registerForm.hide();
  };

  // Open the register modal
  $scope.register = function() {
    $scope.registerForm.show();
  }

  // confirm dialog
  $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.alert({
      title: 'Registration saved.',
      template: 'Email confirmation has been sent.'
    });

    confirmPopup.then(function(res) {
      // close register form
      $scope.closeRegister();
      $state.go('app.events');
    });
  };

  // Perform the register action when the user submits the register form
  $scope.doRegister = function() {

    // clear error messages
    $scope.error = '';

    eventService.SaveRegistration($stateParams._id, $scope.registration)
      .then(function() {
        // show confirmation pop up
        $scope.showConfirm();
      })
      .catch(function (error) {
        if(error.message) {
          $scope.error = error.message;
        } else {
          $scope.error = error;
        }
      });

  };

}])

;
