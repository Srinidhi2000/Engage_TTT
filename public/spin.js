var cnt=false;
function handleSpin(){
if(!cnt){var x=1024;
    var y=9999;
    var deg=Math.floor(Math.random()*(x-y))+y;
    console.log(deg);
    cnt=true;
document.getElementById('box').style.transform="rotate("+deg+"deg)";
var element=document.getElementById('mainCircle');
element.classList.remove('animate');
setTimeout(function(){
element.classList.add('animate');
},5000);
var absDeg=deg-(Math.floor(deg/360)*360);
var spinTile;
if((absDeg>=0&&absDeg<22.5)||(absDeg>=337.5&&absDeg<=360)){
spinTile="150";
}else if(absDeg>=292.5){
spinTile="10";
}else if(absDeg>=247.5){
spinTile="250";
}else if(absDeg>=202.5){
spinTile="300";
}else if(absDeg>=157.5){
    spinTile="50";
}else if(absDeg>=112.5){
        spinTile="0";
}else if(absDeg>=67.5){
    spinTile="350";
}else if(absDeg>=22.5){
    spinTile="75";
}
console.log(spinTile);
setTimeout(function(){
    document.getElementById('goBack').style.display="block";
    if(spinTile=="0"){
        document.getElementById('status').innerHTML="Oops!! Better Luck Next Time";
    }else{
        document.getElementById('status').innerHTML="Yayy!! You've earned "+spinTile+" points";
    }
},5000);
}
}
$(function(){
    $('#goBack').on('click',function(){
        window.location.reload(false); 
    });
  });
