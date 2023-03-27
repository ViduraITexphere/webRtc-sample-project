import store from "../../store/Store";
import { setLocalStream } from "../../store/actions/CallAction";

const defaultConstraints = {
  audio: true,
  video: true,
};

//getUserMedia allows web applications to access media devices 
//and capture audio and video data from them.
export const getLocalStream = () => {
  navigator.mediaDevices.getUserMedia(defaultConstraints)
  .then (stream => {
    store.dispatch(setLocalStream(stream));
    })
    .catch (error => {
      console.log("Error getting local stream: ", error);
    });
};
