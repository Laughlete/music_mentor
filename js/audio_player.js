/* example from http://designmodo.com/audio-player/*/
$(function(){
	$("#audio-player").mediaelementplayer({
		alwaysShowControls: true,
		features: ['playpause', 'progress'],
		audioVolume: 'horizontal',
		audioWidth: 400,
		audioHeight: 120
	})
})