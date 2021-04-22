let textCtn = document.getElementsByClassName("inner")[0];
let videoCtn = document.getElementsByClassName("camStream")[0];
let startBtn = document.getElementById("startBtn");
let recordBtn = document.getElementById("recordBtn");
let stopBtn = document.getElementById("finishBtn");
let uploadBtn = document.getElementById("uploadBtn");
let timekeeper;
let timekeeperItem = document.getElementById("timekeeper");
let uploadingCtn = document.getElementsByClassName("uploadingBox")[0];

let myGifsIds;

//Tiene toda la info del gif creado
let form = new FormData();
//url de la API search gifs GIPHY
let urlUploadGif = "https://upload.giphy.com/v1/gifs?"+apiKey;


function accessCam (){
    navigator.mediaDevices.getUserMedia({
        // devuelve promesa
        audio: false, 
        // sin audio
        video: {
           height: { max: 480 }
        }
        // medidas para el video
     })
     .then(responsesStream =>{
        showRecElements(responsesStream);
     })
}

let videoStream;
//de la promesa, haz tal cosa
let showRecElements = (stream)=>{
    videoCtn.srcObject = stream;
    videoCtn.play();
    //almacenar respuesta
    videoStream = stream;
}
function executeStep1() {
    startBtn.removeEventListener("click", executeStep1);
    document.querySelector(".createTitleMain").innerHTML = "¿Nos das acceso a tu cámara?";
    document.querySelector(".createContent").innerHTML = "El acceso a tu camara será válido sólo <br> por el tiempo en el que estés creando el GIFO.";
    startBtn.innerHTML = "OK";
    startBtn.addEventListener("click", () => {
        textCtn.style.display = "none";
        videoCtn.style.display = "block";
        startBtn.style.display = "none"
        recordBtn.style.display = "block";
        accessCam();
    })
}
startBtn.addEventListener("click", ()=> {
    executeStep1();
})


//grabar video
let streamVideo = ()=>{
    recorder = RecordRTC(videoStream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function() {
        console.log('started')
    },
    });
    recorder.startRecording();
    timekeeperItem.style.display = "block";
    timekeeper =  setInterval(timekeeperFunction,1000);
    recordBtn.style.display = "none"
}

recordBtn.addEventListener("click", ()=>{
    streamVideo();
    stopBtn.style.display = "block";
    timekeeperItem.innerHTML = "00:00:00";
    hours = ["0","0"];
    minutes = ["0","0"];
    seconds = ["0","0"];
    // recordBtn.innerHTML = "STOP"
})
//Stop
stopBtn.addEventListener("click", ()=>{
    recorder.stopRecording(()=>{
        let blob = recorder.getBlob()
        form.append('file', blob, 'myGif.gif');
        console.log(form.get('file'))
        clearInterval(timekeeper);//detenemos el cronometro
        //habilitamos la obción de grabar nuevamente
        timekeeperItem.style.display = "none";
        recordBtn.style.display = "none";
    })
    uploadBtn.style.display = "block";
    stopBtn.style.display = "none";
})
//Upload
uploadBtn.addEventListener("click", ()=>{
    uploadingCtn.style.display = "block";
    fetch(urlUploadGif, {
        method:"POST",
        body: form 
    })
    .then(response => {
        return response.json();
    })
    .then(data_new =>{
        document.querySelector(".uploadingIcon").src = "/assets/ok.svg"
        document.querySelector(".uploadingText").innerHTML = "GIFO subido con éxito";
        myGifsIds.push(data_new.data.id)
        //localStorage es una funcion
        //setItem enviar
        localStorage.setItem("myNewGif",JSON.stringify(myGifsIds));
        // console.log(data_new.data.id)
    })
})
//getItem llamar/obtener
//parse devuelve al formato original
//verificamos si existe información en el local Storage -> true es que si hay
if(JSON.parse(localStorage.getItem("myNewGif"))){
    //la lista de gifos creados será igual a lo que se encuentre en el LocalStorage
    myGifsIds = JSON.parse(localStorage.getItem("myNewGif"));
    console.log(myGifsIds)
}else{
    //si no hay información en el LocalStorage creamos la lista
    myGifsIds = [];
}


let timekeeperFunction = ()=>{
    seconds[1] = parseInt(seconds[1]) + 1; 
    //verificación segundos
    if(seconds[1] == 10){
        seconds[0] = ""; 
    }else if(seconds[1] == 60){
        minutes[1]= (parseInt(minutes[1])+1).toString(); 
        seconds[0] = "0";
        seconds[1] = "0";
    }
    //verificación minutos
    if(minutes[1]==10){
        minutes[0] = ""; 
    }else if(minutes[1] == 60){
        hours[1]= (parseInt(hours[1])+1).toString(); 
        minutes[0] = "0";
        minutes[1] = "0";
    }
    //verificacón horas
    if(hours[1]==10){
        hours[0] = ""; 
    }else if(hours[1]==24){
        hours[0] = "0";
        hours[1] = "0";
    }
    let hs = hours[0]+hours[1];
    let mm = minutes[0] + minutes[1];
    let ss = seconds[0] + seconds[1];
    timekeeperItem.innerHTML = hs +":"+mm+":"+ss;
}

