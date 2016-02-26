var services = angular.module('services',[])

//Invoked when someone tries to login.
services.factory('LoginService', ['$http', function($http) {

    return {
       login: function(data){
        return $http.post('/authenticate', data);
        //Add into rootscope here
        console.log("ADD INTO THE ROOT SCOPE HERE!");
        console.log(data):
       }
    }       

}]);

//Used to get the users permissions.
user.factory('User', function userFactory(){
    
    var User = new Object();
    //Check if a user is logged by checking if a Key exists in session storage.
    if(sessionStorage.token){
        User.loggedIn = true;
        console.log("User's value changed!")
    }


    return User;
})

//Used to get the users info. Makes a call to the memberInfo API and returns the person's information.
//Then it also sets it in the $rootScope so that it can be used from elsewhere.
services.factory('userInfoService', ['$http','SetRootScopeService',function($http,SetRootScopeService) {
    return {
    	fetch: function(data){
    		//console.log(sessionStorage.token);
            
             $http.get('/memberinfo', {headers: {'Authorization': sessionStorage.token}})
             .then(function(val){
                SetRootScopeService.setRootScopeValue("User",val.data);
                return val.data;
             })
             .catch(function(err){
                console.log(err);
             })

	       }
    }

}]);








