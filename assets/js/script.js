/*
Required to create a client ID and a client secret to acces the API functions.
Users will require to log in with their credentials.
*/

//Declaring main variables
let clientID = '759e335a3c004201b865fb3dc4e468f7';
let clientSecret = '275b177fc27443a4abab912ee1717b5c';

let userGenreInput = document.getElementById("Input1");
let searchGenre = document.getElementById("searchGenreBtn");

let userSongInput = document.getElementById("Input2");
let searchSong = document.getElementById("searchSongBtn");

//Base URI for all Web API requests (https://developer.spotify.com/documentation/web-api/reference/#/)
let urlSpotifySearch = 'https://api.spotify.com/v1/search?q';
//For Artist (https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-artist)
let urlArtist = 'https://api.spotify.com/v1/artists/';

searchGenre.addEventListener("click", function (event) {
	event.preventDefault;
    
    let searchCriteria = userGenreInput.value;
    let searchQuery = urlSpotifySearch + searchCriteria;

    //console.log(searchQuery);
    fetch(searchQuery)
        .then(function(spotifyArtists){
            return spotifyArtists.json();
        })
        console.log(searchQuery);
})

