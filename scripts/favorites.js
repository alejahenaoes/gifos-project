let sinFavs = document.getElementsByClassName("sinFavs")[0];
let gridMyFavs = document.getElementsByClassName("gridFavorites")[0];
let imgFavs = document.getElementsByClassName("myFavGif");
let favCard = document.getElementsByClassName("favImage");
// let favCardTemplate = favCard[0];
let seeMoreFavs = document.getElementsByClassName("verMasBtnmyGifs")[0];

// gridMyFavs.style.display = "block";

let numFavs = (favsArray.length);

for(let i=0; i< numFavs; i++){
    let favTemplate = favCard[0].cloneNode(true);
    favTemplate.classList.toggle = "myFavsCards";
    gridMyFavs.appendChild(favTemplate);
    favCard[i+1].style.display = "inline-block";
    imgFavs[i].src = (favsArray[i])
    // console.log(favsArray[i])
}
window.onload = () => {
    gridMyFavs.removeChild(favCard[0]);
}

if(favsArray.length == 0){
    sinFavs.style.display = "flex"
    seeMoreFavs.style.display = "none"
    gridMyFavs.style.display = "none"
} else{
    gridMyFavs.style.display = "flex"
    sinFavs.style.display = "none";
}
if (favsArray.length > 12){
    seeMoreFavs.style.display = "flex"
}

// let gifsById = (gifId, i) =>{
    // let urlgifsbyID = `https://api.giphy.com/v1/gifs/${gifId}?&${apiKey}`;
    // fetch(urlgifsbyID)
    // .then(response => response.json())
    // .then(data =>{
    //     let myImgPath = data.data.images.original.url;
    //     imgMyGif[i].src = myImgPath;
    //     imgMyGif[i].id="imgNewGif"+i;

    // })
// }