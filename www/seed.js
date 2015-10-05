var SeedData = (function(ref){
    var fb = ref;
    function createOrgs(){
        var org1 = {
            Name: "Org One",
            Owner: "",
            Leagues:[]
        };
        var org2 = {
            Name: "Org Two",
            Owner: "",
            Leagues:[]
        };
        var orgRef = fb.child("Orgs");
        var org1Ref = orgRef.push(org1);
        var org2Ref = orgRef.push(org2);

        return [org1Ref, org2Ref];
    }

    function createLeagues(orgs, profiles){
        var league1 = {
            Name: "A League",
            Org: orgs[0].key(),
            Owner: profiles[0].key()
        };
        var league2 = {
            Name: "B League",
            Org: orgs[0].key(),
            Owner: profiles[1].key()
        };
        var league3 = {
            Name: "Red League",
            Org: orgs[1].key(),
            Owner: profiles[2].key()
        };
        var league4 = {
            Name: "Blue League",
            Org: orgs[1].key(),
            Owner: profiles[3].key()
        };
        
        var leagueRef = fb.child("leagues");
        var l1Ref = leagueRef.push(league1);
        var l2Ref = leagueRef.push(league2);
        var l3Ref = leagueRef.push(league3);
        var l4Ref = leagueRef.push(league4);

        return [l1Ref, l2Ref, l3Ref, l4Ref];
    }

    function createDivisions(leagues, profiles){
        var d1 = {
            Name: "D1",
            League: leagues[0].key(),
            Owner: profiles[0].key(),
            Teams: []
        }; 
        var d1 = {
            Name: "D1",
            League: leagues[0].key(),
            Owner: profiles[0].key(),
            Teams: []
        }; 
        var d1 = {
            Name: "D1",
            League: leagues[0].key(),
            Owner: profiles[0].key(),
            Teams: []
        }; 
        var d1 = {
            Name: "D1",
            League: leagues[0].key(),
            Owner: profiles[0].key(),
            Teams: []
        }; 
        var d1 = {
            Name: "D1",
            League: leagues[0].key(),
            Owner: profiles[0].key(),
            Teams: []
        }; 
        var d1 = {
            Name: "D1",
            League: leagues[0].key(),
            Owner: profiles[0].key(),
            Teams: []
        }; 
        var d1 = {
            Name: "D1",
            League: leagues[0].key(),
            Owner: profiles[0].key(),
            Teams: []
        }; 
    }
}    

// Slice off then people for org owners
var orgs = [];
var orgRef = fb.child("Orgs");
var leagues = [];
var divisions = [];
var teams = [];
var Facilities = [];

for ( var o = 0; o < orgs.length; o++){
    orgs[0].Owner = People.splice(0,1);
    


