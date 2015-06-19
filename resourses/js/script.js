var regularGame = [['paper', 'afraid of scissors', 'resourses/images/paper.png', 'stone', 'scissors'],['scissors', 'afraid of stones', 'resourses/images/scissors.png', 'paper', 'stone'],['stone', 'afraid of paper sheets', 'resourses/images/stone.png', 'scissors', 'paper']];

var new_game = document.getElementById('new_game');
new_game.onclick = function(){
	var wrapper = document.getElementsByClassName('wrapper')[0];
	var game_wrap = document.createElement('div');
	game_wrap.className = 'game-wrap';
	var caracters_list = document.createElement('ul');
	caracters_list.id = 'game';
	wrapper.appendChild(game_wrap);
	game_wrap.appendChild(caracters_list);
	var Application = new App().initialize(regularGame);
}