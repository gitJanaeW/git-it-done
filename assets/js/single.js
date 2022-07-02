var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");

var getRepoIssues = function(repo){
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl)
        .then(function(response){// again, .then() is Promise-based syntax that allows the rest of the code to run while and THEN comes back to perform this task with the fetch results later
            // request was successful
            if(response.ok){
                response.json().then(function(data){
                    console.log(data); // data represents the request information gathered and returned
                    // pass respnse fata to DOM function
                    displayIssues(data);

                    // check if api has paginated issues (ie. more results to look through than GitHub will allow you to fit on one page);
                    if(response.headers.get("Link")){ // If the headers section in DevTools specifies that the api has a Link to more paginated pages on GitHub
                        displayWarning(repo);
                    }
                });
            }
            else{
                // if not succesful redirect to the homepage
                document.location.replace("./index.html");
            }
        });
};

var getRepoName = function(){
    // Access the query parameter
    var queryString = document.location.search;
    // Split the query parameter and access only the query parameter value
    var repoName = queryString.split("=")[1];
    
    if(repoName){
        repoNameEl.textContent = repoName;
        // This repoName argument will complete the URL when passed into getRepoIssues
        getRepoIssues(repoName);

    }
    else{
        // If no repo was given, redirect to the homepage
        document.location.replace("./index.html");
    }    
} 

var displayIssues = function(issues){ // issues here is targeting the data that is passed in from the fetch api
    if(issues.length === 0){
        issueContainerEl.textContent = "This repo had no open issues.";
        return;
    }

    for(var i = 0; i < issues.length; i++){
        // create a link element ("a") to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        // create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;
        // append span to container
        issueEl.appendChild(titleEl);

        // create a type (either issue or pull request) element
        var typeEl = document.createElement("span");
        // If pull request, write pull request. Else, write issue
        if(issues[i].pull_request){
            typeEl.textContent = "(Pull request)";
        }
        else{
            typeEl.textContent = "(Issue)";
        }
        // append to container
        issueEl.appendChild(typeEl);
        // append to the DOM
        issueContainerEl.appendChild(issueEl);
    }
}

var displayWarning = function(repo){
    // add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";
    // link to the user's issue page
    var linkEl = document.createElement("a");
    linkEl.textContent = "GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    // append to warning container
    limitWarningEl.appendChild(linkEl);

};

getRepoName();