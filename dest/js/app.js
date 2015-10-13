/*
* init application
* */


var baseURL = location.origin,
	jsonPath = baseURL + '/dest/data/characters.json',
	container = document.querySelector('#game');

getJSON = function(url) {
	return new Promise(function(resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.open('get', url, true);
		xhr.responseType = 'json';
		xhr.onload = function() {
			var status = xhr.status;
			if (status == 200) {
				resolve(xhr.response);
			} else {
				reject(status);
			}
		};
		xhr.send();
	});
};

var App = new Game(container,{
	'url'	: jsonPath
});
/*
* app.ja Application file
* */
;var Game = Game || {};
function Game(constainer,param) {
	var d = document,
		overlay = d.querySelector('.overlay');
	this.container = container;
	this.params = param;
	//var overlay = d.querySelector('.overlay');
	this.init = function () {
		this.pageIndex();
		//this.getCharacterJSON();
	},

	this.pageIndex = function(){
		var _this = this,
			title = d.createElement('h1'),
			button_set = d.createElement('div'),
			new_game = d.createElement('span'),
			results = d.createElement('span');

		title.innerText = 'test your luck';
		button_set.className = 'button_set';
		new_game.className = 'btn';
		new_game.innerText = 'new game';
		results.className = 'btn';
		results.innerText = 'view score';
		button_set.appendChild(new_game);
		button_set.appendChild(results);
		this.container.appendChild(title);
		this.container.appendChild(button_set);
		new_game.onclick = function(){
			_this.updateView();
			_this.getCharacterJSON();
		};
	},

	this.updateView = function(){
		this.container.innerHTML = '';
	},

	this.getCharacterJSON = function(){
		var _this = this,
			url = _this.params.url;
		getJSON(url).then(function(data) {
			_this.characterJSON = data;
			_this.startGame();
		}, function(status) {
			alert('Something went wrong.');
		});
	},

	this.startGame = function(){
		var _this = this;
		this.characterCount = _this.characterJSON.length;
		for(i=this.characterCount; i > 0 ; --i){
		 	_this.createCharacter(_this.characterJSON[i-1], 'user');
		 };
	},

	this.createCharacter = function(object, itemClass) {
		var place = place;
		var characterItem = d.createElement('li');
		characterItem.id = object.name;
		characterItem.className = itemClass;
		this.characterItem = characterItem;
		var characterDescription = d.createElement('span');
		characterDescription.innerHTML = '<span class="description">' + object.description + '</span>';
		characterImage = d.createElement('img');
		characterImage.src = object.img_url;
		characterItem.appendChild(characterImage);
		characterItem.appendChild(characterDescription);
		container.appendChild(characterItem);
		this.charName = object.name;
		this.loose = object.lose;
		this.win = object.win;
		this.observeClick(this);
	},
	this.observeClick = function(obj){
		var _this = this;
		var el = obj.characterItem;
		var user = [obj.charName,obj.win,obj.loose]
		el.onclick = function() {
			if (container.className !== 'game-start') {
				container.className = 'game-start wrapper';
				var el = this;
				el.className = "hide_description";
				setTimeout(function(){
					el.className = 'selected';
				}, 1000);
				_this.cpuChoice(user);
			} else {
				var restart = confirm('Do you went play again?');
				if (restart){
					
				}else{
					return;
				}
			}
		}
	},
	this.cpuChoice = function(userChoice) {
		var _this = this;
		var userChoice = userChoice;
		var vs = d.createElement('li');
		vs.className = 'vs';
		vs.innerHTML = '<span>vs</span>';
		setTimeout(function(){
			container.appendChild(vs)
		}, 1500);
		var count = this.characterCount;
		var cpu = Math.floor(Math.random() * count);
		setTimeout(function(){
			_this.createCharacter(_this.characterJSON[cpu],'cpu');
		}, 2000)
		var cpuChoice = _this.characterJSON[cpu].name;
		this.compare(userChoice, cpuChoice)
	},
	this.compare = function(user, cpu) {
		var _this = this;
		var compareResultWrap = d.createElement('div');
		compareResultWrap.className = 'compare-result-wrap';
		var result = d.createElement('h2');
		result.className = 'result';
		setTimeout(function(){
			overlay.className += " active"
			switch(cpu) {
				case user[0]:
					result.innerHTML = "The result is tie.";
					result.className += " tie"
					break;
				case user[1]:
					result.innerHTML = "You are win!!!";
					result.className += " win"
					break;
				case user[2]:
					result.innerHTML = "You are lose...";
					result.className += " lose"
					break;
				default: 
					result.innerHTML = "Thomesing goes wrong... please, reload this page";
			}
		}, 3000);
		compareResultWrap.appendChild(result);
		console.log(document.	querySelector('.wrapper'));
		document.querySelector('.wrapper').appendChild(compareResultWrap);
		setTimeout(function(){
			_this.addButtonSet();
		},3000);
	},
	this.addButtonSet = function() {
		var again = d.createElement('span')
		again.className ='btn';
		again.innerHTML = 'Play again'
		
		var buttonwrap = d.createElement('div');
		buttonwrap.appendChild(again);
		d.getElementsByClassName('compare-result-wrap')[0].appendChild(buttonwrap);
		again.onclick = function(){
			location.reload();
		}
	}

	this.init();

	// Start Game

	

}
/*
* character_constraction.js
* */
;var gameCharacter = document.getElementById('game');

function Character(name, descriptions, imageUrl, win, lose) {
	this.name = name
	this.descriptions = descriptions
	this.imageUrl = imageUrl
	this.win = win
	this.lose = lose
	this.initialize = function () {
		var characterItem = document.createElement('li');
		characterItem.id = this.name;
		characterItem.setAttribute('data-win', this.win);
		characterItem.setAttribute('data-lose', this.lose);
		characterItem.setAttribute('data-name', this.name);
		var characterImage = document.createElement('img');
		characterImage.src = this.imageUrl;
		var descriptions = document.createElement('span');
		descriptions.innerHTML = this.descriptions;
		characterItem.appendChild(characterImage);
		characterItem.appendChild(descriptions);
		gameCharacter.appendChild(characterItem);
	}
}