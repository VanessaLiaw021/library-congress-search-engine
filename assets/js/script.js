//https://www.loc.gov/search/?q=baseball&fo=json no format
//https://www.loc.gov/collections/civil-war-maps?fo=json with format

var searchResultElement = document.querySelector("#search-results");
var searchInput = document.querySelector("#q");
var formatInput = document.querySelector("#format");
var searchForm = document.querySelector("#loc-search-form");

//Function that fetch the api and get the required content
var getSearchResults = function(q, format) {
    var searchURL;

    //If user set a format in dropdown it will read this url, else read the other url if only search happen
    if (format) {

        searchURL = `https://www.loc.gov/${format}/?q=${q}&fo=json`;

    } else {

        searchURL = `https://www.loc.gov/search/?q=${q}&fo=json`;
    }

    fetch(searchURL)

        //Return the api as a json 
        .then(function(response) {
            return response.json();
        })

        //Do something with the api 
        .then(function(data) {

            //Clear the html page
            searchResultElement.innerHTML = null;

            //Loop through each results and for each result, create an article element and content inside
            for (var result of data.results) {
                
                //Create Element
                var articleElement = document.createElement("article");
                var titleElement = document.createElement("h3");
                var paragraphElement = document.createElement("p");
                var buttonElement = document.createElement("a");

                //Assign class name to element
                articleElement.className = "card p-4 bg-dark text-light my-3";
                buttonElement.className = "btn btn-light text-dark";

                //Get each value from api 
                titleElement.textContent = result.title;
                paragraphElement.textContent = result.description[0];
                buttonElement.textContent = "Learn More";
                buttonElement.href = result.url;
                buttonElement.target = "_blank";

                //Append the title, paragraph, and button to article tag
                articleElement.append(titleElement, paragraphElement, buttonElement);

                //Appdn the article element to the search result element div 
                searchResultElement.append(articleElement);
            }
        });
}

//Main function (Init)
var init = function() {

    //If something has value 
    if (location.search) {

        var url = new URL(location.href);
        var q = url.searchParams.get("q");
        var format = url.searchParams.get("format");
        getSearchResults(q, format);
    }
}

//Function that handle submit form
var handleSearch = function(event) {

    //Prevent any default action
    event.preventDefault();

    //Get the value of the user input
    var input = searchInput.value.trim();
    var format = formatInput.value;

    if (!input) return;

    //If the search result existed
    if (searchResultElement) {

        //Call the function to get search results
        getSearchResults(input, format);

    } else {

        //Redirect user to the search result html
        location.replace("search-result.html?q=" + input + "&format=" + format);
    }
}

//Add event listener for the form
searchForm.addEventListener("submit", handleSearch);

init();