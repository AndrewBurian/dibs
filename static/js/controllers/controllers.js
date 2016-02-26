var controllers = angular.module('controllers',[])
// Login Controller -- This handles the login page that the user can enter
// enter his username & password.
controllers.controller('loginController', function($scope, $state,$location, LoginService){
    $scope.email = "test@test.com";
    $scope.password = "testPassword"
    $scope.loginFailure = false;

    $scope.$watch("email", function(newValue, oldValue) {
        console.log("EMAIL CHANGED!");
        console.log(newValue);
    });


    //Functions that should be run later
    $scope.login = function(){
        var data = ({email:$scope.email, password: $scope.password})
        LoginService.login(data).then(function(res){
            console.log(res);
            console.log(res.data.token);
            //Store the token into localStorage
            sessionStorage.token = res.data.token;
            console.log("GOING TO DASHBOARD!")
            $state.go('dashboard', {reload: true})

        })
        .catch(function(err){
            console.log("ERROR!");
            console.log(err);
            $scope.loginFailure = true;
            
        })  
    }
})

controllers.controller("testController", ['$scope', function($scope){
    console.log("AYY");
}])





//Directives & Associated Controllers


//For handling the navbar displayed when people are logged in.
controllers.controller('topNavController', ['$scope', function($scope){
    $scope.navigation = [{link: "logout", name: "Logout"}]
    $scope.test = "ayyy"
}]).directive('topnav', function() {
    return {
        templateUrl: 'views/partials/navigation.html'
    }
});

//Controls the sidebar on the left hand side.
controllers.controller('sidebarController', ['$scope', function($scope){
    $scope.navigation = [
        {link: "Resources", icon:"fa fa-table fa-fw", name:"Resources"}];
}]).directive('sidebar', function() {
    return {
        templateUrl: 'views/partials/sidebar.html'
    }
});