let userGenreInput = document.getElementById("Input1");
let userArtistInput = document.getElementById("Input2");
let generalSearch = document.getElementById("general_Search");
let results = document.getElementById("resultsArea");

//musicbrainz.com API (source https://musicbrainz.org/doc/MusicBrainz_API#Application_rate_limiting_and_identification)
let brainzURL = "https://musicbrainz.org/ws/2/genre/";

//lyrics.ovh API (source https://lyricsovh.docs.apiary.io/#)
let ovhURL = "https://api.lyrics.ovh/";

//lyrics.com request URL (source https://www.lyrics.com/lyrics_api.php)
let lyricsURL = "https://www.stands4.com/services/v2/lyrics.php";

//General search using the user parameters
generalSearch.addEventListener("click", function (event) {
  event.preventDefault();
  let search_Genre = userGenreInput.value.trim();
  let search_Artist = userArtistInput.value.trim();
  //let searchGenreArtist = search_Genre + search_Artist;

  let genreSearchURL = brainzURL + search_Genre;
  let artistSearchURL = ovhURL + search_Artist;

  if (!search_Genre) {
    alert("Please select your favourite music genre.");
  } else if (!search_Artist) {
    alert("Please enter an artist.");
  } else {
    console.log(genreSearchURL);
    console.log(artistSearchURL);

    //produceResultsGenre(search_Genre);
    produceResultsGenre(search_Artist);
  }
});

//Function used to produce results based on the artist, using async function for cleaner promises results from fetch asynchronous requests
async function produceResultsGenre(search_Artist) {
  let searchResultArtist = await fetch(`${ovhURL}suggest/${search_Artist}`);
  let artistData = await searchResultArtist.json();

  console.log(searchResultArtist);
  console.log(artistData);

  //function to display the results from the search
  displayResults(artistData);
}

//Function to display a list of results based on the artist
function displayResults(artistData) {
  results.innerHTML = `
    <div class = "songResults" id = "lyrics">
        ${artistData.data
          .map(
            (songOptions) => `
            <li>
               <div>
                   <p id="displayed_song">${songOptions.artist.name} - ${songOptions.title}</p>
               </div>

              <div>
                <span id="lyrics_selection" artist_selected="${songOptions.artist.name}" song_selected="${songOptions.title}">Lyrics</span>
              </div>
            </li>
            `
          )
          .join()}
    </div>
    `;
  $(".songResults").css("list-style", "none");
  $("p#displayed_song").css("font-weight", "bolder");
  $("span#lyrics_selection").css("cursor", "pointer");
}

//Function to define the lyrics that will be displayed
results.addEventListener("click", (selectedSong) => {
  let clickedSong = selectedSong.target;

  if (clickedSong.tagName === "SPAN") {
    let songArtist = clickedSong.getAttribute("artist_selected");
    let songName = clickedSong.getAttribute("song_selected");

    console.log(clickedSong);

    displayLyrics(songArtist, songName);
  }
});

async function displayLyrics(songArtist, songName) {
  let searchResultArtist = await fetch(
    `${ovhURL}/v1/${songArtist}/${songName}`
  );
  console.log(searchResultArtist);

  const artistData = await searchResultArtist.json();
  console.log(artistData);
  //let artistData = await searchResultArtist.json();

  let finalLyrics = artistData.lyrics.replace(/n/, "<br>");
  //console.log(finalLyrics);

  results.innerHTML = `
        <h3>${songArtist} - ${songName}</h3>
        <p>${finalLyrics}</p>
    `;
}

// background ambient music
var mysong = document.getElementById("mysong");
var icon = document.getElementById("icon");

icon.onclick = function () {
  if (mysong.paused) {
    mysong.play();
    icon.src = "./assets/images/pause.png";
  } else {
    mysong.pause();
    icon.src = "./assets/images/play.png";
  }
};

// modal function
var modal = document.createElement("modal-content");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
  modal.style.display = "fixed";
};
span.onclick = function () {
  modal.style.display = "none";
};
modal.style.top = "0";
modal.style.left = "0";
modal.style.width = "100%";
modal.style.height = "100%";
modal.style.backgroundColor = "rgba(0,0,0,0.5)";
modal.style.zIndex = "100";
modal.innerHTML =
  '<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: grey; padding: 20px;"><h1>How the site works</h1><p>Combine your favourite genre with a lyric of your choice and we will recommend a song!</p></div>';
document.body.appendChild(modal);
modal.addEventListener("click", function () {
  document.body.removeChild(modal);
});
