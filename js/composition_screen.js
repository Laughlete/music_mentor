function insertElements(){
	$.colorbox({
		inline: true,
		href: "#popup",
		onComplete: function(){
			
		}
	});
}

function appendElements(){	
	var comp = document.getElementById('composition');
	var newdiv = document.createElement('div');
	newdiv.innerHTML='<span class="note" onclick="insertElements();"></span>';
	var temp = comp.innerHTML+newdiv.innerHTML;
	comp.innerHTML=temp;
}

		function playPressed(){
			var text = "<img src=\"../imgs/button_pause.png\" height =\"50%\" onClick ='pausePressed()'> "
			text += " <img src=\"../imgs/button_stop_brown.png\" height =\"50%\" onClick =\"stopPressed()\">"
            text += " <img src=\"../imgs/button_rewind.png\" height =\"50%\">"
            text += " <img src=\"../imgs/button_forward.png\" height =\"50%\">"
			document.getElementById("playback").innerHTML = text;
		}
		function stopPressed(){
			var text = " <img src=\"../imgs/button_play.png\" height =\"50%\" onClick =\"playPressed()\">"
			document.getElementById("playback").innerHTML = text;
		}
		
		function pausePressed(){
			var text = "<img src=\"../imgs/button_play_brown.png\" height =\"50%\" onClick ='playPressed()'> "
			text += " <img src=\"../imgs/button_stop_brown.png\" height =\"50%\" onClick =\"stopPressed()\">"
            text += " <img src=\"../imgs/button_rewind.png\" height =\"50%\">"
            text += " <img src=\"../imgs/button_forward.png\" height =\"50%\">"
			document.getElementById("playback").innerHTML = text;
		}

