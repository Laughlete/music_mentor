function insertElements(id){
	$.colorbox({
		inline: true,
		href: "#popup",
		opacity: 0.6,
		onComplete: function(){
			$("#popup span.note.a").click(function(){$("#noteEntry").text("a");$.colorbox.close()});
			$("#popup span.note.b").click(function(){$("#noteEntry").text("b");$.colorbox.close()});
			$("#popup span.note.c").click(function(){$("#noteEntry").text("c");$.colorbox.close()});
			$("#popup span.note.d").click(function(){$("#noteEntry").text("d");$.colorbox.close()});
			$("#popup span.note.e").click(function(){$("#noteEntry").text("e");$.colorbox.close()});
			$("#popup span.note.f").click(function(){$("#noteEntry").text("f");$.colorbox.close()});
			$("#popup span.note.g").click(function(){$("#noteEntry").text("g");$.colorbox.close()});
		},
		onClosed: function(){
			var newNote = $("#noteEntry").text();
			$(id).removeClass("a").removeClass("b").removeClass("c").removeClass("d").removeClass("e").removeClass("f").removeClass("g").addClass(newNote);
		}
	});
}

function appendElements(){	
	var comp = document.getElementById('composition');
	var newdiv = document.createElement('div');
	var num = $("#composition span.note").size();
	newdiv.innerHTML='<span class="note" onclick="insertElements(note'+num+');" id="note'+num+'"></span>';
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

