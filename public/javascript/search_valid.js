const regularExpression = /^\s*\w+\s+\w+\s*$/;
document.addEventListener("DOMContentLoaded", function() {
    const search = document.querySelector("div.logo-search input");
    const searchButton = document.querySelector("div.logo-search button");
    
    search.addEventListener("keyup", (e) => {
        console.log(isValid(search));
    });

    searchButton.addEventListener("click", (e) => {
        console.log("search button clicked");
        const fieldValue = search.style.color;
        if (fieldValue == "red") {
            console.log("Invalid search query: Format must be comma seperated words")
            alert("Invalid search query: Must be \"Artist Song\"");
            e.preventDefault();
        }
    });
});

function isValid(search){
    if(regularExpression.test(search.value)){
        search.style.color = "black";
    }
    else{
        search.style.color = "red";
    }
}