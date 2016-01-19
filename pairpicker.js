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
