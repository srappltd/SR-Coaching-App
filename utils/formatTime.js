// utils/formatTime.js
const formatTime = millis => {
    const totalSeconds = Math.floor(millis / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  
    return `${millis ? formattedHours : '00'}:${millis ? formattedMinutes : "00" }:${millis ? formattedSeconds : '00'}`;
  };
  
  export default formatTime;
  