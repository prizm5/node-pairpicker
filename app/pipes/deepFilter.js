System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var DeepFilterPipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            DeepFilterPipe = (function () {
                function DeepFilterPipe() {
                }
                DeepFilterPipe.prototype.transform = function (value, _a) {
                    var filters = _a[0];
                    var rawGroups = filters && filters.split(';')
                        .map(function (group) { return group.split(/[=:]/); })
                        .filter(function (group) { return group.length > 1 || group[0].length > 0; });
                    if (!rawGroups || !rawGroups.length)
                        return value;
                    var groupsArrays = [].concat.apply(rawGroups.filter(function (elm) { return elm.length > 1; }), rawGroups.filter(function (elm) { return elm.length == 1; })
                        .map(function (group) { return group.length > 1 ? group : group[0].split(/\s+/); }));
                    var groups = groupsArrays
                        .map(function (group) { return Array.isArray(group) ? group : [group]; })
                        .map(function (group) { return { onlythiskey: function (key) { return group.length == 1 || key == group[0].toLowerCase(); }, value: group[group.length > 1 ? 1 : 0] }; });
                    var keys = Object.keys(value[0]).map(function (key) { return key.toLowerCase(); });
                    if (!groups || !groups.length)
                        return value;
                    return value.filter(function (obj) {
                        return groups.every(function (group) {
                            return keys.some(function (key) {
                                return group.onlythiskey(key) && String(obj[key]).toLowerCase().indexOf(group.value.toLowerCase()) > -1;
                            });
                        });
                    });
                };
                DeepFilterPipe = __decorate([
                    core_1.Pipe({
                        name: 'deepfilter'
                    }), 
                    __metadata('design:paramtypes', [])
                ], DeepFilterPipe);
                return DeepFilterPipe;
            })();
            exports_1("DeepFilterPipe", DeepFilterPipe);
        }
    }
});
//# sourceMappingURL=deepFilter.js.map