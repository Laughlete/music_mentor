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
		},

		popupDialog: function(action, defaultText){
			function checkInput(){
				$("#popupSaveButton").unbind("click");
				if($("#popupInput").val() != $("#popupInput").defaultValue){
					$("#popupSaveButton").click(function(){
						var songName = $("#popupInput").val();
						action(songName);
						$.colorbox.close();
					});
				}
			}
			$.colorbox({
				inline: true,
				href: "#popup",
				/* onComplete fires when the box finishes loading */
				onComplete: function(){
					$("#popupInput")[0].defaultValue = defaultText;
					var defaultVal = $("#popupInput")[0].defaultValue;
					$("#popupInput").removeClass("default").addClass("default");
					$("#popupInput").focus(function(){
						if($("#popupInput").val() != $("#popupInput").defaultValue){
							$("#popupInput").val("");
							$("#popupInput").removeClass("default");
						}
					});
					/* clear the box, disable button */
					$("#popupInput").val(defaultVal);
					$("#popupSaveButton").unbind("click");
					
					$("#popupCancelButton").click(function(){
						$.colorbox.close();
					});
					$("#popupInput").change(function(){
						checkInput();
					});
					$("#popupInput").keydown(function(event){
						if(event.which == 13){
							/* enter pressed */
							$("#popupSaveButton").click();
						} else{
							checkInput();
						}
					});
					
				}
			});
		}
	}
	musicMentor.hideSongDetails()
})