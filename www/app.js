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
                    toastr.info("There was a problem logging in. Try again");
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
    if($("orgForm")){
        $("orgForm").submit( function(e){
            e.preventDefault();
            var orgRef = fb.child("Orgs");

            var newOrg = {
                Name: document.getElementById("orgName").value,
                Owner: document.getElementById("orgOwner").value,
            Contact: document.getElementById("orgContact").value
            };

            orgRef.push(newOrg);
        });
    }
    if($("#signupForm")) {
        $("#signupForm").submit(function(e){
            e.preventDefault();
            fb.createUser({
                email: $("#newUser").val(),
                password: $("#newPass").val()
            }, function(error, userData) {
                if (error) {
                    toastr.info("Signup Failed");
                    console.log(error);
                } else {
                    fb.authWithPassword({
                        email: $("#newUser").val(),
                        password: $("#newPass").val()
                    }, function (error, userData){
                        if (error) {
                            toastr.info("Logging in failed");
                            console.log(error);
                        } else {
                            location.href = "profile.html";
                        }
                    });
                }
            });
        });
    }
    fb.onAuth(authDataCallback);
    //setTimeout(authDataCallback, 0);
});
function authDataCallback(userData) {
    //var userData = fb.getAuth();
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
