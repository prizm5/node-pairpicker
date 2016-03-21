System.register([], function(exports_1) {
    var State;
    return {
        setters:[],
        execute: function() {
            (function (State) {
                State[State["RandomPairing"] = 0] = "RandomPairing";
                State[State["Odd"] = 1] = "Odd";
                State[State["IntentionalPairing"] = 2] = "IntentionalPairing";
                State[State["Absent"] = 3] = "Absent";
            })(State || (State = {}));
            exports_1("State", State);
        }
    }
});
//# sourceMappingURL=person.js.map