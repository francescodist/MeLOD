angular.module('starter.services', [])

.factory('Categories', function($http, $cordovaGeolocation) {
  // Might use a resource here that returns a JSON array
  var result = {response: null};
  //$cordovaGeolocation.getCurrentPosition(5000).then(
  //  function success(){

    $http.get("https://crossorigin.me/http://194.119.209.93/GeoFinder3/rest/llm/geofindTopicNearby?lat=41.9038&lng=12.4433279&id=demo&radius=0.4").then(
      function success(data){

      result.response = data;

    }, function error(err){

      alert("Errore caricamento dati.");

    })

//  }, function error() {

  //  alert("Impossibile ricavare la posizione")

  //});


  return result;
})
.factory('POIs', function($http, $cordovaGeolocation) {
  // Might use a resource here that returns a JSON array
  var result = {response: null};
  //$cordovaGeolocation.getCurrentPosition(5000).then(
  //  function success(){
  return {
    get : function(id){
      result.response = null;
      console.log(id);
      $http.get("https://crossorigin.me/http://194.119.209.93/GeoFinder3/rest/llm/geofindPOINearbyTest?lat=41.9038&lng=12.4433279&id=test&idcat="+id).then(
      function success(data){
        console.log(id);
        console.log(data);
      result.response = data;


    }, function error(err){

      alert("Errore caricamento dati.");

    })
  },
  response: result
}

//  }, function error() {

  //  alert("Impossibile ricavare la posizione")

  //});



})




.factory('POI', function($http, $cordovaGeolocation) {
  // Might use a resource here that returns a JSON array
  var result = {response: null};
  //$cordovaGeolocation.getCurrentPosition(5000).then(
  //  function success(){
  return {
    get : function(id){
      result.response=null;
      console.log(id);
      $http.get("https://crossorigin.me/http://194.119.209.93/GeoFinder3/rest/llm/infoPOI?lat=38.11&lng=13.36&id=test&idpoi="+id).then(
      function success(data){
        console.log(id);
        console.log(data);
      result.response = data;


    }, function error(err){

      alert("Errore caricamento dati.");

    })
  },
  response: result
}

//  }, function error() {

  //  alert("Impossibile ricavare la posizione")

  //});



});
