System.register(['../models/person'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var person_1;
    var IntentionalPairs;
    return {
        setters:[
            function (person_1_1) {
                person_1 = person_1_1;
            }],
        execute: function() {
            IntentionalPairs = (function () {
                function IntentionalPairs() {
                    this.intentionalPairs = {};
                }
                /**
                 * Return an array of the pairs of peeps that are intentionally pairing together.
                 */
                IntentionalPairs.prototype.getAllIntentionalPairs = function () {
                    var _this = this;
                    var u = Object.keys(this.intentionalPairs).reduce(function (_a, name) {
                        var pairs = _a[0], seen = _a[1];
                        if (!(name in seen)) {
                            var first = _this.intentionalPairs[name];
                            var other = _this.intentionalPairs[first.name];
                            var pair = [first, other];
                            return [
                                pairs.concat([pair]),
                                Object.assign(seen, (_b = {},
                                    _b[first.name] = first.name,
                                    _b[other.name] = other.name,
                                    _b
                                ))
                            ];
                        }
                        else {
                            return [pairs, seen];
                        }
                        var _b;
                    }, [[], {}]);
                    return u[0];
                };
                /**
                 * Return the other peep that the given peep is intentionally pairing with, if any
                 */
                IntentionalPairs.prototype.getIntentionalPairOf = function (peep) {
                    return this.intentionalPairs[peep.name];
                };
                /**
                 * Put the given peeps together in an intentional pair, removing any other intentional pairs they were previously in
                 */
                IntentionalPairs.prototype.assignIntentionalPair = function (peep, otherPeep) {
                    this.removeIntentionalPairOf(peep);
                    this.removeIntentionalPairOf(otherPeep);
                    peep.state = person_1.State.IntentionalPairing;
                    otherPeep.state = person_1.State.IntentionalPairing;
                    this.intentionalPairs[peep.name] = otherPeep;
                    this.intentionalPairs[otherPeep.name] = peep;
                };
                /**
                 * Remove the given peep from whatever intentional pair she was in
                 */
                IntentionalPairs.prototype.removeIntentionalPairOf = function (peep) {
                    var otherPeep = this.intentionalPairs[peep.name];
                    if (otherPeep) {
                        otherPeep.state = person_1.State.RandomPairing;
                        delete this.intentionalPairs[this.intentionalPairs[peep.name].name];
                    }
                    delete this.intentionalPairs[peep.name];
                };
                return IntentionalPairs;
            }());
            exports_1("IntentionalPairs", IntentionalPairs);
        }
    }
});
//# sourceMappingURL=intentional-pairs.js.map