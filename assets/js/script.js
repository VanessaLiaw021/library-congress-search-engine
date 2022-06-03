//https://www.loc.gov/search/?q=baseball&fo=json no format
//https://www.loc.gov/collections/civil-war-maps?fo=json with format

/* <artcle class="card bg-dark text-light p-4">
        <h3>Story Title</h3>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit repudiandae in mollitia quia 
            quaerat nulla magnam, optio aut repellendus praesentium ab cupiditate, ipsum exercitationem aperiam 
            voluptatem? Debitis magnam placeat incidunt.
        </p>
        <button class="btn btn-light text-dark">Read More</button>
    </artcle> 
*/

var searchResultElement = document.querySelector("#search-results");

var getSearchResults = function() {
    var fetchURL = "https://www.loc.gov/search/?q=baseball&fo=json";

    fetch(fetchURL)

        //Return the api as a json 
        .then(function(response) {
            return response.json();
        })

        //Do something with the api 
        .then(function(data) {

            //Clear the html page
            searchResultElement.innerHTML = null;

            for (var result of data.results) {
                
                //Create Element
                var articleElement = document.createElement("article");
                var titleElement = document.createElement("h3");
                var paragraphElement = document.createElement("p");
                var buttonElement = document.createElement("button");

                //Assign class name to element
                articleElement.className = "card p-4 bg-dark text-light my-3";
                buttonElement.className = "btn btn-light text-dark";

                //Get each value from api 
                titleElement.textContent = result.title;
                paragraphElement.textContent = result.description[0];
                buttonElement.textContent = "Learn More";

                //Append the title, paragraph, and button to article tag
                articleElement.append(titleElement, paragraphElement, buttonElement);

                //Appdn the article element to the search result element div 
                searchResultElement.append(articleElement);
            }
        });
}

//Main function (Init)
var init = function() {

    getSearchResults();
}

init();