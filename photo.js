
//Set variables
var cloudinary = require("cloudinary-core");
var CLOUDINARY_URL = 'httmps://api.cloudinary.com/v1_1/dzaz05xgm/upload';
var fileUpload = document.getElementById('file-upload');
var CLOUDINARY_UPLOAD_PRESET= '';

const vid = document.querySelector('video');
navigator.mediaDevices.getUserMedia({video: true}) // request cam
.then(stream => {
  vid.srcObject = stream;
  return vid.play();
})
.then(()=>{ // enable the button
  const btn = document.querySelector('button');
  btn.disabled = false;
  btn.onclick = e => {
    takeASnap()
    .then(upload);
  };
})
.catch(e=>console.log('please use the fiddle instead'));

function takeASnap(){
  const canvas = document.createElement('canvas'); // create a canvas
  const ctx = canvas.getContext('2d'); // get its context
  canvas.width = vid.videoWidth; // set its size to the one of the video
  canvas.height = vid.videoHeight;
  ctx.drawImage(vid, 0,0); // the video
  return new Promise((res, rej)=>{
    canvas.toBlob(res, 'image/jpeg'); // request a Blob from the canvas
  });
}
function upload(blob){
  // uses the <a download> to download a Blob
  let a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.upload = 'screenshot.jpg';
  document.body.appendChild(a);
  a.click();
}


fileUpload.addEventListener('change', function() {
    //console.log(event)
    var file = event.target.files[0];
    var formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset' , CLOUDINARY_UPLOAD_PRESET);
    
    axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
    }).then(function(res) {
        console.log(res)
    }).catch(function(err) {
        console.log(err)
    });
});
