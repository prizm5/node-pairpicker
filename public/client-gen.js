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

picker.generatePairs = function(names, odders) {
    var shuffledPairs = shuffle(names);
    var splitArray = splitarray(shuffledPairs, 2);
    for (var i = 0; i < splitArray.length; i++) {
        if(splitArray[i].length === 1){
            odders.push(splitArray[i][0]);
            splitArray.splice(i,1);
        }
    }
    return { pairs: splitArray, odders: odders };
};

picker.getNames = (function(kvArray) {
  return kvArray.map(function(obj){
    return obj.name;
  });
});

module.exports = picker;

},{}],2:[function(require,module,exports){
var picker = require('../pairpicker.js');

var post = function (data) {
    $.ajax({
        url: "api",
        type: "POST",
        data: data,
        dataType: "json"
    });
};
 
$(document).ready(function () {

    // initialize with defaults
    $(".names").checkboxX();

    // with plugin options
    $(".names").checkboxX({ threeState: true, inline: true });

    $(".dev-btn-switch").click(function (e) {
        var move = { name: e.target.id };
        $.post("api/moveToCloud", move).done(function( data ) {
            location.reload();
        });
    });
     
     
    $(".cloud-btn-switch").click(function (e) {
        var move = { name: e.target.id };
        $.post("api/moveToDev", move).done(function( data ) {
            location.reload();
        });
    });
     
    $("#generate").click(function (e) {
        var peeps = document.getElementsByClassName("names");
        var names = [];
        var oddnames = [];

        for (var i = 0; i < peeps.length; i++) {
            if (peeps[i].value === "1") {
                names.push(peeps[i].id);
            }
            else if (peeps[i].value === "") {
                oddnames.push(peeps[i].id);
            }
        }
        var paring = picker.generatePairs(names, oddnames);

        var element = document.getElementById("shuffledPairs");
        element.innerHTML = "";
        for (i = 0; i < paring.pairs.length; i++) {
            var listItem = document.createElement("li");
            listItem.innerHTML = paring.pairs[i];
            element.appendChild(listItem);
        }

        var odd = document.getElementById("odds");
        odd.innerHTML = "";
        for (i = 0; i < paring.odders.length; i++) {
            var listItem = document.createElement("li");
            listItem.innerHTML = paring.odders[i];
            odd.appendChild(listItem);
        }

        $.post("api", paring);
    });
});

},{"../pairpicker.js":1}]},{},[2]);
