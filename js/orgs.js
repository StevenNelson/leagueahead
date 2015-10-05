var Orgs = (function(){

    var name = "",
        owner = "",
        leagues = [];
        
    return {
        display: function(orgs, parent){
                    for(var i = 0; i < orgs.length; i++) {
                        var newOrg = document.createElement('li');
                        newOrg.textContent = orgs[i]["Name"];
                        parent.appendChild(newOrg);
                    }
                 },
        displayList: function(list, parent){
                         for(var i = 0; i < list.length; i++){
                             var item = document.createElement('li');

                             var link = document.createElement('a');
                             link.href = list[i].key();
                             link.textContent = list[i]["Name"];
    };
}());
