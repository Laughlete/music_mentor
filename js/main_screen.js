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
			if(song === undefined)
				this.hideSongDetails()
			else
				this.showSongDetails()
			this.selectedSong = song;
		}

	}
	musicMentor.hideSongDetails()
})