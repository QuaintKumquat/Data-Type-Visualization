var value = "";
var bin = "";
var type = "";


function signedByte(){
	value = ""+(Math.floor(Math.random()*256) - 128);
	document.getElementById('value').innerHTML = value;
	if(value.valueOf() < 0){
	bin = ubBin(256+parseInt(value));
	}
	else{
	bin = ubBin(value.valueOf());
	}
	document.getElementById('type').innerHTML = "Signed Byte Integer";
	type = "sb";
	showBytes(1,bin);
}

function unsignedByte(){
	value = ""+Math.floor(Math.random()*256);
	document.getElementById('value').innerHTML = value;
	bin = ubBin(value.valueOf());
	document.getElementById('type').innerHTML = "Unsigned Byte Integer";
	type = "ub";
	showBytes(1,bin);
}

function string(){
	var strings = ["ABcd","Hello","1234","abc123"];
	value = strings[Math.floor(Math.random()*strings.length)];
	document.getElementById('value').innerHTML = "\""+value+"\"";
	bin = sBin(value);
	document.getElementById('type').innerHTML = "String";
	type = "string";
	showBytes(value.length,bin);
}

function boolean(){
	if(Math.random() < 0.5){
		document.getElementById('value').innerHTML = "False";
		bin = "0";
	}
	else{
		document.getElementById('value').innerHTML = "True";
		bin = "1";
	}
	document.getElementById("type").innerHTML = "Boolean";
	type="boolean";
	showBytes(1,bin);
}

function float(){
    value = "" + 123.45;
    document.getElementById('value').innerHTML = value;
    bin = "0";
    document.getElementById('type').innerHTML = "Floating Point Decimal";
    type = "f";
    showBytes(4, bin);
}

function ubBin(n){
	if(n == 0){return "";}
	else{return ubBin(Math.floor(n/2)) + n%2;}
}
function sBin(str){
	var i = 0;
	var t = "";
	for(i = 0;i<str.length;i++){
		var ts = ubBin(str.charCodeAt(i));
		var k = 0;
		for(k = ts.length;k<8;k++){ts = "0"+ts;}
		t = ts+t;
	}
	return t;
}

function showBytes(b,str){
    var i = 0;

    //hide all bytes
    for (i = 0; i < 8; i++){
        document.getElementById("byte" + i).style.visibility = "hidden";
        document.getElementById("byte"+i).style.float = "right";
    }
    //shows b bytes
	for(i = 0;i<b;i++){
		document.getElementById("byte"+i).style.visibility = "visible";
		document.getElementById("byte"+i).style.float = "left";
	}
    //fills in bits for b bytes
	for(i = 0;i<b*8;i++){		
		if(i < str.length){
			document.getElementById("bit"+Math.floor(i/8)+""+(i%8)).innerHTML = str.charAt(str.length-i-1);
		}
		else{
			document.getElementById("bit"+Math.floor(i/8)+i%8).innerHTML = "0";
		}
	}
}