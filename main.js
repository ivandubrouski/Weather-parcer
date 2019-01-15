window.addEventListener('load', function(){
	window.onmousedown = function(e){
		e.preventDefault();
	}
	var responseJson;
	function getAjaxJson(){
		var req = new XMLHttpRequest();
		req.onload = function(){
			responseJson = JSON.parse(req.responseText);
			console.log(responseJson);
			createHeaderView();

			var quantity = responseJson.list.length; 
			console.log(quantity);
			for(i = 1; i < quantity; i++){
				var iconPath = './icons/' + responseJson.list[i].weather[0].icon + '.png';
				createPartView(responseJson.list[i].dt_txt, iconPath, responseJson.list[i].main.temp);
			}
		}
		req.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?id=625144&units=metric&APPID=72b5c3fbb573e913e375b0d5a3431a9e' );
		req.send();
	}
	getAjaxJson();

	function createHeaderView(){
		document.querySelector('.town').textContent = responseJson.city.name + ', ' + responseJson.city.country;  
		document.querySelector('.time').textContent = responseJson.list[0].dt_txt;
		
		var iconName = responseJson.list[0].weather[0].icon;
		var fullIconPath = './icons/' + iconName + '.png';
		var iconElem = document.createElement('img');
		iconElem.src = fullIconPath;
		document.querySelector('.icon').appendChild(iconElem);

		document.querySelector('.temp').textContent = responseJson.list[0].main.temp + ' ℃';
		var windDirection = windDir(responseJson.list[0].wind.deg);
		document.querySelector('.direction').textContent = windDirection;
    // responseJson.list[0].wind.deg;
    document.querySelector('.speed').textContent = responseJson.list[0].wind.speed + ' m/s';
}

function createPartView(datum, iPath, temp){
	var partCnt = document.createElement('div');
	partCnt.className = 'partcnt';

	var datumCnt = document.createElement('div');
	datumCnt.className = 'datumcnt';
	datumCnt.textContent = datum;

	var iconCnt = document.createElement('div');
	iconCnt.className = 'iconcnt';
	var iconImg = document.createElement('img');
	iconImg.src = iPath;
	console.log(iPath);
	iconCnt.appendChild(iconImg);


	var tempCnt = document.createElement('div');
	tempCnt.className = 'tempcnt';
	tempCnt.textContent = temp + ' ℃';

	partCnt.appendChild(datumCnt);
	partCnt.appendChild(iconCnt);
	partCnt.appendChild(tempCnt);

	document.body.appendChild(partCnt);
}

function windDir(deg){
	switch(true){
		case (deg == 0):
		return 'North';
		case (deg > 0 && deg < 90):
		return 'North-east';
		case (deg == 90):
		return 'East';
		case (deg > 90 && deg <180):
		return 'South-east';
		case (deg ==180):
		return 'South';
		case (deg > 180 && deg < 270):
		return 'South-west';
		case (deg == 270):
		return 'West';
		case (deg > 270 && deg < 360):
		return 'North-west';
	}
}
});
