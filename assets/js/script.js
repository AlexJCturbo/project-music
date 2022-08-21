let userGenreInput = document.getElementById("Input1");
let userArtistInput = document.getElementById("Input2");
let generalSearch = document.getElementById("general_Search");
let results = document.getElementById("resultsArea");

//music story developer (source https://developers.music-story.com/developers/genre)
let musicStoryURL = "https://api.music-story.com/en/genre/";

//lyrics.ovh API (source https://lyricsovh.docs.apiary.io/#)
let ovhURL = "https://api.lyrics.ovh/";

//musicbrainz.com API (source https://musicbrainz.org/doc/MusicBrainz_API#Application_rate_limiting_and_identification)
//let brainzURL = "https://musicbrainz.org/ws/2/genre/all?limit=100&offset=0&";

//lyrics.com request URL (source https://www.lyrics.com/lyrics_api.php)
//let lyricsURL = "https://www.stands4.com/services/v2/lyrics.php?";


//General search using the user parameters
generalSearch.addEventListener('click', function(event) {
    event.preventDefault();

    let search_Genre = userGenreInput.value.trim();
    let search_Artist = userArtistInput.value.trim();
    //let searchGenreArtist = search_Genre + search_Artist;
  
    let genreSearchURL = musicStoryURL + 'search?name=' + search_Genre;
    let artistSearchURL = ovhURL + 'suggest/' + search_Artist;

    if (!search_Genre){
        alert("Please select your favourite music genre.");
    }
    else if(!search_Artist){
        alert("Please enter an artist.");
    }
    else {
    console.log(genreSearchURL);
    console.log(artistSearchURL);
    
    produceResultsGenre(search_Genre);
    produceResultsArtist(search_Artist);
    }
})

//Function used to produce results based on the genre, using async function
async function produceResultsGenre(search_Genre) {
    let searchResultGenre = await fetch(`${musicStoryURL}search?name=${search_Genre}`);
    let genreData = await searchResultGenre.json();

    console.log(searchResultGenre);
    console.log(genreData);

    displayResults(artistGenre);
    }

//Function to display a list of the search results based on the artist
function displayResults(genreData) {
    results.innerHTML = `
        <div class = "songResults" id = "lyricsResults">
            ${genreData.data.map(genreOptions =>
            `<li>
                <div>
                    <br>
                    <p id="displayed_song">${genreOptions.artist.name} - ${genreOptions.title}</p>
                </div>

                <div>
                    <span id="lyrics_selection" artist_selected="${songOptions.artist.name}" song_selected="${songOptions.title}">Lyrics</span>
                </div>
            </li>
            `
            )
            .join('')
            }
        </div>`;
        
//    $('.songResults').css('list-style','none');
//    $('p#displayed_song').css('font-weight', 'bolder');
//    $('p#displayed_song').css('padding', '3px');
//    $('span#lyrics_selection').css('cursor', 'pointer');
//    $('span#lyrics_selection').css('color', 'white');
//    $('span').css('padding', '3px');
//    $('span').css('background', '#3a86a7aa');
//    $('span').css('border-radius', '4px');
}


/*
//Function to get the selected song from the API
results.addEventListener('click', selectedSong => {
    let clickedSong = selectedSong.target;

    if(clickedSong.tagName == 'SPAN'){
        let songArtist = clickedSong.getAttribute('artist_selected');
        let songName = clickedSong.getAttribute('song_selected');

        console.log(clickedSong);

        displayLyrics(songArtist, songName);
    }
}) 

//Function to display the lyrics of the selected song
async function displayLyrics(songArtist, songName){
    let lyricsSelected = await fetch(`${ovhURL}v1/${songArtist}/${songName}`);
    //console.log(lyricsSelected);

    const artistData = await lyricsSelected.json();
    console.log(artistData);
    //let artistData = await lyricsSelected.json();

    let finalLyrics = artistData.lyrics.replace(/(\r|\n|\r\n)/g, '<br>');
    //console.log(finalLyrics);

    results.innerHTML = `
        <h3>${songArtist} - ${songName}</h3>
        <p>${finalLyrics}</p>
    `;
}
*/




//Function used to produce results based on the artist, using async function for cleaner promises results from fetch asynchronous requests
async function produceResultsArtist(search_Artist) {
    let searchResultArtist = await fetch(`${ovhURL}suggest/${search_Artist}`);
    let artistData = await searchResultArtist.json();

    console.log(searchResultArtist);
    console.log(artistData);

    displayResults(artistData);
    }

//Function to display a list of the search results based on the artist
function displayResults(artistData) {
    results.innerHTML = `
        <div class = "songResults" id = "lyricsResults">
            ${artistData.data.map(songOptions =>
            `<li>
                <div>
                    <br>
                    <p id="displayed_song">${songOptions.artist.name} - ${songOptions.title}</p>
                </div>

                <div>
                    <span id="lyrics_selection" artist_selected="${songOptions.artist.name}" song_selected="${songOptions.title}">Lyrics</span>
                </div>
            </li>
            `
            )
            .join('')
            }
        </div>`;
        
    $('.songResults').css('list-style','none');
    $('p#displayed_song').css('font-weight', 'bolder');
    $('p#displayed_song').css('padding', '3px');
    $('span#lyrics_selection').css('cursor', 'pointer');
    $('span#lyrics_selection').css('color', 'white');
    $('span').css('padding', '3px');
    $('span').css('background', '#3a86a7aa');
    $('span').css('border-radius', '4px');
}

//Function to get the selected song from the API
results.addEventListener('click', selectedSong => {
    let clickedSong = selectedSong.target;

    if(clickedSong.tagName == 'SPAN'){
        let songArtist = clickedSong.getAttribute('artist_selected');
        let songName = clickedSong.getAttribute('song_selected');

        console.log(clickedSong);

        displayLyrics(songArtist, songName);
    }
}) 

//Function to display the lyrics of the selected song
async function displayLyrics(songArtist, songName){
    let lyricsSelected = await fetch(`${ovhURL}v1/${songArtist}/${songName}`);
    //console.log(lyricsSelected);

    const artistData = await lyricsSelected.json();
    console.log(artistData);
    //let artistData = await lyricsSelected.json();

    let finalLyrics = artistData.lyrics.replace(/(\r|\n|\r\n)/g, '<br>');
    //console.log(finalLyrics);

    results.innerHTML = `
        <h3>${songArtist} - ${songName}</h3>
        <p>${finalLyrics}</p>
    `;
}


/*
let userGenreInput = document.getElementById("Input1");
let userArtistInput = document.getElementById("Input2");
let generalSearch = document.getElementById("general_Search");
let results = document.getElementById("resultsArea");

//lyrics.ovh API (source https://lyricsovh.docs.apiary.io/#)
let ovhURL = "https://api.lyrics.ovh/";

//musicbrainz.com API (source https://musicbrainz.org/doc/MusicBrainz_API#Application_rate_limiting_and_identification)
let brainzURL = "https://musicbrainz.org/ws/2/genre/all?limit=100&offset=0&";

//lyrics.com request URL (source https://www.lyrics.com/lyrics_api.php)
let lyricsURL = "https://www.stands4.com/services/v2/lyrics.php?";


//General search using the user parameters
generalSearch.addEventListener('click', function(event) {
    event.preventDefault();

    let search_Genre = userGenreInput.value.trim();
    let search_Artist = userArtistInput.value.trim();
    //let searchGenreArtist = search_Genre + search_Artist;
  
    let genreSearchURL = brainzURL + search_Genre;
    let artistSearchURL = ovhURL + 'suggest/' + search_Artist;

    if (!search_Genre){
        alert("Please select your favourite music genre.");
    }
    else if(!search_Artist){
        alert("Please enter an artist.");
    }
    else {
    console.log(genreSearchURL);
    console.log(artistSearchURL);
    
    //produceResultsGenre(search_Genre);
    produceResultsArtist(search_Artist);
    }
})

//Function used to produce results based on the artist, using async function for cleaner promises results from fetch asynchronous requests
async function produceResultsArtist(search_Artist) {
    let searchResultArtist = await fetch(`${ovhURL}suggest/${search_Artist}`);
    let artistData = await searchResultArtist.json();

    console.log(searchResultArtist);
    console.log(artistData);

    displayResults(artistData);
    }

//Function to display a list of the search results based on the artist
function displayResults(artistData) {
    results.innerHTML = `
        <div class = "songResults" id = "lyricsResults">
            ${artistData.data.map(songOptions =>
            `<li>
                <div>
                    <br>
                    <p id="displayed_song">${songOptions.artist.name} - ${songOptions.title}</p>
                </div>

                <div>
                    <span id="lyrics_selection" artist_selected="${songOptions.artist.name}" song_selected="${songOptions.title}">Lyrics</span>
                </div>
            </li>
            `
            )
            .join('')
            }
        </div>`;
        
    $('.songResults').css('list-style','none');
    $('p#displayed_song').css('font-weight', 'bolder');
    $('p#displayed_song').css('padding', '3px');
    $('span#lyrics_selection').css('cursor', 'pointer');
    $('span#lyrics_selection').css('color', 'white');
    $('span').css('padding', '3px');
    $('span').css('background', '#3a86a7aa');
    $('span').css('border-radius', '4px');
}

//Function to get the selected song from the API
results.addEventListener('click', selectedSong => {
    let clickedSong = selectedSong.target;

    if(clickedSong.tagName == 'SPAN'){
        let songArtist = clickedSong.getAttribute('artist_selected');
        let songName = clickedSong.getAttribute('song_selected');

        console.log(clickedSong);

        displayLyrics(songArtist, songName);
    }
}) 

//Function to display the lyrics of the selected song
async function displayLyrics(songArtist, songName){
    let lyricsSelected = await fetch(`${ovhURL}v1/${songArtist}/${songName}`);
    //console.log(lyricsSelected);

    const artistData = await lyricsSelected.json();
    console.log(artistData);
    //let artistData = await lyricsSelected.json();

    let finalLyrics = artistData.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    //console.log(finalLyrics);

    results.innerHTML = `
        <h3>${songArtist} - ${songName}</h3>
        <p>${finalLyrics}</p>
    `;
}
*/
