System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Pairing;
    return {
        setters:[],
        execute: function() {
            Pairing = (function () {
                function Pairing() {
                    this.pairs = [];
                    this.odd = [];
                }
                Pairing.prototype.shuffle = function (o) {
                    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x)
                        ;
                };
                Pairing.prototype.splitarray = function (input, spacing) {
                    var output = [];
                    for (var i = 0; i < input.length; i += spacing) {
                        output[output.length] = input.slice(i, i + spacing);
                    }
                    return output;
                };
                Pairing.prototype.generatePairs = function (team, odd) {
                    var _this = this;
                    this.shuffle(team.members);
                    var split = this.splitarray(team.members, 2);
                    this.pairs = [];
                    this.odd = odd.map(function (a) { return a.name; });
                    split.forEach(function (element) {
                        if (element.length === 2) {
                            element.sort(function (a, b) {
                                var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
                                if (nameA < nameB)
                                    return -1;
                                if (nameA > nameB)
                                    return 1;
                                return 0; //default return value (no sorting)
                            });
                            _this.pairs.push(element[0].name + " :: " + element[1].name);
                        }
                        else {
                            _this.odd.push(element[0].name);
                        }
                    });
                };
                return Pairing;
            }());
            exports_1("Pairing", Pairing);
        }
    }
});
//# sourceMappingURL=pair.js.map