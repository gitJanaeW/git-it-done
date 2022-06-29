var getUserRepos = function(user){
    // Format the github api url
    var apiUrl = "https:api.github.com/users/" + user + "/repos";
    // make a rewuest to the url
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){ // .json() will format the response as JSON. To return non-JSON data, use text()
            console.log(data);
        });
    });
};

getUserRepos("gitJanaeW");

console.log("outsite");