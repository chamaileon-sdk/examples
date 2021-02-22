(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.chamaileonLogo = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function createChamaileonLogo(config) {
	config = config || {};
	var eyeR = config.eyeR || 5.9367;
	var withLogo = typeof config.withLogo === "undefined" ? true : config.withLogo;
	var withText = config.withText;
	var changeColors = config.changeColors;
	var viewBox = config.viewBox;
	var middle = {
		x: 81.4629 / 2,
		y: 83.3113 / 2
	};

	function createPath(d) {
		var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		path.setAttribute("d", d);
		return path;
	}

	var atSign = createPath("M52.7219,22.3359l-0.3618,3.6613c-3.4074-2.795-7.6477-4.6842-12.2445-4.6842c-11.2485,0-20.3657,9.1185-20.3657,20.3664c0,11.2472,9.1172,20.3651,20.3657,20.3651c5.5375,0,10.5539-2.474,14.2244-6.1472c2.3168,3.6146,5.8085,6.1472,10.8105,6.1472c12.3141,0,16.3123-11.2722,16.3123-24.1547C81.4629,15.3453,63.5599,0,41.3945,0C18.4712,0,0,18.6607,0,41.6787s18.4712,41.6326,41.3945,41.6326c8.9988,0,17.6437-2.9365,24.1797-7.9568l-5.3743-5.9716c-5.3388,3.6778-11.9142,5.8768-18.8054,5.8768c-18.1871,0-32.8693-15.0151-32.8693-33.5811S23.2074,8.0515,41.3945,8.0515c18.0924,0,31.7327,12.4089,31.7327,29.6487c0,9.7566-1.4406,16.2926-7.3136,16.2926c-2.5575,0-3.9574-1.3675-4.7336-2.8417c-0.6052-1.1459-0.6644-2.7891-0.6683-4.6928V22.3359H52.7219z M40.1157,53.5527c-6.5583,0-11.8747-5.3151-11.8747-11.8741c0-6.5577,5.3164-11.8741,11.8747-11.8741c6.557,0,11.8735,5.3163,11.8735,11.8741C51.9891,48.2377,46.6727,53.5527,40.1157,53.5527z");

	var chars = {
		c: createPath("M111.7681,41.6557c0-9.2468,6.9175-17.0708,17.5227-17.0708c6.5952,0,10.6696,3.3627,12.7391,5.4315l-5.2388,5.8197c-2.0681-2.1984-4.3968-3.2977-7.1122-3.2977c-5.9492,0-9.3119,4.3324-9.3119,9.1172s3.3627,9.1178,9.3119,9.1178c2.7155,0,5.0441-1.0992,7.1122-3.2983l5.2388,5.8197c-2.0695,2.0695-6.1439,5.4315-12.7391,5.4315C118.6855,58.7264,111.7681,50.9024,111.7681,41.6557"),
		h: createPath("M178.4882,38.2936v19.4632h-8.5357v-18.041c0-4.6553-2.7812-7.1774-6.4662-7.1774c-4.8507,0-6.5965,3.8798-6.5965,9.0528v16.1656h-8.5344V11.3294h8.5344v18.1055c2.5221-3.3627,6.1439-4.85,9.7-4.85C175.1899,24.5849,178.4882,30.2105,178.4882,38.2936z"),
		a: createPath("M218.9604,25.5545v32.2023h-8.2765l-0.129-3.491c-2.9101,3.0384-6.7898,4.4606-10.4118,4.4606c-9.6987,0-16.1649-8.018-16.1649-17.0708s6.4662-17.0708,16.1649-17.0708c3.6219,0,7.5016,1.2932,10.346,4.2028l0.1947-3.2331H218.9604z M210.6839,41.6557c0-5.1085-4.01-9.1172-9.0528-9.1172c-5.0441,0-9.1172,4.0087-9.1172,9.1172s4.0732,9.1178,9.1172,9.1178C206.6739,50.7735,210.6839,46.7642,210.6839,41.6557z"),
		m: createPath("M279.2985,38.2936v19.4632h-8.5356v-18.041c0-4.6553-2.7155-7.1774-6.4018-7.1774c-4.8494,0-6.5952,3.8798-6.5952,9.0528v16.1656h-8.5356v-18.041c0-4.6553-2.7799-7.1774-6.4662-7.1774c-4.8494,0-6.5965,3.8798-6.5965,9.0528v16.1656h-8.5344V25.5545h8.2121l0.1934,4.0093c2.522-3.4916,6.2084-4.9789,9.8289-4.9789c5.3032,0,8.6002,2.1984,10.3459,5.7552c2.1339-3.7508,5.8848-5.7552,10.0224-5.7552C274.8359,24.5849,279.2985,30.2105,279.2985,38.2936z"),
		a2: createPath("M320.2457,25.5545v32.2023h-8.2779l-0.1289-3.491c-2.9101,3.0384-6.7899,4.4606-10.4105,4.4606c-9.7,0-16.1663-8.018-16.1663-17.0708s6.4663-17.0708,16.1663-17.0708c3.6206,0,7.5004,1.2932,10.346,4.2028l0.1934-3.2331H320.2457z M311.9678,41.6557c0-5.1085-4.0086-9.1172-9.0527-9.1172c-5.0427,0-9.1172,4.0087-9.1172,9.1172s4.0745,9.1178,9.1172,9.1178C307.9592,50.7735,311.9678,46.7642,311.9678,41.6557z"),
		i: createPath("M328.9498,25.5545h8.5356v32.2023h-8.5356V25.5545z"),
		l: createPath("M346.1107,11.3294h8.5357v46.4274h-8.5357V11.3294z"),
		e: createPath("M394.3898,44.4362h-24.5073c1.2288,4.8493,5.5611,6.4012,8.6002,6.4012c4.8493,0,7.3714-1.9392,9.3764-3.4266l5.1086,5.8197c-1.9405,1.4873-6.7899,5.496-14.0968,5.496c-10.4105,0-17.7174-7.1774-17.7174-17.2004c0-10.5394,7.9529-16.9412,17.0056-16.9412c9.5698,0,16.1663,6.7248,16.2307,16.6827V44.4362z M370.076,38.2285h15.519c-0.7762-3.2976-3.4916-5.8196-7.5003-5.8196C373.9557,32.4089,371.1113,34.7368,370.076,38.2285z"),
		o: createPath("M398.8168,41.5261c0-9.3757,7.6293-16.9412,17.4583-16.9412c9.7,0,17.3951,7.501,17.3951,16.9412c0,9.5704-7.7595,17.2004-17.3951,17.2004C406.5764,58.7264,398.8168,50.9669,398.8168,41.5261z M425.3923,41.5912c0-5.4967-4.2679-9.0528-9.0528-9.0528c-4.8493,0-9.1817,3.6212-9.1817,9.0528c0,5.4967,4.3968,9.1823,9.1817,9.1823C421.06,50.7735,425.3923,47.1516,425.3923,41.5912z"),
		n: createPath("M469.1786,38.2936v19.4632h-8.5357v-18.041c0-4.6553-2.7812-7.1774-6.4662-7.1774c-4.8507,0-6.5952,3.8798-6.5952,9.0528v16.1656h-8.5357V25.5545h8.2121l0.1934,4.0093c2.522-3.4916,6.2084-4.9789,9.8289-4.9789C465.8804,24.5849,469.1786,30.2105,469.1786,38.2936z")
	};

	var textGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
	for (var prop in chars) {
		var act = chars[prop];

		textGroup.appendChild(act);
	}

	var iDot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	iDot.setAttribute("cx", 333.2499);
	iDot.setAttribute("cy", 15.6098);
	iDot.setAttribute("r", 5.9367);

	textGroup.appendChild(iDot);

	var pupil = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	pupil.setAttribute("cx", middle.x);
	pupil.setAttribute("cy", middle.y);
	pupil.setAttribute("r", eyeR);

	var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	
	svg.setAttribute("version", "1.1");
	svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
	svg.setAttribute("xml:space", "preserve");

	if (withLogo && withText) {
		svg.setAttribute("viewBox", "0 0 469.1786 83.3113");
	} else if (withText) {
		svg.setAttribute("viewBox", "81.4629 0 469.1786 83.3113");
	} else {
		svg.setAttribute("viewBox", "0 0 81.4629 83.3113");
	}

	if (viewBox) {
		svg.setAttribute("viewBox", viewBox);
	}

	if (withLogo) {
		svg.appendChild(atSign);
	}

	if (withText) {
		svg.appendChild(textGroup);
	}

	svg.appendChild(pupil);

	var maxDist = 5;

	function setEyeProps(x, y) {
		var transform = svg.getScreenCTM();
		var inverseTransform = transform.inverse();

		var transformedPoint = svg.createSVGPoint();
		transformedPoint.x = x;
		transformedPoint.y = y;

		transformedPoint = transformedPoint.matrixTransform(inverseTransform);


		var dx = transformedPoint.x - middle.x;
		var dy = transformedPoint.y - middle.y;

		var dist = Math.sqrt(dx * dx + dy * dy);


		var rad = Math.atan2(dx, dy);
		var r = eyeR;

		if (dist > maxDist) {
			dx = Math.sin(rad) * maxDist;
			dy = Math.cos(rad) * maxDist;
		} else {
			r /= maxDist / dist;
		}

		if (changeColors) {
			svg.style.fill = "rgb(200, 200, " +  Math.floor(dist > 255 ? 255 : Math.floor(dist)) + ")";
		}

		pupil.setAttribute("cx", middle.x + dx);
		pupil.setAttribute("cy", middle.y + dy);
		pupil.setAttribute("r", r);
	}


	var randomX = Math.random() * window.innerWidth;
	var randomY = Math.random() * window.innerHeight;

	function setRandomPosition() {
		randomX += Math.floor(Math.random() * 1000 - 500);
		randomY += Math.floor(Math.random() * 1000 - 500);

		setEyeProps(randomX, randomY);
	}

	var timeoutId = null;
	function startRandomizing() {
		setRandomPosition();
		timeoutId = setTimeout(startRandomizing, Math.floor(Math.random() * 2000));
	}
	setTimeout(startRandomizing, 0);

	addEventListener("mousemove", function(event) {
		if (timeoutId) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}

		setEyeProps(event.clientX, event.clientY);
	});

	return svg;
};

},{}],2:[function(require,module,exports){
var createChamaileonLogo = require("./createChamaileonLogo");

(function (name, definition){
	if (typeof this.define === "function"){ // AMD
		this.define(definition);
	} else if (typeof module !== "undefined" && module.exports) { // Node.js
		module.exports = definition();
	} else { // Browser
		var theModule = definition();
		var global = this;
		var old = global[name];
		theModule.noConflict = function () {
			global[name] = old;
			return theModule;
		};
		global[name] = theModule;
	}
})("chamaileonLogo", function () {
	return createChamaileonLogo;
});
},{"./createChamaileonLogo":1}]},{},[2])(2)
});
