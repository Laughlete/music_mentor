function insertElements(id){
	$.colorbox({
		inline: true,
		href: "#popup",
		opacity: 0.6,
		onComplete: function(){
			$("#noteEntry").text("");
			$("#popup span.note.a").click(function(){noteClicked("a")});
			$("#popup span.note.b").click(function(){noteClicked("b")});
			$("#popup span.note.c").click(function(){noteClicked("c")});
			$("#popup span.note.d").click(function(){noteClicked("d")});
			$("#popup span.note.e").click(function(){noteClicked("e")});
			$("#popup span.note.f").click(function(){noteClicked("f")});
			$("#popup span.note.g").click(function(){noteClicked("g")});
		},
		onClosed: function(){
			var newNote = $("#noteEntry").text();
			$(id).attr("class", "note " + newNote);
		}
	});
	
	function noteClicked(note){
		var selectedVal = document.getElementById('variations').value;
		$("#noteEntry").text(note + selectedVal);		
		$.colorbox.close();
	}
}



function appendElements(){	
	var comp = document.getElementById('composition');
	var newdiv = document.createElement('div');
	var num = $("#composition span.note").size();
	newdiv.innerHTML='<span class="note" onclick="insertElements(note'+num+');" id="note'+num+'"></span>';
	var temp = comp.innerHTML+newdiv.innerHTML;
	comp.innerHTML=temp;
}

