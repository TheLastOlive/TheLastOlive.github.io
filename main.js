
// assorted global variables - horrible practice
var pressable = true;
var allPoints = 0;

var songClip;
var paused = true;

var duration = 4;


// constants
const BASE_DURATION = 2;
const MAX_DURATION = 6;
const DURATION_INCREASE = 2;

const POINTS_TAKEN_FOR_DURATION_INCREASE = 3;
const AUDIO_SLIDER_WIDTH_INCREASE = 30;

const BASE_AUDIO_SLIDER_WIDTH = 15;


begin();

function begin()
{
    var body = document.body.id;

    switch(body)
    {
        case "search":
            searchInit();
            break;
        case "game":
            gameInit();
            break;
        case "gameOver":
            gameOverInit();
            break;
    }
}

function gameOverInit()
{
    const finalPointTotalDisplay = document.getElementById("finalPointTotal");
    const possiblePointDisplay = document.getElementById("possiblePoints");
    const personalMessageDisplay = document.getElementById("personalizedMessage");
    const header = document.getElementById("head");

    let finalPoints = Number(window.sessionStorage.getItem("allPoints"));
    let index = Number(window.sessionStorage.getItem("currentSong"));
    let artistName = window.sessionStorage.getItem("artistName");

    head.textContent = artistName;

    if(finalPoints == null)finalPoints = 0;

    console.log(index);

    finalPointTotalDisplay.textContent = finalPoints;
    possiblePointDisplay.textContent = Math.min(10*index, 100);

    let message = "&nbsp&nbsp";

    if(finalPoints === 0)
    {
        message += "Wow. I... Uh... Why did you even pick this? I'm just gonna assume it was a misclick. And that you then played the game all the way through, I guess. Strange.";
    }
    else if(finalPoints < 20)
    {
        message += "Hmmm. Well, hey. I'm sure you tried your best. Maybe try listening to more than just the hits next time?";
    }else if(finalPoints < 40)
    {
        message += "Hey, you know what? That's not that bad. It's bad, sure. But it's not THAT bad. Better luck next time!";
    }else if(finalPoints < 60)
    {
        message += "I gotta say, kid. That ain't half bad! Could you have done a little better? Maybe! But you also could have done a lot worse. Good on you, champ.";
    }else if(finalPoints < 80)
    {
        message += "Now that's what I'm talking about, baby! You're a real ${artistName} fan, huh? Good stuff, my friend, good stuff.";
    }else if(finalPoints < 100)
    {
        message += "Whoo! You are 'cracked' at this, as the kids say. You played an almost perfect game! Extremely impressive job. I hope to see more from you in the future.";
    }else
    {
        message += "I... I can't believe it. You... really like ${artistName}. Like... I'm concerned about you a little bit. However, I cannot deny that that was literally a completely perfect game, and so it is my solemn duty and great honor to award you with this medal denoting your the ultimate ${artistName} stan.";
    }

    personalMessageDisplay.innerHTML = message;

}


function searchInit()
{
    window.sessionStorage.setItem("currentSong", '0');
    window.sessionStorage.setItem("allPoints", '0');

    let searchInput = document.getElementById("searchbar");
    let select = document.getElementById("type");
    let playlistButton = document.getElementById("playlistButton");

    playlistButton.style.display = "none";
    playlistButton.onclick = function(){
        console.log("Playlist time");
    }

    select.addEventListener('click', change)
    function change(){
        playlistButton.style.display = "none";
        let selectValue = select.value
        if (selectValue == "artist"){
            searchInput.placeholder = "Type Artist Name Here...";
        }
        else if(selectValue === 'album'){
            searchInput.placeholder = "Type Album Name Here...";
        }else if(selectValue === 'playlist')
        {
            playlistButton.style.display = "block";
            searchInput.placeholder = "Paste Link to Playlist Here...";
        }
    }

    searchInput.addEventListener('click', toggleList)
    function toggleList(){
        let list = document.getElementById('list')
        list.style.display = 'block'
    }
    
    searchInput.addEventListener('blur', toggleListNONE)
    function toggleListNONE(){
        let list = document.getElementById('list')
        list.style.display = 'none'
    }

    searchInput.addEventListener("keyup", buildValue);
    function buildValue(e){
        let value = e.target.value;
        if (value === ''){
            console.log("Empty");
            return;
        }
        if (select.value === 'artist'){
            if (value === ''){
                console.log("Empty")
            }
            else{
                searchArtist(value);
            }
        }
        else if (select.value === 'album')
        {
            searchArtistAlbums(value);
        }else
        {
            // TODO - implement playlist functionality
        }
    }

}

function gameInit()
{
    var tracks = JSON.parse(window.sessionStorage.getItem('tracks'));
    var backgroundImage = window.sessionStorage.getItem('background');
    currentSongNum = Number(window.sessionStorage.getItem("currentSong"));
    allPoints = Number(window.sessionStorage.getItem("allPoints"));
    if(allPoints == null)allPoints = 0;
    if(currentSongNum == null)currentSongNum = 0;
    document.getElementsByClassName("background")[0].style.backgroundImage = "url('"+backgroundImage+"')";
    resolvePlayGame(tracks, currentSongNum);
}

function addSearchListElement(item)
{
    const list = document.getElementById("list");
    const listElement = document.createElement("li");
    const image = document.createElement("img");
    const text = document.createElement("p");
    const optionInfo = document.createElement("div");
    
    optionInfo.className = "optionInfo";

    image.src = item.img;
    image.style.display = "block";
    text.textContent = item.name;
    text.style.display = "block";
    optionInfo.appendChild(text);
    listElement.appendChild(image);
    listElement.appendChild(optionInfo);
    listElement.onmousedown = function() {
        window.sessionStorage.setItem("background", item.backgroundImage);
        window.sessionStorage.setItem("artistName", item.name);
        ('isArtist' in item) ? playGameWithArtist(item.uri) : playGameWithAlbum(item.uri);
    }
    list.appendChild(listElement);

}



function searchArtist(value){

    fetch('http://thelastolive.pythonanywhere.com/get-list-of-artists/' + value.trim() + '/5') //passed recieved data into functions
    .then(res => res.json()) // turns data into JSON and passes it to res
    .then(function (data){
        let kids = document.getElementById("list").childNodes;
        kids.forEach(clear);
        function clear(item)
        {
            item.innerHTML = '';
        }
        let artistNames = [];
        let array = data;
        try {
            array.forEach(createListOfNames);
        } catch (error) {
            console.log(error);
        }
        function createListOfNames(item){
            let searchValue = new Object();
            searchValue.img = item.images[item.images.length - 1].url;
            searchValue.backgroundImage = item.images[0].url;
            searchValue.name = item.name;
            searchValue.uri = item.uri;
            searchValue.isArtist = true;
            searchValue.albumImage = item.images
            artistNames.push(searchValue);
        }
        createSearchList(artistNames);
    });
    /*
    let searchListItems = document.getElementsByClassName('searchlist');
    console.log(searchListItems)
    for (const element of searchListItems){
        element.remove();
    }
    */
    //artistNames.forEach(createSearchList)
}

function goToGame()
{
    window.location.href = "guessing_game.html";
}


function createSearchList(names){
    names.forEach(addSearchListElement);
}


function artistTracks(uri){
    fetch('http://thelastolive.pythonanywhere.com/get-artist-tracks/' + uri + '/10') //passed recieved data into functions
    .then(res => res.json()) // turns data into JSON and passes it to res
        .then(function (data) {
            if(data == null)
            {
                window.location.href = "artist_unsupported.html";
                return;
            }
            let tracks = [];
            let array = data;
            array.forEach(trackify);
            function trackify(item)
            {
                let trackValue = Object();
                trackValue.name = item.name;
                trackValue.preview_url = item.preview_url;
                tracks.push(trackValue);
            }
            if(tracks[0].preview_url == null)
            {
                window.location.href = "artist_unsupported.html";
                return;
            }
            window.sessionStorage.setItem('tracks', JSON.stringify(tracks));
            goToGame();
    })
    .catch(function(){
        window.location.href = "artist_unsupported.html";
        return;
    });

}

function searchArtistAlbums(value){
    fetch('http://thelastolive.pythonanywhere.com/get-list-of-albums/' + value + '/5') //passed recieved data into functions
    .then(res => res.json()) // turns data into JSON and passes it to res
    .then(function (data){
        let kids = document.getElementById("list").childNodes;
        kids.forEach(clear);
        function clear(item)
        {
            item.innerHTML = '';
        }

        albumNames = [];
        let array = data;
        array.forEach(createListOfNames);
        function createListOfNames(item){
            let searchValue = new Object();
            searchValue.img = item.images[item.images.length - 1].url;
            searchValue.name = item.name;
            searchValue.backgroundImage = item.images[0].url;
            searchValue.uri = item.uri;
            albumNames.push(searchValue);
        }
        createSearchList(albumNames, false);
        
    });
}

function artistAlbumsTracks(uri){
    fetch('http://thelastolive.pythonanywhere.com/get-album-tracks/' + uri + '/10') //passed recieved data into functions
    .then(res => res.json()) // turns data into JSON and passes it to res
    .then(function (data){
        if(data == null)
        {
            window.location.href = "artist_unsupported.html";
            return;
        }
        tracks = [];
        let array = data;
        array.forEach(trackify);
        function trackify(item)
        {
            let trackValue = Object();
            trackValue.name = item.name;
            trackValue.preview_url = item.preview_url;
            tracks.push(trackValue);
        }
        if(tracks[0].preview_url == null)
        {
            window.location.href = "artist_unsupported.html";
            return;
        }
        window.sessionStorage.setItem('tracks', JSON.stringify(tracks));
        goToGame();

    });
}


function playGameWithArtist(artist_uri)
{
    if(pressable)
    {
        artistTracks(artist_uri);
        pressable = false;
    }
    
}

function playGameWithAlbum(album_uri)
{
    if(pressable)
    {
        artistAlbumsTracks(album_uri);
        pressable = false;
    }
}
        

function resolvePlayGame(tracks, index=0)
{

    if(songClip != null)songClip.pause();



    if(index > 10)
    {
        endGame();
        return;
    }

    
    const input = document.getElementById("guess");
    const guessButton = document.getElementById("guessButton");
    const skipButton = document.getElementById("skipButton");
    const nextButton = document.getElementById("nextButton");
    const answerDisplay = document.getElementById("answer");
    const slider = document.getElementById("audioSlider");
    const currentTime = document.getElementById("currentTime");
    const dur = document.getElementById("duration");
    const extendDurationButton = document.getElementById("extendDurationButton");
    const pointTotalDisplay = document.getElementById("pointTotal");
    const allPointsDisplay = document.getElementById("allPoints");
    const audioPlayer = document.getElementsByClassName("audioPlayer")[0];

    let numOfTimesExtended = 0;

    duration = BASE_DURATION;

    allPointsDisplay.textContent = allPoints;
    audioPlayer.style.width = BASE_AUDIO_SLIDER_WIDTH*duration + "%";
    nextButton.style.display = answerDisplay.style.display = "none";
    input.style.display = guessButton.style.display = skipButton.style.display = extendDurationButton.style.display = "block";
    try
    {
        songClip = new Audio(tracks[index].preview_url);
    }
    catch
    {
        console.log("Index: "+index+"!");
        resolvePlayGame(tracks, (index+1));
    }
    
    updateTimestamp();

    var numOfPointsForThisRound = 10;
    updatePoints(0);

    if(index > 0)
    {
        document.getElementById("pointTotalDisplay").style.backgroundColor = calculateColor(allPoints, 10*index);
    }
    

    songClip.ontimeupdate = function ()
    {
        if(songClip.currentTime >= duration)
        {
            playPause();
        }else
        {
            updateTimestamp();
        }
    }


    slider.oninput = function()
    {
        songClip.currentTime = duration/100*slider.value;
    }

    var numOfTimesGuessed = 0;
    input.value = "";
    answerDisplay.textContent = "";

    guessButton.onclick = function(){
        
        const guess = input.value;
        const name = tracks[index].name.toLowerCase()
        if(name.indexOf(guess.toLowerCase()) >= 0 && (name.length < 5 || guess.length >= 4))
        {
            correct();
        }
        else incorrect();
    }

    skipButton.onclick = function() {
        updatePoints(-numOfPointsForThisRound);
        answerDisplay.textContent = "The name of the song was "+tracks[index].name+'.';
        doneGuessing();
    }

    input.oninput = function()
    {
        answerDisplay.style.display = "none";
    }


    nextButton.onclick = next;

    extendDurationButton.onclick = extendDuration;

    function extendDuration()
    {
        numOfTimesExtended++;
        duration += DURATION_INCREASE;
        updateTimestamp();
        updatePoints(-POINTS_TAKEN_FOR_DURATION_INCREASE);
        

        audioPlayer.style.width = BASE_AUDIO_SLIDER_WIDTH*duration + "%"; 

        if(duration >= MAX_DURATION)
        {
            extendDurationButton.style.display = "none";
        }

    }

    function updateTimestamp()
    {
        dur.textContent = (duration/100).toFixed(2);
        currentTime.textContent = (Math.floor(duration/100*slider.value)/100).toFixed(2);
        slider.value = 100*songClip.currentTime/duration;
        
    }

    function updatePoints(diff)
    {
        numOfPointsForThisRound += diff;
        if(numOfPointsForThisRound < 0)numOfPointsForThisRound = 0;
        pointTotalDisplay.textContent = numOfPointsForThisRound;
        const color = calculateColor(numOfPointsForThisRound, 10);
        document.getElementById("currentPointTotalDisplay").style.backgroundColor = color;
    }

    function next()
    {
        resolvePlayGame(tracks, index);
    }

    function correct()
    {
        
        extendDurationButton.style.display = "none";
        answerDisplay.style.display = "block";
        answerDisplay.textContent = "Yes! The name of the song is "+tracks[index].name+'.';
        doneGuessing();
    }

    function incorrect()
    {
        numOfTimesGuessed++;
        answerDisplay.style.display = "block";
        if(numOfTimesGuessed >= 3)
        {
            updatePoints(-numOfPointsForThisRound);
            answerDisplay.textContent = "The name of the song was "+tracks[index].name+'.';
            doneGuessing();
        }else if(numOfTimesGuessed === 1)
        {
            
            answerDisplay.textContent = "Wrong, sorry.";
        }
        else{
            answerDisplay.textContent = "Nope.";
        }
    }

    function doneGuessing()
    {
        allPoints += numOfPointsForThisRound;
        index++;
        window.sessionStorage.setItem("currentSong", index);
        window.sessionStorage.setItem("allPoints", allPoints);
        input.style.display = guessButton.style.display = skipButton.style.display = extendDurationButton.style.display = "none";
        nextButton.style.display = answerDisplay.style.display = "block";
    }
}

// TODO - implement all of this
function endGame()
{
    console.log("GAME ENDED");
    window.location.href = "game_over.html";
}

function playPause()
{
    if(songClip.currentTime >= duration)
    {
        songClip.currentTime = 0;
    }
    paused = !paused;
    if(paused)
    {
        songClip.pause();
        document.getElementsByClassName("playPause")[0].src = "playButton.png"; 
    }else
    {
        songClip.play();
        document.getElementsByClassName("playPause")[0].src = "pauseButton.png"; 
    } 
}

function calculateColor(number, range) {

    
    return `hsl(${100 - (1-number/range*1.0)*100}, 100%, 50%)`;
}

function goHome()
{
    window.location.href = "index.html";
}
