
(function() {
     function SongPlayer($rootScope, Fixtures) {
          var SongPlayer = {};

 /**
 * @desc which album is playing
 * @type {Object}
 */
         var currentAlbum = Fixtures.getAlbum();

/**
* @desc Buzz object audio file
* @type {Object}
*/

          var currentBuzzObject = null;

/**
* @function setSong
* @desc Stops currently playing song and loads new audio file as currentBuzzObject
* @param {Object} song
*/

         var setSong = function(song) {
           if (currentBuzzObject) {
              currentBuzzObject.stop();
              SongPlayer.currentSong.playing = null;
           }

              currentBuzzObject = new buzz.sound(song.audioUrl, {
                  formats: ['mp3'],
                  preload: true
              });

              currentBuzzObject.bind('timeupdate', function() {
                  $rootScope.$apply(function() {
                      SongPlayer.currentTime = currentBuzzObject.getTime();
                  });
              });

              SongPlayer.currentSong = song;
         };

/**
* @function getSongIndex
* @desc Gets the song index for the next and previous btns
* @param {Object} song
*/

       var getSongIndex = function(song) {
              return currentAlbum.songs.indexOf(song);
        };

/**
* @desc Active song object from list of songs
* @type {Object}
*/
       SongPlayer.currentSong = null;

/**
* @desc Current playback time (in seconds) of currently playing song
* @type {Number}
*/
      SongPlayer.currentTime = null;


/**
* @function playSong
* @desc Plays song using the buzzlibrary play method
* @param {Object} song
*/

    var playSong = function(song){
      currentBuzzObject.play();
      song.playing = true;
    }

/**
* @function stopSong
* @desc Stops song and sets song.playing to null
* @param {Object} song
*/
    var stopSong = function(song){
      currentBuzzObject.stop();
      song.playing = null;
    }

/**
* @desc Set song player volume, default: 80
* @type {Number}
**/
      SongPlayer.volume = 80;


/**
* @function play
* @desc Play current or new song
* @param {Object} song
**/

    SongPlayer.play = function(song) {
        song = song || SongPlayer.currentSong;
        if (SongPlayer.currentSong !== song) {
            setSong(song);
            playSong(song);
        } else if (SongPlayer.currentSong === song) {
            if (currentBuzzObject.isPaused()) {
                playSong(song);
            }
       }
    };

/**
* @function SongPlayer.pause
* @desc method of Songplayer that pauses the song
* @param {Object} song
*/

        SongPlayer.pause = function(song) {
           song = song || SongPlayer.currentSong;
           currentBuzzObject.pause();
           song.playing = false;
         };

/**
* @function SongPlayer.previous
* @desc jumps back a song, if on the first song it will stop the song and reset the song
* @param {Object} song
*/


      SongPlayer.previous = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex--;

             if (currentSongIndex < 0) {
                 currentBuzzObject.stop();
                 SongPlayer.currentSong.playing = null;
             }else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
      };

/**
* @function SongPlayer.next()
* @desc Goes to the next song through the song index
* @param {Number} currentSongIndex
**/
      SongPlayer.next = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex++;

              if (currentSongIndex > currentAlbum.songs.length) {
                stopSong(song);
              } else {
            var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
              }
        };

/**
* @function setCurrentTime
* @desc Set current time (in seconds) of currently playing song
* @param {Number} time
*/
      SongPlayer.setCurrentTime = function(time) {
          if (currentBuzzObject) {
              currentBuzzObject.setTime(time);
          }
      };

/**
* @function setVolume
* @desc Set volume based on volume bar
* @param {Number} volume
**/
      SongPlayer.setVolume = function(volume) {
        if (currentBuzzObject) {
          currentBuzzObject.setVolume(volume);
        }
      };
  
    return SongPlayer;
}

angular
    .module('blocJams')
    .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
