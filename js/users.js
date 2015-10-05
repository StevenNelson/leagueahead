var Users = function(fb) {

    var currentUser = null,
        userCheckComplete = false,
        authCallbacks = [];

    function authCallback(userData) {
        currentUser = userData;
        userCheckComplete = true;
        authCallbacks.forEach(verifyAuthedUser);
    };

    function verifyAuthedUser(callback) {
        if (userData) {
            callback(userData);
        } else {
            location.href = "/login.html";
            return;
        }
    }

    function registerNewUser(username, password) {
        fb.createUser({
            email: username,
            password: password
        }, function(error, userData) {
            if (error) {
                toastr.error("Signup Failed");
                console.log(error);
            } else {
                loginUser(username, password, setupNewPerson);
                location.href = "/user/profile.html"
            }
        });
    }

    function loginUser(username, password, callback) {
        fb.authWithPassword(username, password, function(error, userData) {
            if (error) {
                toastr.error("Error Logging in");
                console.log(error);
            } else {
                callback(userData);
            }
        });
    }

    function setupNewPerson(userData) {
        // Create a user object
        var userRef = fb.child("Users/" + userData.uid);
        var user = {
            Teams: [],
            Leagues: [],
            Orgs: [],
            Divisions: []
        };
        userRef.set(user);
    }


    fb.onAuth(authCallback);

    return {
        getUserId: function() {
            if (currentUser == null) {
                return null;
            } else {
                return currentUser.uid;
            }
        },
        loadSecuredPage: function(callback) {
            if (userCheckComplete) {
                verifyAuthedUser(callback);
            } else {
                authCallbacks.push(callback);
            }
        },
        logout: function() {
            fb.unauth();
            location.href = "/index.html";
        },
        newUser: function(username, passsword) {
            registerNewUser(username, password);
        }

    };
};
