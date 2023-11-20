var playersColors=["orange","red","green","blue"];
var noOfPlayers;
var playersNames =[];
var currentPlayer;
var currentPosition=[0,0,0,0];
var playersBalance=[1000,1000,1000,1000];
var winningBalance = 2000;

// add an event listener to main-button
document.getElementById("main-button").addEventListener("click",start);

// set all cells of players postion to white
for(var i = 0; i<4;i++){
    for(var j = 0; j<32;j++){
        document.getElementById("c"+j+"-p"+i).style.backgroundColor = "white";
    }
}

function start(){
    var fn_name = document.getElementById("main-button").innerHTML.toLowerCase();
    switch(true){
        case fn_name === "start":
            intialize();
            break;
        case fn_name === "shuffle":
            shuffle();
            break;
        case fn_name.slice(fn_name.length - 4, fn_name.length) === "play":
            play();
            break;
    } 
}

function intialize(){
    
    noOfPlayers=prompt("How many players ?");
    for(var i =0; i< noOfPlayers; i++){       
        var name=prompt("Name of Player " +  (i + 1).toString() + " : ");
        name=name.slice(0,1).toUpperCase()  +name.slice(1,name.length)  //initcap first letter.
        document.getElementById("player"+i+"-name").innerHTML=name;
        document.getElementById("player"+i+"-color").style.backgroundColor=playersColors[i];
        playersNames.push(name);
    }
    document.getElementById("main-message").innerHTML = "Welcome " + playersNames;
    document.getElementById("main-button").innerHTML = "Shuffle";
}

function shuffle(){

    for(var i=0; i<noOfPlayers;i++){
        var randomIndex = Math.floor( Math.random() * noOfPlayers);
        var temp = playersNames[i];
        playersNames[i]=playersNames[randomIndex];
        playersNames[randomIndex] =temp;
    }
    for(var i=0; i<noOfPlayers;i++){
        document.getElementById("player"+i+"-name").innerHTML=playersNames[i];
        document.getElementById("player"+i+"-color").style.backgroundColor=playersColors[i];
        document.getElementById("player"+i+"-color").innerHTML = playersBalance[i];
        document.getElementById("c0-p"+i).style.backgroundColor=playersColors[i];
    }
    currentPlayer = 0;
    document.getElementById("main-button").innerHTML = playersNames[currentPlayer] + " to Play";
    document.getElementById("main-message").innerHTML = playersNames[currentPlayer] + " to Play " + ",Cuurent position =" + currentPosition[currentPlayer] + " ,Max =" + maxbalance();
}

function play(){

    var dice1 = Math.ceil(Math.random()*6);
    var dice2 = Math.ceil(Math.random()*6);

    document.getElementById("main-message").innerHTML = dice1 + " -- " + dice2 + " --- " + currentPosition[currentPlayer];
    document.querySelector("#dic1-pic img").setAttribute("src","./images/dice"+dice1+".png");
    document.querySelector("#dic2-pic img").setAttribute("src","./images/dice"+dice2+".png");
    
    var sum = dice1 +dice2;
    document.getElementById("c"+currentPosition[currentPlayer]+"-p"+currentPlayer).style.backgroundColor = "white";
    currentPosition[currentPlayer] += sum;
    if (currentPosition[currentPlayer] > 31){
        playersBalance[currentPlayer]+= 300;
        document.getElementById("player" + currentPlayer + "-color").innerHTML = playersBalance[currentPlayer];
        currentPosition[currentPlayer] %= 32;
    }
    document.getElementById("c"+currentPosition[currentPlayer]+"-p"+currentPlayer).style.backgroundColor = playersColors[currentPlayer];
    document.getElementById("main-message").innerHTML = "( " + dice1 + " , " + dice2 +" )" + " --- " + currentPosition[currentPlayer] +"-- max =" + maxbalance();

    // define the next player
    if (dice1 === dice2){
        document.getElementById("main-button").innerHTML= playersNames[currentPlayer] + " Replay";
    }else{
        currentPlayer = (currentPlayer + 1) % noOfPlayers;
        document.getElementById("main-button").innerHTML= playersNames[currentPlayer] + " Play";
    }
    if (maxbalance() > winningBalance){
        document.getElementById("main-message").innerHTML = "We Have a Winner ---- " + playersNames[winnerPlayer()];
        document.getElementById("main-button").classList.add("invisible");
    }

}

function maxbalance(){
    maxb = playersBalance[0];
    for(var i = 1 ; i < noOfPlayers; i++){
        if (playersBalance[i] > maxb){
            maxb = playersBalance[i];
        }
    }
    return maxb;
}

function winnerPlayer(){
    var wPlayer = -1;
    var max = -1;
    for(var i = 0; i < noOfPlayers; i++){
        if (playersBalance[i] > max){
            wPlayer = i;
            max = playersBalance[i];
        }
    }
    return wPlayer;
}