// JavaScript Document
var panel = new Array(16); //パネルのDOM情報
var panel_state = new Array(16); //パネルの状態
var point = 0; //自分のいるパネル
var state = 0; //ルーレットの状態　　０：ストップ   １：ルーレット
var roulette;//イベント登録

$(function(){ 
	setup();
	$("#start").click(function(){//スタートボタンを押した時
		if(state == 0){
			state = 1;
			roulette = setInterval("time_move()",100);	
		}
	});
	$("#stop").click(function(){//ストップボタンを押した時
		if(state == 1){
			state = 0;
			clearInterval(roulette);
			time_stop();
		}
	});
	$("#reset").click(function(){//リセットボタンを押した時
		state = 0;
		clearInterval(roulette);
		clear();	
	});
});


function setup(){//初期設定
	var count=1;
		for(var i = 0; i<4; i++){
			$("table").append("<tr></tr>");
			var tab = $("table tr").eq(i);
			for(var j=0; j<4; j++){
				tab.append("<td>" +count + "</td>");
				//$("td").eq(count-1).attr("id","panel"+count);
				var _count = count-1;
				panel[count-1] = $("td:eq("+_count+")");
				panel_state[count-1] = true;
				count ++;
			}
		}
}


function time_move(){//ルーレット処理
	renewal();	
	change_point();
	panel[point].css("background-color","green");
}


function renewal(){//パネル更新
	for(var i=0; i<16; i++){
		if(	panel_state[i] == true){
			var _tr = Math.floor(i/4);	
			var _td = i % 4;
			panel[i].css("background-color","white");
		}else{
			panel[i].css("background-color","orange");
		}
	}
}


function change_point(){//空いたパネルを避けpoint移動
	change();
	while(true){
		if(panel_state[point] == true) {
			break;
		}else{
			change();
		}
	}
}


function change(){ //ランダム移動
	point = Math.floor( Math.random() * 16);
}


function time_stop(){
	panel_state[point] = false;
	renewal();
	if(check()) state = 3;//全てのパネルが空けられたらstateを３に
}


function check(){ //ゲームが続くならtrue、終わるならfalse
	for(var i=0; i<16; i++){
		if(panel_state[i] == true){
			return false;	
		}
	}
	return true;
}


function clear(){
	for(var i=0; i<panel.length+1; i++){
		panel_state[i] = true;
		point = 0;
	}
	renewal();
}
