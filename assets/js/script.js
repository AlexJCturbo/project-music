
/*
//Spotify API
//Base URI for all Web API requests (https://developer.spotify.com/documentation/web-api/reference/#/)
let urlSpotifySearch = 'https://api.spotify.com/v1/search?q';
//For Artist (https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-artist)
let urlArtist = 'https://api.spotify.com/v1/artists/';
//Create a Playlist https://developer.spotify.com/documentation/web-api/reference/#/operations/create-playlist
let createListSpot = 'https://api.spotify.com/v1/users/{user_id}/playlists';

//Spotify authorization
let userSpotID = 'User_ID';
let callbackPage = 'https://alexjcturbo.github.io/project-music/callback';

let state = function generateRandomString(length){
    let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    var charLength = chars.length;
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
}

localStorage.setItem(stateKey, state);
let scope = 'user-read-private user-read-email';

let loginURL = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(userSpotID);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(callbackPage);
url += '&state=' + encodeURIComponent(state);
*/

//Declaring main variables
//let homePage = 'https://alexjcturbo.github.io/project-music/';

let userGenreInput = document.getElementById("Input1");
//let searchGenre = document.getElementById("searchGenreBtn");
let userArtistInput = document.getElementById("Input2");
//let searchArtist = document.getElementById("searchArtistBtn");
let generalSearch = document.getElementById('general_Search');
let results = document.getElementById('resultsArea');

//musicbrainz.com API (source https://musicbrainz.org/doc/MusicBrainz_API#Application_rate_limiting_and_identification)
let brainzURL = 'https://musicbrainz.org/ws/2/genre/';

//lyrics.ovh API (source https://lyricsovh.docs.apiary.io/#)
let ovhURL = 'https://api.lyrics.ovh/v1/';

//lyrics.com request URL (source https://www.lyrics.com/lyrics_api.php)
let lyricsURL = 'https://www.stands4.com/services/v2/lyrics.php';


//General search
generalSearch.addEventListener('click', function(event) {
    event.preventDefault();
    let search_Genre = userGenreInput.value.trim();
    let search_Artist = userArtistInput.value.trim();
    //let searchGenreArtist = search_Genre + search_Artist;

    let genreSearchURL = brainzURL + search_Genre;
    let artistSearchURL = ovhURL + search_Artist;

    if (!search_Genre){
        alert("Please select your favourite music genre.");
    }
    else if(!search_Artist){
        alert("Please enter an artist.");
    }
    else {
    console.log(genreSearchURL);
    console.log(artistSearchURL);

    produceResultsGenre (search_Genre);
    produceResultsArtist (search_Artist);
    }
})

//searchResults function
async function produceResultsGenre(search_Genre) {
    let searchResultGenre = await fetch()
    fetch(genreSearchURL)
    .then(function(){

    })

}

//search function for genre
//searchGenre.addEventListener("click", function (event) {
	//event.preventDefault();
    //using trim() to remove spaces on both ends
    //let search_Genre = userGenreInput.value.trim();

    //if (!search_Genre){
        //alert("Please select your favourite music genre.");
    //}
    //else {
        //let genreSearchURL = brainzURL + search_Genre;
        //console.log(genreSearchURL);
    //}
//});


//search function for artist
/*
searchArtist.addEventListener("click", function (event) {
	event.preventDefault();
    //using trim() to remove spaces on both ends
    let search_Artist = userArtistInput.value.trim();

    if (!search_Artist){
        alert("Please enter an artist.");
    }
    else {
        let artistSearchURL = ovhURL + search_Artist;
        console.log(artistSearchURL);
    }
});
*/
    

/*

    
    fetch(searchURL)
        .then(function(spotifyArtists){
            return spotifyArtists.json();
        })
        console.log(searchQuery);
})

searchArtist.addEventListener('click', function(event2){
    event2.preventDefault;
*/