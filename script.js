//Creating arrays to organize and store search results
let jobTitles = [];
let jobLocations = [];
let jobTypes = [];
let jobCompanies = [];
let jobDescriptions = [];

$("#submitBtn").click(function(e){
    e.preventDefault();

    //Empty results div with each new search
    $("#results").empty();

    //Empty job arrays with each new search
    jobTitles = [];
    jobLocations = [];
    jobTypes = [];
    jobCompanies = [];
    jobDescriptions = [];

    //Invoke runSearch function
    runSearch();
});

//Function to run search
function runSearch(){
    //GitHub Jobs

    //Variable will dynamically change based on user input
    let jobType = $("#keywords").val();
    
    console.log(jobType);

    var queryURLJobs = `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${jobType}&page=1`

    console.log('query is: ', queryURLJobs);

    //AJAX Call to GitHub Jobs API
    $.ajax({
        url: queryURLJobs,
        method: "GET",
    }).then(function(response) {
        //console.log(response);

        //let description = response[0].description;

        //let smallDescription = description.slice(0, 128);

        //For loop to run through first five jobs that come up
        for(var i = 0; i < 5; i++) {
            let titles = response[i].title;
            jobTitles.push(titles);
            
            let location = response[i].location;
            jobLocations.push(location);
            
            let type = response[i].type;
            jobTypes.push(type);

            let company = response[i].company;
            jobCompanies.push(company);

            let description = response[i].description;
            jobDescriptions.push(description);

            //GNews

            //Take company from GitHub Jobs API and use it to run search on GNews API
            let query = company;

            let token = "561ded44bea85bd1b3058e9aeb6484da";

            let queryURLNews = "https://gnews.io/api/v3/search?q=" + query + "&token=" + token;

            //AJAX Call to GNews API
            $.ajax({
                url: queryURLNews,
                method: "GET"
            }).then(function(response) {
                console.log(response);
            });
        };

        //Populating HTML elements with data from GitHub Jobs API
        for (var i = 0; i < 5; i++){
            //Create an h1 for every job title
            let resultTitles = $("<h1>");
    
            //Create h5 for every job location
            let resultLocation = $("<h5>");
    
            //Create h5 for every job type
            let resultType = $("<h5>");
    
            //Create h5 for every job company
            let resultCompany = $("<h5>");
    
            //Create p for every job description
            let resultDescription = $("<p>");
    
            //Populate each h1 with the job titles in jobTitles array
            resultTitles.text(jobTitles[i]);
    
            //Populate each h5 with the job locations in jobLocations array
            resultLocation.text("Location: " + jobLocations[i]);
    
            //Populate each h5 with the job type in jobTypes array
            resultType.text("Type: " + jobTypes[i]);
    
            //Populate each h5 with the job company in jobCompanies array
            resultCompany.text("Company: " + jobCompanies[i]);
    
            //Populate each p with the job description in jobDescriptions array
            resultDescription.append("Description: " + jobDescriptions[i]);
    
            //Append to the results div
            $("#results").append(resultTitles);
            $("#results").append(resultLocation);
            $("#results").append(resultType);
            $("#results").append(resultCompany);
            $("#results").append(resultDescription);
        };
    });
};
