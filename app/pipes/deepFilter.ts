import {Pipe} from 'angular2/core';

@Pipe({
  name: 'deepfilter'
})
export class DeepFilterPipe {
  transform(value, [filters]) {
    var rawGroups = filters && filters.split(';')
      .map(function(group){return group.split(/[=:]/)})
      .filter(function(group){return group.length>1||group[0].length>0});
    if (!rawGroups || !rawGroups.length) return value;
    var groupsArrays = [].concat.apply(rawGroups.filter(function(elm){return elm.length>1}), rawGroups.filter(function(elm){return elm.length==1})
      .map(function(group){ return group.length>1?group:group[0].split(/\s+/); }));
    var groups = groupsArrays
      .map(function(group){return Array.isArray(group)?group:[group];})
      .map(function(group){return { onlythiskey:function(key){return group.length==1 || key==group[0].toLowerCase() ;}, value:group[group.length>1?1:0] }});
    var keys = Object.keys(value[0]).map(function(key){return key.toLowerCase();});
    if (!groups || !groups.length) return value;
    return value.filter(function(obj) {
      return groups.every(function(group) {
        return keys.some(function(key) {
          return group.onlythiskey(key) && String(obj[key]).toLowerCase().indexOf(group.value.toLowerCase()) > -1;
        });
      });
    });
  }
}