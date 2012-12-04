$(function(){
	musicMentor = {
		selectedSong: undefined,

		showSongDetails: function(){
			$("#preSongDetails").hide()
			$("#songDetails").show()
		},

		hideSongDetails: function(){
			$("#songDetails").hide()
			$("#preSongDetails").show()
		},

		setSelectedSong: function(song){
			this.selectedSong = song;
		}

	}
	musicMentor.hideSongDetails()
})