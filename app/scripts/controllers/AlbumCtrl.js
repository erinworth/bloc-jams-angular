(function() {
  function AlbumCtrl(Fixtures, SongPlayer) {
     this.albumData = Fixtures.getAlbum();
     this.songPlayer = SongPlayer;
<<<<<<< HEAD
    }
=======
 }
>>>>>>> checkpoint-angular-7

    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
})();
