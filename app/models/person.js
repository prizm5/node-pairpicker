System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var State;
    return {
        setters:[],
        execute: function() {
            (function (State) {
                State[State["RandomPairing"] = 0] = "RandomPairing";
                State[State["IntentionalPairing"] = 1] = "IntentionalPairing";
                State[State["Odd"] = 2] = "Odd";
                State[State["Absent"] = 3] = "Absent";
            })(State || (State = {}));
            exports_1("State", State);
        }
    }
});
//# sourceMappingURL=person.js.map