// from data.js
var tableData = data;

// YOUR CODE HERE!

// Viewing the available data fromt he data.js
// console.log(tableData);


// Creating References
var $tbody = d3.select("tbody");
var button = d3.select("#filter-btn");
var inputFieldDate = d3.select("#datetime");
var inputFieldCity = d3.select("#city");

var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]
    // console.log(columns);



// Inputing the data into the HTML
var addData = (dataInput) => {
    dataInput.forEach(ufoSightings => {
        var row = $tbody.append("tr");
        columns.forEach(column => row.append("td").text(ufoSightings[column]))
    });
}

addData(tableData);


// Create an Event Listener for the Button
// Set up Filter Button for Date and City
button.on("click", () => {

    d3.event.preventDefault();


    var inputDate = inputFieldDate.property("value").trim();
    // console.log(inputDate)
    // https://www.w3schools.com/jsref/jsref_tolowercase.asp
    var inputCity = inputFieldCity.property("value").toLowerCase().trim();
    // console.log(inputCity)

    var filterDate = tableData.filter(tableData => tableData.datetime === inputDate);
    // console.log(filterDate)
    var filterCity = tableData.filter(tableData => tableData.city === inputCity);
    // console.log(filterCity)

    var filterCombinedData = tableData.filter(tableData => tableData.datetime === inputDate && tableData.city === inputCity);
    // console.log(filterCombinedData)

    $tbody.html("");

    let response = {
        filterDate,
        filterCity,
        filterCombinedData
    }

    if (response.filterCombinedData.length !== 0) {
        addData(filterCombinedData);
    } else if (response.filterCombinedData.length === 0 && ((response.filterDate.length !== 0 || response.filterCity.length !== 0))) {
        addData(filterDate) || addData(filterCity);
    } else {
        $tbody.append("tr").append("td").text("No Little Green Men Here! Keep Searching: ");
    }
})