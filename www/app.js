var fb = new Firebase("https://glowing-torch-5748.firebaseio.com/");
var LA = (function(){
		
    var Division = function(){
        return {
            "league":"",
            "name": "",
            "owner": "",
            "teams": []
        };
    };
    var Facility = function(){
        return {
            "name": "",
            "address": ""
        };
    };
    var League = function(){
        return {
            "name": "",
            "organization": "",
            "owner": "",
            "facilities": []
        };
    };
    var Org = function(){
        return {
            "name": "",
            "owner": "",
            "leagues": [],
            renderRow: function(){
                var row = document.createElement("tr");
                var nameCell = document.createElement("td");
                var ownerCell = document.createElement("td");
                
                nameCell.innerHTML = name;
                ownerCell.innerHTML = owner;
                row.appendChild(nameCell);
                row.appendChild(ownerCell);

                return row;
            }
        };
    };
    var OrgList = function(orgs){
        orgs = orgs || [];
        return{
            render: function(){
                var box = document.createElement("div");
                box.className = "table-scroll";

                var table = document.createElement("table");
                table.className = "table";
                var tableHead = document.createElement("thead");
                var tableBody = document.createElement("tbody");
                
                tableHead.innerHTML = "<tr><th>Org Name</th><th>Org President</th></tr>"
                for( var i = 0; i < orgs.length; i++){
                    tableBody.appendChild(orgs[i].render());
                }
                table.appendChild(tableHead);
                box.appendChild(table);
            }
        };
    };
    var People = function(){
        return {
            "name": "",
            "dob": "",
            "phone": "",
            "teams": [],
            "divisions": [],
            "leagues": [],
            "orgs": []
        };
    };
    var Team = function(){
        return {
            "name": "",
            "divisions": [],
            "owner": ""
        };
    };
}());

$(function(){
    
    if($("#loginForm")){
        $("#loginForm").submit( function(e){
            e.preventDefault();
            fb.authWithPassword({
                email: $("#user").val(),
                password: $("#pass").val()
            }, function (error, userData) {
                if (error) {
                    toastr.warning("There was a problem logging in. Try again");
                    console.log(error);
                } else {
                    location.href = "profile.html";
                }
            });
        });
    }
    if($("#logoutButton")){
        $("#logoutButton").click(function(){
            fb.unauth();
        });
    }
    $("#orgForm").submit( function(e){
        e.preventDefault();
        var orgRef = fb.child("Orgs");
        
        var userData = fb.getAuth();
        if(userData){
            var newOrg = {
                Name: $("#orgName").val(),
                Owner: userData.uid, 
                Contact: $("#orgContact").val()
            };

            orgRef.push(newOrg);
            toastr.success("Organization Created");
        } else {
            toastr.warning("Authentication Error");
        }

    });

    $("#signupForm").submit(function(e){
        e.preventDefault();
        fb.createUser({ // Create the User
            email: $("#newUser").val(),
            password: $("#newPass").val()
        }, function(error, userData) {
            // Answer the callback after user creation
            if (error) {
                toastr.error("Signup Failed");
            console.log(error);
            } else {
                // Assuming successful user creation, log them in
                fb.authWithPassword({
                    email: $("#newUser").val(),
                    password: $("#newPass").val()
                }, function (error, userData){
                    // Acknowledge the case where they may sign up, but fail
                    // to log in
                    if (error) {
                        toastr.error("Logging in failed");
                        console.log(error);
                    } else {
                        location.href = "profile.html";
                    }
                });
            }
        });
    });

    fb.onAuth(authDataCallback);
});
function authDataCallback(userData) {
    if(userData) {
        $("#authButton").text("Logout");
        $("#authButton").click(logout);        
    } else {
        $("#authButton").attr("href", "login.html");
        $("#authButton").text("Login");
    }
}
function logout(e){
    e.preventDefault();
    fb.unauth();
    location.href = "index.html";
}
