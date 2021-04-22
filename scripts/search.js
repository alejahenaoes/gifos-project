//const apiKey = "api_key=y9Vum3HsDR775RvR5yVqbdDQ155aMeRX";
let favoriteSection = document.getElementsByClassName("favoritesSection")
let searchSection = document.getElementsByClassName("searchBoxMain")
let favOption = document.getElementById("favItem")
let myGifsSection = document.getElementsByClassName("myGifsSection")
let myOption = document.getElementById("myItem")
let createSection = document.getElementsByClassName("createSection")
let newGifOption = document.getElementById("newGif")
let trendingSection = document.getElementsByClassName("trendingSection")
let logo= document.getElementsByClassName("logo")[0];

let suggestions = document.getElementsByClassName("searchBoxAutocomplete")
let imgSearch = document.getElementsByClassName("imgSearch")
let titleSearch = document.getElementsByClassName("titleSearch")[0]
let searchSpace = document.getElementsByClassName("gifosSearch")
let suggestionsBar = document.getElementsByClassName("allSearch")
let searchBar = document.getElementsByClassName("input")
let activeSection = document.getElementsByClassName("active")
let normalSection = document.getElementsByClassName("iconSearch")
let closeIcon = document.getElementsByClassName("closeSearch")

let suggestionContentCtn = document.getElementsByClassName("suggestions");
let suggestionBox = document.getElementsByClassName("suggestion");
let suggestionContent = document.getElementsByClassName("contentSugg");
let suggestionsCtn = document.getElementsByClassName("suggestionsCtn");
let searchInput = document.getElementsByClassName("input")[0];


let card = document.getElementsByClassName("gifsSearch");
let cardTemplate = card[0];
let ctn = document.getElementsByClassName("gridTemplate");
let verMasBtn = document.getElementsByClassName("verMas")[0];


//Clonar template
let gifosResults = 0; //almacena el conteo
let limitGifos = 50;
function createCards(){
    let limitSup = gifosResults+12 <= limitGifos ? 12 : (limitGifos - gifosResults);
    for(let i=0; i<limitSup; i++){
        let boxTemplateSearch = (cardTemplate).cloneNode(true);
        (boxTemplateSearch).style.display = "inline-block";
        (ctn)[0].appendChild(boxTemplateSearch);
    }
    gifosResults = card.length;
}


function verMas(){
    if(gifosResults == limitGifos){
        verMasBtn.style.display = "none";
    }
}
let gifsToAdd = 12;
verMasBtn.addEventListener("click", ()=>{
    verMas();
    gifsToAdd += 12; 
    sendApiRequest(gifsToAdd);
})


function sendApiRequest(limitSup){
    let userInput = document.getElementById("input").value
    // console.log(userInput)
    createCards();
    const searchApiURL = `https://api.giphy.com/v1/gifs/search?q=${userInput}&rating=g&${apiKey}`;
    fetch(searchApiURL).then(function(data){
        return data.json()
    })
        .then(function(json){
            limitSup = limitSup <= json.data.length ? limitSup : json.data.length;
                for (let i=0; i < limitSup; i++){
                    // console.log(json.data)
                    // console.log(json.data[i].images.fixed_height.url)
                    let imgPath = json.data[i].images.fixed_height.url
                    imgSearch[i].setAttribute("src", imgPath)
                    imgSearch[i].id="imgGifSearch"+i; //se lo pone a la image
                    titleSearch.innerHTML = userInput;
                    let titleGif = document.getElementsByClassName("titleGifSearch");
                    let titleGifApi = json.data[i].title
                    titleGif[i].textContent = titleGifApi
                    let userGif = document.getElementsByClassName("userSearch");
                    let userGifApi =json.data[i].username;
                    userGif[i].textContent = userGifApi;
                }
            }).catch(function(){
                    alert("Busqueda inválida")
            })
}

//Autocompletar
let userInput = document.getElementById("input");
function autocomplete(){
    if(userInput.value != ""){
        let q = `q=${userInput.value}`;
        let Autocomplete = "https://api.giphy.com/v1/gifs/search/tags?"+q+"?&"+apiKey;
        fetch(Autocomplete)
        .then(response => response.json())
        .then(datos => {
            for (let i=0; i < datos.data.length; i++){
                let content = datos.data[i].name;
                // console.log(content)
                suggestionContent[i].textContent = content;
                suggestionContent[i].style.display = "inline-block";
                suggestionBox[i].style.cursor = "pointer";
                // //click suggestion
                suggestionBox[i].addEventListener("click", autocompleteSug);
            }
            console.log(datos.data.length) //Array con datos
            })
            suggestionsBar[0].style.height = "257px"; //las sugerencias
            suggestionsCtn[0].style.display = "block"; //las sugerencias
    }else{
        suggestionsCtn[0].style.display = "none";
        suggestionsBar[0].style.height = "52px";
    }
}
//Eliminar busqueda anterior
function removeSearch(){
    for(let i = gifosResults-1;i >= 0;i--){
        (ctn)[0].removeChild(card[i]);
    }
    gifsToAdd = 12;
    gifosResults = 0;
    verMasBtn.style.display = "block";
}

//Onclick de sugerencias
function autocompleteSug(event){
    let suggestionPath = event.path[1].innerText;
    userInput.value = suggestionPath;
    removeSearch();
    sendApiRequest(gifsToAdd);
    searchSpace[0].style.display = "inline-block";
    suggestionsBar[0].style.height = "52px";
    suggestionsCtn[0].style.display = "none";
}

//Poder buscar con enter
searchBar[0].addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        removeSearch();
        sendApiRequest(gifsToAdd);
        searchSpace[0].style.display = "inline-block";
        suggestionsBar[0].style.height = "52px";
        suggestionsCtn[0].style.display = "none";
        // let userInput = document.getElementById("input").value = ""
    }else{ //presionando otra tecla diferente a enter
        autocomplete();
    }
});

 //Funcionalidad de barra activa
searchBar[0].addEventListener("focus", () =>{
    activeSection[0].style.display = "flex";
    normalSection[0].style.display = "none";
    // suggestionsBar[0].style.height = "257px"; //las sugerencias
    // suggestionsCtn[0].style.display = "block"; //las sugerencias
})
//Limpieza SearchBar
closeIcon[0].addEventListener("focus", () =>{
    activeSection[0].style.display = "none";
    normalSection[0].style.display = "block";
    let inputValue = document.getElementById("input").value = "";
    searchSpace[0].style.display = "none"
    suggestionsBar[0].style.height = "52px";
    suggestionsCtn[0].style.display = "none"; //las sugerencias
})

//Opciones Menú
logo.addEventListener("click", ()=>{
    searchSection[0].style.display = "block";
    trendingSection[0].style.display = "block";
    favoriteSection[0].style.display = "none";
    myGifsSection[0].style.display = "none";
    createSection[0].style.display = "none";
})
favOption.addEventListener("click", () =>{
    favoriteSection[0].style.display = "block";
    trendingSection[0].style.display = "block";
    searchSection[0].style.display = "none";
    myGifsSection[0].style.display = "none";
    createSection[0].style.display = "none";
})
myOption.addEventListener("click", () =>{
    myGifsSection[0].style.display = "block";
    trendingSection[0].style.display = "block";
    searchSection[0].style.display = "none";
    favoriteSection[0].style.display = "none";
    createSection[0].style.display = "none";
})
newGifOption.addEventListener("click", () =>{
    createSection[0].style.display = "flex";
    myGifsSection[0].style.display = "none"
    searchSection[0].style.display = "none";
    favoriteSection[0].style.display = "none";
    trendingSection[0].style.display = "none";
})

