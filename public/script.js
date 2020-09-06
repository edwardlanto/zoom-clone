
const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
const socket = io('/');
myVideo.muted = true;
console.log('socket', socket);
// Declare variable to set video stream value on promise res
let videoStream;
var peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '5000'
});

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    videoStream = stream;
    addVideoStream(videoStream, stream);
});

peer.on('open', id => {
    socket.emit('join-room', ROOM_ID);
})

socket.on('user-connected', (userId, ) => {
    connectToNewUser(useId);
});

const connectToNewUser = (userId) => {
    console.log(userId);
}

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
    videoGrid.append(video);
}

