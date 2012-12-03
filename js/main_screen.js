$(function(){
	musicMentor = {
		selectedSong: undefined,

		showSongDetails: function(){
			$("#songDetails").show()
		},

		hideSongDetails: function(){
			$("#songDetails").hide()
		},

		setSelectedSong: function(song){
			this.selectedSong = song;
		}

	}
	musicMentor.hideSongDetails()
})