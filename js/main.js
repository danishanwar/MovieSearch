$(document).ready(() => {
	$('#searchForm').on('submit', (e) => {
		let searchText = $('#searchText').val();
		getMovies(searchText);
		e.preventDefault();
	});
});

function getMovies(searchText) {
    // Make a request to the URL 
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=ee44b9cc5e9cd76137f0d4c9b719e770&query='+searchText)
    .then(function (response) {
        var movies = response.data.results;
        console.log(movies);
        var output = '';
        $.each(movies, function(index, movie){
            output += '<div class="col-md-3">';
            output +=   '<div class="well text-center">';
            output +=       '<img src="http://image.tmdb.org/t/p/w185/'+movie.poster_path+'">';
            output +=       '<h5>'+ movie.title+'</h5>';
            output +=       '<a onclick="movieSelected('+movie.id+')" class="btn btn-primary" href="movie.html">Movie Details</a>';
            output +=   '</div>';
            output += '</div>';
        });

        $('#movies').html(output);

    })
    .catch(function (error) {
        console.log(error);
        console.log('something is going wrong');
    });
}﻿

function movieSelected(id){
	sessionStorage.setItem('ID', id);
	// window.location = 'movie.html';
	return false;
}

function getMovie(){
	let movieId = sessionStorage.getItem('ID');
	console.log("World");
	axios.get('https://api.themoviedb.org/3/movie/'+movieId+'?api_key=ee44b9cc5e9cd76137f0d4c9b719e770')
    .then(function (response) {
        let movie = response.data;

        let output = `
        	<div class="row">
                <div class="col-md-4 imagePoster">
                   <img src="http://image.tmdb.org/t/p/w185/${movie.poster_path}" class="thumbnail">
                </div>
                <div class="col-md-8">
               		<h2>${movie.title}</h2>
               		<ul class="list-group">
               			<li class="list-group-item"><strong>Genre: </strong> ${movie.genres.map(function(k){return k.name}).join(" , ")	}</li>
               			<li class="list-group-item"><strong>Released On: </strong> ${movie.release_date}</li>
             			<li class="list-group-item"><strong>Original Title: </strong> ${movie.original_title}</li>	
               			<li class="list-group-item"><strong>Budget: </strong>  $${movie.budget}</li>
               			<li class="list-group-item"><strong>Running Time: </strong> ${movie.runtime}</li>
               			<li class="list-group-item"><strong>TagLine: </strong> ${movie.tagline}</li>
               			<li class="list-group-item"><strong>Country: </strong> ${movie.production_countries.map(function(k){return k.name}).join(" , ")}</li>
               			<li class="list-group-item"><strong>Producers: </strong> ${movie.production_companies.map(function(k){return k.name}).join(" , ")}</li>
               		</ul>
            </div>
            
            	<h3>Plot</h3>
            	${movie.overview}
            	<hr>
            	<a href="index.html" class="btn btn-default">Go Back to Search</a>
           	
        `;
        	


        $('#movies').html(output);
    })
    .catch(function (error) {
        console.log(error);
        console.log('something is going wrong');
    });
};