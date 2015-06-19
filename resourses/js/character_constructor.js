var gameCharacter = document.getElementById('game');

/************************
* Character constructor 
*************************/

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
		gameCharacter.appendChild(characterItem)
	//	this.change(characterItem);
	}//,
	/*this.change = function(el) {
		el.onclick = function(){
			alert(name);
		}
	}*/
}