function insertElements(){
	alert("Insert Colorbox popup here");
	
}

function appendElements(){	
	var comp = document.getElementById('composition');
	var newdiv = document.createElement('div');
	newdiv.innerHTML='<a onclick="insertElements();"><img class="note" src="../imgs/Cnew.PNG" alt="" height /></a>';
	var temp = comp.innerHTML+newdiv.innerHTML;
	comp.innerHTML=temp;
}

