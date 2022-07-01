var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var getUserRepos = function(user){
    // Format the github api url
    var apiUrl = "https:api.github.com/users/" + user + "/repos";
    // make a rewuest to the url
    fetch(apiUrl)
        .then(function(response){
            // If the status code is 200 (if the request came back ok)...
            if(response.ok){
                response.json().then(function(data){ // .json() will format the response as JSON. To return non-JSON data, use text()
                    // Send repos and username search to display repos 
                    displayRepos(data, user);
                });
            }
            else{ // Send error message
                alert("Error: GitHub User Not Found");
            }
    })
        .catch(function(error){
            // NOTE: this .catch() is chained to the end of the .then() method
            alert("Unable to connect to GitHub.");
        });

    if(repos.length === 0){
    repoContainerEl.textContent - "No repositories found.";
    return;
    }
};

var formSubmitHandler = function(event){
    event.preventDefault();
    // get value from input element
    var username = nameInputEl.value.trim();

    // If username has a value
    if(username){
        // Search for user's repos
        getUserRepos(username);
        // Clear input field
        nameInputEl.value = "";
    }
    else{
        alert("Please enter a GitHub username");
    }
}

var displayRepos = function(repos, searchTerm){
    console.log(repos);
    console.log(searchTerm);
    // reset and print the user search
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    // loop over repos
    for (var i = 0; i < repos.length; i++){
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;
        // append to container
        repoEl.appendChild(titleEl);
        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";
        // check if current repo has issues or not
        if(repos[i].open_issues_count > 0){
            statusEl.innerHTML =
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issues(s)";
        }
        else{
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container
        repoEl.appendChild(statusEl);
        // append container to the DOM
        repoContainerEl.appendChild(repoEl);
    }
}

userFormEl.addEventListener("submit", formSubmitHandler);