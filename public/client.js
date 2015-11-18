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
