//Eliminar templates
window.onload = function() {
    gridMyFavs.removeChild(favCard[0]);
    gridMyGifs[0].removeChild(myCard[0]);
    boxesContainer[0].removeChild(gifo[0]);
    // ctn[0].removeChild(card[0]);
}
//Carrusel
let buttonLeft = document.getElementsByClassName("button-l")[0];
let buttonRight = document.getElementsByClassName("button-r")[0];
let distance = (357+29);
let distance2=0;
let numGifosSlider = 10;
let gifosToSee= numGifosSlider - 3;//3 son los gifos visibles
let gifo = document.getElementsByClassName("gifos");
const boxesContainer = document.getElementsByClassName("boxes-container");
let positionGifs = [];
let favIconTr = document.getElementsByClassName("favsTr");
let favIconActTr = document.getElementsByClassName("activeTr");
let favsArray;

if(JSON.parse(localStorage.getItem("gifsFav"))){
    //la lista de gifos creados será igual a lo que se encuentre en el LocalStorage
    favsArray = JSON.parse(localStorage.getItem("gifsFav"));
    console.log(favsArray)
}else{
    //si no hay información en el LocalStorage creamos la lista
    favsArray = [];
}

//Favoritos de trending
let activateFunctionTr = (event)=>{
    let gifFavTr = document.getElementById(event.id);
    gifFavTr.style.display = "none";
    let ejemplo = event.id.split("favIconTr-");
    let gifActTr = document.getElementById("favIconAct-"+ejemplo[1]);
    gifActTr.style.display = "block";
    let gifImgFavTr = document.getElementById("imgGifTr-"+ejemplo[1])
    favsArray.push(gifImgFavTr.src)
    localStorage.setItem("gifsFav",JSON.stringify(favsArray));
    console.log(event);
};


//crear templates
for(let i=0; i<numGifosSlider; i++){
    let boxTemplate = gifo[0].cloneNode(true);
    boxesContainer[0].appendChild(boxTemplate);
    gifo[i+1].style.display = "inline-block";
    positionGifs.push(0);
}

buttonLeft.addEventListener("click", () =>{
    if(positionGifs[0] < 0){
        slideFunction(distance);
    }
});

buttonRight.addEventListener("click", () =>{
    if(Math.abs(positionGifs[0]) < (distance*gifosToSee)){
        slideFunction(-distance);
    }
});
//Mover slide
let slideFunction = (distance) =>{
    // let gifos = document.getElementsByClassName("gifos");
    for (let i = 0; i<gifo.length; i++){
        positionGifs[i] += distance;
        gifo[i].style.transform = "translateX("+(positionGifs[i])+"px)";
    }
}

//Poner imagenes al carrusel
const apiKey = "api_key=y9Vum3HsDR775RvR5yVqbdDQ155aMeRX";
let urlTrending = "https://api.giphy.com/v1/gifs/trending?"+ apiKey;
let gifTrendingImg = document.getElementsByClassName("imgGif");
    fetch(urlTrending)
        .then(response => response.json())
        .then(gifo_response => {
            for (let i=0; i < 11; i++){
                let urlGifo= gifo_response.data[i].images.original.url;
                gifTrendingImg[i].setAttribute("src",urlGifo);
                gifTrendingImg[i].id="imgGifTr-"+i;
                favIconActTr[i].id= "favIconAct-"+i;
                favIconTr[i].id = "favIconTr-"+i;
                //Poner texto en hover
                let titleGif = document.getElementsByClassName("titleGif");
                let userGif = document.getElementsByClassName("user");
                let titleGifo = gifo_response.data[i].title;
                titleGif[i].textContent = titleGifo;
                let userGifo = gifo_response.data[i].username;
                userGif[i].textContent = userGifo;
            }console.log(gifo_response)
            // activateFunctionTr();
        }).catch(message_error => console.log(message_error));

//Topics para trending
let urlTopicsTrending = "https://api.giphy.com/v1/trending/searches?"+ apiKey;
let ctnTrendingTopic = document.getElementsByClassName("textDownBar")[0];
fetch(urlTopicsTrending)
.then(response => response.json())
.then(topicResponse => {
    for (let i=0; i < 5; i++){
        let topics= capitalize(topicResponse.data[i])

        function capitalize(topic){
            return topic.charAt(0).toUpperCase()+ topic.slice(1)
                }
        if( i<4 ){
                ctnTrendingTopic.innerHTML+= topics+', '
            } else {
                ctnTrendingTopic.innerHTML+= topics
            }
            }
})

