angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $state) {
  $scope.settings = function() {
    $state.go("tab.settings");
  }
  $scope.logout = function() {
    $state.go("login");
  }
})
.controller('SettingsCtrl', function($scope) {

})
.controller('LoginCtrl', function($scope, $state) {
  $scope.data={};
  $scope.login = function() {
    $state.go("tab.home");
  }
  console.log($scope.data);
})

.controller('CategoriesCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
