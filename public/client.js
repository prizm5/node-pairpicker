var picker = require('../pairpicker.js');

var post = function(data){
  $.ajax({
    url: "api",
    type: "POST",
    data: data,
    dataType: "json"
  });
};

$(document).ready(function() {

  // initialize with defaults
  $(".names").checkboxX();

   // with plugin options
  $(".names").checkboxX({threeState: true, inline: true });

  $("#generate").click(function(e) {
    var peeps = document.getElementsByClassName("names");
    var names = [];
    var oddnames = [];

  	for(i = 0; i < peeps.length; i++){
  		if(peeps[i].value === "1") {
  			names.push(peeps[i].id);
      }
      else if (peeps[i].value === "") {
  			oddnames.push(peeps[i].id);
      }
  	}
    var paring = picker.generatePairs(names, oddnames);

  	var element = document.getElementById("shuffledPairs");
  	element.innerHTML = "";
  	for(i=0; i< paring.pairs.length; i++){
  		var listItem = document.createElement("li");
  		listItem.innerHTML = paring.pairs[i];
  		element.appendChild(listItem);
  	}

  	var odd = document.getElementById("odds");
  	odd.innerHTML = "";
  	for(i=0; i< paring.odders.length; i++) {
  		var listItem = document.createElement("li");
  		listItem.innerHTML = paring.odders[i];
  		odd.appendChild(listItem);
  	}

    $.post( "api", paring); 
  });
});
