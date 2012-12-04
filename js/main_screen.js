$(function(){
	musicMentor = {
		selectedSong: undefined,

		showSongDetails: function(){
                        $("#preSongDetails").hide()
			$("#songDetails").show()
		},

		hideSongDetails: function(){
			$("#songDetails").hide()
		},
                
                showPreSongDetails: function(){
                        $("#PreSongDetails").show()
                },

		setSelectedSong: function(song){
			this.selectedSong = song;
		}

	}
	musicMentor.hideSongDetails()
        musicMentor.showPreSongDetails()
})