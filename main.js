var value = "";
var bin = "";
var type = "";

function changeP(){
	value = document.getElementById("input").value;
	if(type == "ub"){
		if(value.match("/d+")){
			document.getElementById("value").innerHTML = "hey";
		}
	}
	document.getElementById('value').innerHTML = value;
}
function signedByte(){
	unClick()
	document.getElementById("sb").style.borderWidth = "5";
	
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
	unClick()
	document.getElementById("ub").style.borderWidth = "5";
	
	value = ""+Math.floor(Math.random()*256);
	document.getElementById('value').innerHTML = value;
	bin = ubBin(value.valueOf());
	document.getElementById('type').innerHTML = "Unsigned Byte Integer";
	type = "ub";
	showBytes(1,bin);
}

function string(){
	unClick()
	document.getElementById("string").style.borderWidth = "5";
	
	var strings = ["ABcd","Hello","1234","abc123"];
	value = strings[Math.floor(Math.random()*strings.length)];
	document.getElementById('value').innerHTML = "\""+value+"\"";
	bin = sBin(value) + "00000000";
	document.getElementById('type').innerHTML = "String";
	type = "string";
	showBytes(value.length+1,bin);
}

function boolean(){
	unClick()
	document.getElementById("boolean").style.borderWidth = "5";
	
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
	unClick();
	document.getElementById("float").style.borderWidth = "5";
    value = 0;
    if (Math.random() < .8) {
        value = 1;
        bin = "0"
    }
    else {
        value = -1;
        bin = "1"
    }
    var exp = Math.floor(Math.random() * 256);
    var tb = ubBin(exp);
    for (var i = tb.length; i < 8; i++){
        tb = "0" + tb;
    }
    bin = bin + tb;
    var sig = Math.floor(Math.random() * Math.pow(2, 23));
    tb = ubBin(sig);
    for (var i = tb.length; i < 23; i++){
        tb = "0" + tb;
    }
    bin = bin + tb;

    value = (value + (sig * Math.pow(10, -23))) * Math.pow(2, exp - 127);
    value = value + ""
    if (value.indexOf(".") == -1){
        value = value + ".0";
    }

    document.getElementById('value').innerHTML = value;
    document.getElementById('type').innerHTML = "Single Precision Floating Point Decimal";
    type = "f";
    showBytes(4, bin);
}

function double(){
	unClick()
	document.getElementById("double").style.borderWidth = "5";
    value = 0;
    if (Math.random() < .8) {
        value = 1;
        bin = "0";
    }
    else {
        value = -1;
        bin = "1";
    }
    var exp = Math.floor(Math.random() * Math.pow(2,12));

	var tb = ubBin(exp);
    for (var i = tb.length; i < 11; i++) {
        tb = "0" + tb;
    }
    bin = bin + tb;
    var sig = Math.floor(Math.random() * Math.pow(2, 52));
    tb = ubBin(sig);
    for (var i = tb.length; i < 52; i++) {
        tb = "0" + tb;
    }
    bin = bin + tb;

    value = (value + (sig * Math.pow(10, -52))) * Math.pow(2, exp - 1023);
    value = value + "";
    if (value.indexOf("Inf") != -1) { double();}
    if (value.indexOf(".") == -1) {
        value = value + ".0";
    }

    document.getElementById('value').innerHTML = value;
    document.getElementById('type').innerHTML = "Double Precision Floating Point Decimal";
    type = "d";
    showBytes(8, bin);
}

function unClick(){
	document.getElementById("boolean").style.borderWidth = "2";
	document.getElementById("sb").style.borderWidth = "2";
	document.getElementById("ub").style.borderWidth = "2";
	document.getElementById("string").style.borderWidth = "2";
	document.getElementById("float").style.borderWidth = "2";
	document.getElementById("float").style.borderWidth = "2";
	document.getElementById("double").style.borderWidth = "2";
	
	document.getElementById("input").style.visibility = "visible";
	document.getElementById("b1").style.visibility = "visible";
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
		t = t+ts;
	}
	return t;
}

function showBytes(b, str){
    var i = 0;
	showHex(b, str);
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

function showHex(b, binStr){
	hexStr = "";
	i = 0;
	for(i = 0;i<binStr.length;i+=4){
		val = 0;
		for(k = 0;k<4;k++){
			val += binStr.charAt(binStr.length-i-k-1).valueOf() * Math.pow(2,k);
		}
		char = ""+val;
		if(val == 10){char = "A";}
		if(val == 11){char = "B";}
		if(val == 12){char = "C";}
		if(val == 13){char = "D";}
		if(val == 14){char = "E";}
		if(val == 15){char = "F";}
		hexStr = char+hexStr;
	}
	for(i = hexStr.length;i<b*2;i++){
		hexStr = "0"+hexStr;
	}
	//document.getElementById("hexValue").innerHTML = hexStr;
	
	//hide all bytes
	for (i = 0; i < 8; i++){
		document.getElementById("byte" + i+"h").style.visibility = "hidden";
		document.getElementById("byte"+i+"h").style.float = "right";
	}
	//shows b bytes
	for(i = 0;i<b;i++){
		document.getElementById("byte"+i+"h").style.visibility = "visible";
		document.getElementById("byte"+i+"h").style.float = "left";
	}
	//fills in bits for b bytes
	for(i = 0;i<b*2;i++){		
		if(i < hexStr.length){
			document.getElementById("hex"+Math.floor(i/2)+""+(i%2)).innerHTML = hexStr.charAt(hexStr.length-i-1);
		}
		else{
			document.getElementById("bit"+Math.floor(i/2)+i%2).innerHTML = "0";
		}
	}
}
