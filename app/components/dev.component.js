System.register(['angular2/core', '../models/person'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, person_1;
    var Dev;
    // Local helper functions
    /**
     * Compose two functions
     */
    function compose(f, g) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return f(g.apply(void 0, args));
        };
    }
    /**
     * Given an array of pairs, return a pair of arrays
     *
     * e.g.: when you pass this to unzip,
     *
     * [['foo', 1], ['bar', 2], ['baz', 3], ['qux', 4]]
     *
     * you'll get this back:
     *
     * [['foo', 'bar', 'baz', 'qux'], [1, 2, 3, 4]]
     */
    function unzip(vs) {
        return vs.reduce(function (acc, v) {
            var ts = acc[0], us = acc[1];
            var t = v[0], u = v[1];
            return [ts.concat(t), us.concat(u)];
        }, [[], []]);
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (person_1_1) {
                person_1 = person_1_1;
            }],
        execute: function() {
            Dev = (function () {
                function Dev(el) {
                    this.el = el;
                    this.onSwitchTeam = new core_1.EventEmitter();
                }
                /**
                 * Perform side effects when a given peep's state changes
                 */
                Dev.prototype.onToggleCheckbox = function (peep, change) {
                    peep.state = change;
                    if (change == person_1.State.IntentionalPairing) {
                        this.popoverSpecificPairingOptions(peep);
                    }
                    else {
                        this.intentionalPairingPopover(peep).popover('hide');
                        this.intentionalPairs.removeIntentionalPairOf(peep);
                    }
                };
                /**
                 * Given a peep, return a string describing her and/or with whom she's intentionally pairing
                 */
                Dev.prototype.displayPerson = function (peep) {
                    var otherPeep = this.intentionalPairs.getIntentionalPairOf(peep);
                    if (otherPeep) {
                        return (peep.nickname || peep.name) + " & " + (otherPeep.nickname || otherPeep.name);
                    }
                    else {
                        return peep.name;
                    }
                };
                /**
                 * Notify that the given peep is switching off of the current team
                 */
                Dev.prototype.emitTeamSwitch = function (peep) {
                    this.intentionalPairs.removeIntentionalPairOf(peep);
                    peep.state = person_1.State.RandomPairing;
                    this.onSwitchTeam.emit({ name: peep.name, team: this.teamname });
                };
                /**
                 * Given the first half of an intentional pair, return a function that takes the other half.
                 * That function returns a pair of the markup to display a link to the other half of the pair,
                 * and the code to run when that link is clicked.
                 *
                 * Because the dynamically generated intentional pair popovers are generated,
                 * the onclicks will be assigned to the handle one click of the links, just in time.
                 */
                Dev.prototype.markupOnclickMapPair = function (peep) {
                    var _this = this;
                    return function (otherPeep) {
                        var stateIconFor = function (peep) {
                            var stateClass = '';
                            switch (peep.state) {
                                case person_1.State.RandomPairing:
                                    stateClass = 'glyphicon-ok';
                                    break;
                                case person_1.State.Odd:
                                    stateClass = 'glyphicon-stop';
                                    break;
                                case person_1.State.IntentionalPairing:
                                    stateClass = 'glyphicon-user';
                                    break;
                                case person_1.State.Absent:
                                    stateClass = 'glyphicon-remove';
                                    break;
                            }
                            return "<i class=\"glyphicon " + stateClass + "\" />";
                        };
                        // The id in the <li> tag here is important, popoverSpecificPairingOptions uses it
                        // to find the right link which to assign the click handler
                        var markup = "<li id=\"" + otherPeep.name + "\" style=\"list-style-type: none;\">" + stateIconFor(otherPeep) + "&nbsp;<a href=\"#\">" + otherPeep.name + "</a></li>";
                        return [markup, {
                                name: otherPeep.name,
                                onclick: function () { return _this.intentionalPairs.assignIntentionalPair(peep, otherPeep); }
                            }];
                    };
                };
                /**
                 * For a given Person, display a popover showing everyone else on the team that she can pair with
                 */
                Dev.prototype.popoverSpecificPairingOptions = function (peep) {
                    var popoverAnchor = this.intentionalPairingPopover(peep);
                    var otherPeeps = this.peeps.filter(function (p) { return p.shouldPair && p.name != peep.name; });
                    var markupOnclickMapPairs = otherPeeps.map(this.markupOnclickMapPair(peep));
                    var _a = unzip(markupOnclickMapPairs), markups = _a[0], onclickMaps = _a[1];
                    // Configure the popover: Treat the contents as html, not text; Only code will trigger the showing / hiding
                    popoverAnchor.popover({
                        html: true,
                        trigger: 'manual',
                        title: "Set " + peep.name + " to Pair With...",
                        content: "<ul>" + markups.join('') + "</ul>",
                        container: popoverAnchor
                    });
                    // Show the popover, asynchronously
                    popoverAnchor.popover('show');
                    // When the popover is shown, wire up on the onclicks
                    popoverAnchor.parent().on('shown.bs.popover', function () {
                        onclickMaps.forEach(function (_a) {
                            var name = _a.name, onclick = _a.onclick;
                            return popoverAnchor
                                .find("#" + name)
                                .one('click', compose(function () { return popoverAnchor.popover('hide'); }, onclick));
                        });
                    });
                };
                /**
                 * Return the element representing the intentional pairing popover for the given peep
                 */
                Dev.prototype.intentionalPairingPopover = function (peep) {
                    return $(this.el.nativeElement).find("#" + "popover-anchor-" + peep.name);
                };
                Dev = __decorate([
                    core_1.Component({
                        styles: [],
                        selector: 'developer',
                        template: "\n    <div class=\"input-group dev\" *ngFor=\"#peep of peeps\">\n      <span class=\"input-group-addon\">\n        <div class=\"cbx cbx-md cbx-active\" tabindex=\"1000\">\n          <span class=\"cbx-icon\">\n            <div [ngSwitch]=\"peep.state\" id=\"popover-anchor-{{peep.name}}\">\n              <template ngSwitchDefault><i class=\"glyphicon glyphicon-ok\" (click)=\"onToggleCheckbox(peep,1)\"></i></template>\n              <template [ngSwitchWhen]=\"1\"><i class=\"glyphicon glyphicon-stop\" (click)=\"onToggleCheckbox(peep,2)\"></i></template>\n              <template [ngSwitchWhen]=\"2\"><i class=\"glyphicon glyphicon-user\" (click)=\"onToggleCheckbox(peep,3)\"></i></template>\n              <template [ngSwitchWhen]=\"3\"><i class=\"glyphicon glyphicon-remove\" (click)=\"onToggleCheckbox(peep,0)\"></i></template>\n            </div>\n          </span>\n        </div>\n      </span>\n      <div type=\"text\" class=\"form-control\" aria-label=\"...\">{{displayPerson(peep)}}</div>\n      <span class=\"input-group-addon\">\n        <button class=\"btn btn-default btn-sm dev-btn-switch glyphicon glyphicon-resize-horizontal\" id=\"{{peep.name}}\" (click)=\"emitTeamSwitch(peep)\" role=\"button\"></button>\n      </span>\n    </div>\n    ",
                        inputs: ['peeps', 'teamname', 'intentionalPairs'],
                        outputs: ['onSwitchTeam']
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], Dev);
                return Dev;
            }());
            exports_1("Dev", Dev);
        }
    }
});
//# sourceMappingURL=dev.component.js.map