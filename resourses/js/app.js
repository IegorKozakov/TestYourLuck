var App = App || {};
function App() {
	var container = document.getElementById('game');
	var overlay = document.getElementsByClassName('overlay')[0];
	this.initialize = function (response) {
		this.characterCount = response.length;
		this.response = response;
		var new_game = document.getElementById("new_game");
		new_game.parentNode.removeChild(new_game);

		for(i=this.characterCount; i > 0 ; --i){
			this.createCharacter(response[i-1], 'user');
		};
	},
	this.createCharacter = function(array, itemClass) {
		var place = place;
		var characterItem = document.createElement('li');
		characterItem.id = array[0];
		characterItem.className = itemClass;
		this.characterItem = characterItem;
		var characterDescription = document.createElement('span');
		characterDescription.innerHTML = '<span class="description">' + array[1] + '</span>';
		characterImage = document.createElement('img');
		characterImage.src = array[2];
		characterItem.appendChild(characterImage);
		characterItem.appendChild(characterDescription);
		container.appendChild(characterItem);
		this.charName = array[0];
		this.loose = array[4];
		this.win = array[3];
		this.observeClick(this);
	},
	this.observeClick = function(obj){
		var _this = this;
		var el = obj.characterItem;
		var user = [obj.charName,obj.win,obj.loose]
		el.onclick = function() {
			if (container.className !== 'game-start') {
				container.className = 'game-start';
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
		var vs = document.createElement('li');
		vs.className = 'vs';
		vs.innerHTML = '<span>vs</span>';
		setTimeout(function(){
			container.appendChild(vs)
		}, 1500);
		var count = this.characterCount;
		var cpu = Math.floor(Math.random() * count);
		setTimeout(function(){
			_this.createCharacter(_this.response[cpu],'cpu');
		}, 2000)
		var cpuChoice = _this.response[cpu][0];
		this.compare(userChoice, cpuChoice)
	},
	this.compare = function(user, cpu) {
		var _this = this;
		var compareResultWrap = document.createElement('div');
		compareResultWrap.className = 'compare-result-wrap';
		var result = document.createElement('h2');
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
		document.getElementsByClassName('wrapper')[0].appendChild(compareResultWrap);
		setTimeout(function(){
			_this.addButtonSet();
		},3000);
	},
	this.addButtonSet = function() {
		var again = document.createElement('span')
		again.className ='btn';
		again.innerHTML = 'Play again'
		
		var buttonwrap = document.createElement('div');
		buttonwrap.appendChild(again);
		document.getElementsByClassName('compare-result-wrap')[0].appendChild(buttonwrap);
		again.onclick = function(){
			location.reload();
		}
	}
}