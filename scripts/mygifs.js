let sinGifs = document.getElementsByClassName("sinGifs")[0];
let gridMyGifs = document.getElementsByClassName("gridMyGifs")[0];
let imgMyGif = document.getElementsByClassName("myNewGif");
let myCard = document.getElementsByClassName("myImage");
// let myCardTemplate = myCard[0];
let seeMoreMyGifs = document.getElementsByClassName("verMasBtnmyGifs")[0];

let numMyGifs = myGifsIds.length;
//Crear templates
let gifsById = (gifId, i) =>{
    let urlgifsbyID = `https://api.giphy.com/v1/gifs/${gifId}?&${apiKey}`;
    fetch(urlgifsbyID)
    .then(response => response.json())
    .then(data =>{
        console.log(data)
        let myImgPath = data.data.images.original.url;
        imgMyGif[i].src = myImgPath;
        imgMyGif[i].id="imgNewGif"+i;
    })
}
for(let i=0; i< numMyGifs; i++){
    let template = myCard[0].cloneNode(true);
    template.classList.toggle = "myGifsCards";
    gridMyGifs.appendChild(template);
    myCard[i+1].style.display = "inline-block";
    gifsById(myGifsIds[i], i);
}
// window.onload = function(){
//     gridMyGifs[0].removeChild(myCardTemplate);
// }
if(myGifsIds.length == 0){
    sinGifs.style.display = "flex";
    seeMoreMyGifs.style.display = "none";
    gridMyGifs.style.display = "none";
} else{
    sinGifs.style.display = "none";
    // gridMyGifs.style.display = "flex";
}
if (myGifsIds.length > 12){
    seeMoreMyGifs.style.display = "flex";
}