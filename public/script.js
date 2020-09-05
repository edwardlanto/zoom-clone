
const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
const socket = io('/')
myVideo.muted = true;

// Declare variable to set video stream value on promise res
let videoStream;

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    videoStream = stream;
    addVideoStream(videoStream, stream)
});

socket.emit('join-room');

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
    videoGrid.append(video);
}

