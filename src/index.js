// console.log('hello world')

// import { createStore } from 'redux'

// function counter(state = 0, action) {
//   switch (action.type) {
//     case 'INCREMENT':
//       return state + 1
//     case 'DECREMENT':
//       return state - 1
//     default:
//       return state
//   }
// }

// let store = createStore(counter)
// store.subscribe(() => console.log(store.getState()))

// store.dispatch({ type: 'INCREMENT' })
// store.dispatch({ type: 'INCREMENT' })
// store.dispatch({ type: 'DECREMENT' })

// const video = document.querySelectorAll('.video')[0];
// const img = document.querySelectorAll('.screenshot')[0];
// const screenshotButton = document.querySelectorAll('.take-screenshot-button')[0];
// const canvas = document.createElement('canvas');

// navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment", height: 1000, width: 1000 }})
//   .then(function(stream) {
//     /* use the stream */
//     console.log('stream:', stream);
//     video.srcObject = stream;
//   })
//   .catch(function(error) {
//     /* handle the error */
//     console.log('error:', error);
//   });

// screenshotButton.onclick = video.onclick = function() {
//   canvas.width = video.videoWidth;
//   canvas.height = video.videoHeight;
//   canvas.getContext('2d').drawImage(video, 0, 0);
//   // Other browsers will fall back to image/png
//   img.src = canvas.toDataURL('image/webp');
//   console.log("canvas.toDataURL('image/webp')", canvas.toDataURL('image/webp'))
// };

import "babel-polyfill";
import React from 'react'
import { render } from 'react-dom'
import App from './components/App'

/*
user flow:
  gallery view
    face image and label with h/scrollbar

*/

render(
    <App />,
    document.getElementById('root')
);

export default () => console.log('hello world');
