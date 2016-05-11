angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $state, $ionicHistory) {
  $scope.settings = function() {
    $state.go("tab.settings");
  }
  $scope.logout = function() {
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });
    $state.go("login");
  }
})
.controller('SettingsCtrl', function($scope, $state) {
  $scope.language = function() {
    $state.go("tab.language");
  }
  $scope.contype = function() {
    $state.go("tab.contype");
  }
  $scope.favcat = function() {
    $state.go("tab.favcat");
  }
})
.controller('LanguageCtrl', function($scope) {
  $scope.lang="en"
})
.controller('ConTypeCtrl', function($scope) {

})
.controller('FavCatCtrl', function($scope) {
  $scope.filter = {};
  $scope.prova = function() {
    for(var key in $scope.filter)
      if($scope.filter[key])
        console.log(key);
  }
})
.controller('LoginCtrl', function($scope, $state, $ionicHistory) {
  $ionicHistory.nextViewOptions({
    disableAnimate: true,
    disableBack: true
  });
  $scope.data={};
  $scope.login = function() {
    $state.go("tab.home");
  }
  console.log($scope.data);
})

.controller('CategoriesCtrl', function($scope, Categories) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.categories = Categories;

})

.controller('POIsCtrl', function($scope, $stateParams, POIs) {
  $scope.catId = $stateParams.catId;
  $scope.catName = $stateParams.catName;
  POIs.get($scope.catId);
  $scope.POIs = POIs.response;
})

.controller('POICtrl', function($scope, $stateParams, POI, $ionicScrollDelegate) {

  $scope.POIId = $stateParams.POIId;
  $scope.POIName = $stateParams.POIName;
  POI.get($scope.POIId);
  $scope.POI = POI.response;
  console.log($scope.POI);
  var interval = setInterval(function(){
    $ionicScrollDelegate.resize();
  }, 500);
  $scope.$on("$ionicView.beforeEnter",function(){
    //angular.element(document.getElementById('iosScroll').addClass("enable-scrl"));
  })
  $scope.$on("$ionicView.beforeLeave",function(){
    clearInterval(interval);
  })


})

.controller('MapCtrl', function($scope,$cordovaGeolocation,$http) {
  var bounds = [];
  var map = L.map('map').setView([0,0], 3);
  L.Icon.Default.imagePath = 'img/leaflet'
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'francescodist.035nng4l',
    accessToken: 'pk.eyJ1IjoiZnJhbmNlc2NvZGlzdCIsImEiOiJjaW5lYzQ4MDIwMDZsdmhseGJ0azNtYTBjIn0.BYS_2f0YYg-AUnYJ08EPrg'
  }).addTo(map);
  var posOptions = {timeout: 3000, enableHighAccuracy: false};
  $cordovaGeolocation.getCurrentPosition(posOptions).then(
   function success(position){
     $http.get("http://194.119.209.93/GeoFinder3/rest/llm/geofindTopicNearbyMap?lat=38.11&lng=13.36&id=test&radius=0.5").then(
       function success(response){
       var POIs = response.data;
       for(var i=0; i<POIs.length; i++) {
         loc = new L.latLng(POIs[i].lat, POIs[i].lng);
         bounds.push(loc);
         var marker = L.marker(loc).addTo(map);
         marker.bindPopup('<a class="popup-link" href="#/tab/map/'+POIs[i].id+'/'+POIs[i].label+'"><div class="prova" ><i class="icon ion-information button button-positive pop-icon"></i><span class="offset-text" id="popText">'+POIs[i].label+'</span></div></a>');
       }
       bounds = new L.LatLngBounds(bounds);
       map.fitBounds(bounds, {padding:[50,50]});
     }, function error(err){
       alert(JSON.stringify(err));
     })


  }, function error() {

    alert("Impossibile ricavare la posizione");

  });

  var interval;
  var pos;
  var scrollMax;
  var toleft;
  var popText;
  var alreadyShown;
  map.on('popupopen', function() {
    popText = angular.element(document.getElementById('popText'));
    scrollMax = 0;
    console.log(popText);
    var popContainer = popText[0].parentElement;
    if(popContainer.scrollWidth > popContainer.clientWidth){
      scrollMax = popContainer.clientWidth - popContainer.scrollWidth + 12;
      clearInterval(interval);
      pos = 10;
      alreadyShown = false;
      interval = setInterval(function(){
        if(pos===scrollMax) {
          toleft = false;
          alreadyShown = true;
        }
        if(pos===10){
          toleft = true;
          if(alreadyShown === true) {
            clearInterval(interval);
          }
        }
        if(toleft) {
          pos -= 0.5;
        }
        else {
          pos += 0.5;
        }
        popText.css("margin-left",pos+"px");
      }, 50);
    }
  });
  map.on('popupclose', function() {
    clearInterval(interval);
  });


});
