// script.js
const video = document.getElementById('videoElement');
const captureButton = document.getElementById('captureButton');

let activeStream = null;

function startCamera() {
  const constraints = {
    video: { facingMode: 'environment' }
  };

  navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
      if (activeStream) {
        stopCamera();
      }
      video.srcObject = stream;
      activeStream = stream;
    })
    .catch(error => {
      console.error('Error al acceder a la cámara: ', error);
    });
}

function stopCamera() {
  if (activeStream) {
    const tracks = activeStream.getTracks();
    tracks.forEach(track => track.stop());
    activeStream = null;
  }
}

function captureImage() {
  var inputFile = document.getElementById('input-file');
  var urlCloudFunction = 'https://us-central1-true-node-383615.cloudfunctions.net/Guardar_imagen';
  
  var imagen = inputFile.files[0];
  
  var formData = new FormData();
  formData.append('imagen', imagen);
  
  fetch(urlCloudFunction, {
    method: 'POST',
    body: formData
  })
  .then(function(response) {
    if (response.ok) {
      console.log('Imagen enviada exitosamente a la Cloud Function.');
    } else {
      console.error('Error al enviar la imagen a la Cloud Function.');
    }
  })
  .catch(function(error) {
    console.error('Error de red:', error);
  });
}

