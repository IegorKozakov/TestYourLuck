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
* app.js Application file
* */

function Game(container,param) {
	var d = document;
	this.container = container;
	this.params = param;
	this.defender = true;
	this.init = function () {
        this.checkStorage();
        this.container.appendChild(this.createButtons());
	};

	this.checkStorage = function(){
        if(localStorage.getItem('score')){
            this.score = localStorage.getItem('score');
        } else {
            var storage = 'You need to play at lees one game to see your score';
            localStorage.setItem('score', storage);
            this.score = storage;
        }
	};

	this.createButtons = function(){
		var _this = this,
			button_set = _this.createElem('div', 'button_set', ''),
			new_game = _this.createElem('span', 'btn new_game', 'new game'),
			results = _this.createElem('span', 'btn view_results', 'view score');

        new_game.onclick = function(){
			_this.defender = true;
            _this.updateView();
            _this.getCharacterJSON();
        };
        results.onclick = function(){
            _this.updateView();
            _this.viewResults();
        };

        button_set.appendChild(new_game);
        button_set.appendChild(results);

        return button_set;
    };

	this.createElem = function(elTeg, className, text){
		elem = d.createElement(elTeg);

		if (className.length){
			elem.className = className;
		}

		if (text.length) {
			elem.textContent = text;
		}

        return elem;
	};

	this.updateView = function(){
		this.container.innerHTML = '';
	};

	this.getCharacterJSON = function(){
		var _this = this,
			url = _this.params.url;
		getJSON(url).then(function(data) {
			_this.characterJSON = data;
            _this.characterCount = _this.characterJSON.length;
			_this.startGame();
		}, function(status) {
			alert('Something went wrong.' + ' ' + status);
		});
	};

	this.startGame = function(){
		var _this = this;

		_this.characterList = this.createElem('ul', 'character_list', false);

        for(i=this.characterCount; i > 0 ; --i){
			var j = i-1;
			_this.characterList.appendChild(_this.createCharacter(_this.characterJSON[j], 'user', j, true));
        }

        container.appendChild(_this.characterList);
	};

	this.createCharacter = function(object, itemClass, jNumber, clicable) {
        var _this = this,
            characterItem = this.createElem('li', itemClass, false),
            characterDescription = this.createElem('span', false, false),
            descriptionInner = this.createElem('span', 'description', object.description),
            characterImage = this.createElem('img', false, false);

        characterDescription.appendChild(descriptionInner);
		characterImage.src = object.img_url;
		characterItem.appendChild(characterImage);
        if(clicable) {
            characterItem.appendChild(characterDescription);
        }

		this.observeClick(characterItem, jNumber);

		return characterItem;
	};

	this.observeClick = function(el, jNumber){
		var _this = this;

		el.onclick = function() {
			if(_this.defender) {
				var elem = this,
					user = [_this.characterJSON[jNumber].name,_this.characterJSON[jNumber].win,_this.characterJSON[jNumber].lose];
				//console.log(_this.characterJSON[jNumber]);
				_this.defender = false;

				elem.className = 'selected';

				var unselecterd = d.getElementsByClassName('user');
				for (i = unselecterd.length; i > 0; i--) {
					var el = unselecterd[i - 1];

					_this.hideUnselectedCharacters(el);

					setTimeout(function () {
						elem.style.width = '36%';
					}, 1000)
				}

				_this.cpuChoice(user);
			}
		}
	};

	this.hideUnselectedCharacters = function(el){
		var _this = this;

		el.style.opacity = 0;

		setTimeout(function(){
			el.style.width = 0;
		},1000);
	};

	this.cpuChoice = function(userChoice) {
		var _this = this,
			vs = _this.createElem('span', 'vs', 'vs'),
            count = this.characterCount,
            cpu = Math.floor(Math.random() * count),
            cpuChoice = _this.characterJSON[cpu].name;

        setTimeout(function(){
			container.appendChild(vs);
			vs.style.zoom = 0;
		}, 1500);

		setTimeout(function(){
			_this.characterList.appendChild(_this.createCharacter(_this.characterJSON[cpu],'cpu', cpu, false));
		}, 2000);

		setTimeout(function() {
			_this.compare(userChoice, cpuChoice)
		},3000);
	};

	this.compare = function(user, cpu) {
		var _this = this,
			compareResultInner = _this.createElem('div', 'compare-result-inner', false),
			compareResultWrap = _this.createElem('div', 'compare-result-wrap', false),
			result = _this.createElem('h2', 'result', false);

		switch(cpu) {
			case user[0]:
				result.innerHTML = "The result is tie.";
				result.className += " tie";
                _this.changeScore('tie');
				break;
			case user[1]:
				result.innerHTML = "You won!!!";
				result.className += " win";
                _this.changeScore('win');
				break;
			case user[2]:
				result.innerHTML = "you lose...";
				result.className += " lose";
                _this.changeScore('lose');
				break;
			default:
				result.innerHTML = "Something goes wrong... please, reload this page";
		}
		compareResultInner.appendChild(result);
		compareResultWrap.appendChild(compareResultInner);
		document.querySelector('.wrapper').appendChild(compareResultWrap);
		setTimeout(function(){
			compareResultInner.appendChild(_this.createButtons());
		},500);
	};

	this.changeScore = function(result){
        var _this = this;

        this.checkStorageObject();

        if(typeof _this.score !== 'object') {
            _this.score = {
                'win': 0,
                'lose': 0,
                'tie': 0
            }
        }

		_this.score[result] += 1;

		localStorage.setItem('score', JSON.stringify(_this.score));
    };

    this.checkStorageObject = function(){
        var _this = this;

        if(typeof _this.score !== 'object'){
            try {
                _this.score = JSON.parse(_this.score);
            } catch (exception) {
                return _this.score;
            }
        }
    };

    this.viewResults = function(){
		var _this = this,
			results_wrap = this.createElem('div', 'results_wrap', false),
			new_game = _this.createElem('span', 'btn new_game', 'new game');

        this.checkStorageObject();

		if(typeof _this.score == 'object'){
            for(var key in _this.score){

                var content,
                    count = _this.score[key].toString(),
                    count_wrap = _this.createElem('span', 'count', count);

                switch(key){
                    case 'win':
                        content = 'wins: ';
                        break;
                    case 'lose':
                        content = 'losses: ';
                        break;
                    case 'tie':
                        content = 'draws: ';
                        break;
                }

                var text = _this.createElem('span', 'result_item '+key, content);

                text.appendChild(count_wrap);
                results_wrap.appendChild(text);
            }

            var totalCountInner = (_this.score['win'] + _this.score['lose'] + _this.score['tie']).toString(),
                totalCount = _this.createElem('span', 'count', totalCountInner),
			    total = _this.createElem('span', 'result_item total', 'total');
            console.log(totalCountInner);
            total.appendChild(totalCount);
            results_wrap.appendChild(total);

		} else {
            var text = _this.createElem('span', 'play_game', _this.score);
            results_wrap.appendChild(text);
		}

		new_game.onclick = function(){
			_this.defender = true;
			_this.updateView();
			_this.getCharacterJSON();
		};
		
		results_wrap.appendChild(new_game);
        _this.container.appendChild(results_wrap);
    };

	// Start Game

    this.init();
};