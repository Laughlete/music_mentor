function insertElements(id){
	$.colorbox({
		inline: true,
		href: "#popup",
		opacity: 0.6,
		onComplete: function(){
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
			$(id).removeClass("a").removeClass("amin").removeClass("asus2").removeClass("asus4").removeClass("a7").removeClass("aM7").removeClass("adim");
			$(id).removeClass("b").removeClass("bmin").removeClass("bsus2").removeClass("bsus4").removeClass("b7").removeClass("bM7").removeClass("bdim");
			$(id).removeClass("c").removeClass("cmin").removeClass("csus2").removeClass("csus4").removeClass("c7").removeClass("cM7").removeClass("cdim");
			$(id).removeClass("d").removeClass("dmin").removeClass("dsus2").removeClass("dsus4").removeClass("d7").removeClass("dM7").removeClass("ddim");
			$(id).removeClass("e").removeClass("emin").removeClass("esus2").removeClass("esus4").removeClass("e7").removeClass("eM7").removeClass("edim");
			$(id).removeClass("f").removeClass("fmin").removeClass("fsus2").removeClass("fsus4").removeClass("f7").removeClass("fM7").removeClass("fdim");
			$(id).removeClass("g").removeClass("gmin").removeClass("gsus2").removeClass("gsus4").removeClass("g7").removeClass("gM7").removeClass("gdim");
			$(id).addClass(newNote);
		}
	});
	
	function noteClicked(note){
		var selectedVal = document.getElementById('variations').value;
		
		if(selectedVal == "major"){
			$("#noteEntry").text(note);
		}
		
		if(selectedVal == "minor"){
			$("#noteEntry").text(note + "min");
		}
		
		if(selectedVal == "suspended 2nd"){
			$("#noteEntry").text(note +"sus2");
		}
		
		if(selectedVal == "suspended 4th"){
			$("#noteEntry").text(note +"sus4");
		}
		
		if(selectedVal == "minor seventh"){
			$("#noteEntry").text(note +"7");
		}
		
		if(selectedVal == "major seventh"){
			$("#noteEntry").text(note +"M7");
		}
		
		if(selectedVal == "diminished"){
			$("#noteEntry").text(note + "dim");
		}
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

