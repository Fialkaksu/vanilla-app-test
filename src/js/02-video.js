import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe#vimeo-player');
const player = new Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';

const currentTime = JSON.parse(localStorage.getItem(STORAGE_KEY)) || 0;

player.setCurrentTime(currentTime).catch(function (error) {
  console.error('Error setting current time:', error);
});

const saveCurrentTime = throttle(function (data) {
  localStorage.setItem(STORAGE_KEY, data.seconds);
}, 1000);

player.on('timeupdate', saveCurrentTime);
