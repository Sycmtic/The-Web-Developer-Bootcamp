// store objects in an array
var movieDB = [
{watch: true, name: "In Bruges", rate: 5}, 
{watch: false, name: "Frozen", rate: 4.5}, 
{watch: true, name: "Mad Max Fury Road", rate: 5}, 
{watch: false, name: "Les Miserables", rate: 3.5}];

function printMovie(movie) {
	var result = "You have";
	if (movie.watch) {
		result += " watched";
	} else {
		result += " not seen";
	}
	result += " \"" + movie.name + "\" - " + movie.rate + " stars";
	return result;
}

// using forEach to get through all elements in movieDB array
movieDB.forEach(function(movie) {
	console.log(printMovie(movie));
});