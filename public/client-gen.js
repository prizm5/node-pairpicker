(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var picker =  {};

var shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

var splitarray = function(input, spacing) {
    var output = [];
    for (var i = 0; i < input.length; i += spacing) {
        output[output.length] = input.slice(i, i + spacing);
    }
    return output;
};

picker.generatePairs = function(names) {
	var shuffledPairs = shuffle(names);
	var splitArray = splitarray(shuffledPairs, 2);
  return splitArray;
};

picker.getNames = (function(kvArray) {
  return kvArray.map(function(obj){
    return obj.name;
  });
});

module.exports = picker;

},{}],2:[function(require,module,exports){
var picker = require('../pairpicker.js');
console.log(picker.generatePairs(picker.getNames(people.devs)));

var post = function(data){
  var request = $.ajax({
    url: "api",
    type: "POST",
    data: data,
    dataType: "json"
  });
};

$(document).ready(function() {
        $("#generate").click(function(e) {
          var peeps = document.getElementsByClassName("names");
          var names = [];

        	for(i = 0; i < peeps.length; i++){
        		if(peeps[i].checked)
        			names.push(peeps[i].value);
        	}
          var pairs = picker.generatePairs(names);

        	var element = document.getElementById("shuffledPairs");
        	element.innerHTML = "";
        	for(i=0; i< pairs.length; i++){
        		var listItem = document.createElement("li");
        		listItem.innerHTML = pairs[i];
        		element.appendChild(listItem);
        	}
          $.post( "api", { pairs: pairs } );
        });
    });

},{"../pairpicker.js":1}]},{},[2]);
