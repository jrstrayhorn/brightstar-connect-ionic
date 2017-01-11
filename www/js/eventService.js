angular.module('brightstarConnect').factory('eventService', ['$http', '$q', function($http, $q){

    var baseURL = 'http://10.0.0.31:3000';
    var apiUrl = '/api/events';
    var service = {};

    service.GetAll = GetAll;
    service.GetById = GetById;
    service.SaveRegistration = SaveRegistration;

    return service;

    function GetAll() {
        return $http.get(baseURL + apiUrl).then(handleSuccess, handleError);
    }

    function GetById(_id) {
        return $http.get(baseURL + apiUrl + '/' + _id).then(handleSuccess, handleError);
    }

    function SaveRegistration(_id, registration) {
        return $http.post(baseURL + apiUrl + '/' + _id + '/registrations', registration)
            .then(handleSuccess, handleError);
    }

    // private functions

    function handleSuccess(res) {
        return res.data;
    }

    function handleError(res) {
        return $q.reject(res.data);
    }
}]);