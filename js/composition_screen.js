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

