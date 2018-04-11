System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var State, Team;
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
            (function (Team) {
                Team[Team["V5"] = 0] = "V5";
                Team[Team["Cloud"] = 1] = "Cloud";
                Team[Team["QA"] = 2] = "QA";
                Team[Team["Reporting"] = 3] = "Reporting";
            })(Team || (Team = {}));
            exports_1("Team", Team);
        }
    }
});
//# sourceMappingURL=person.js.map