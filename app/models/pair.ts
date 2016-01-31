import {Team} from '../models/team'
import {Person} from '../models/person'


export class Pairing {
    pairs: string[];
    odd: string[]


    constructor() {
       
     } 

    public shuffle(o: Person[]) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o.map(p => p.name);
    }

    private splitarray(input, spacing) {
        var output = [];
        for (var i = 0; i < input.length; i += spacing) {
            output[output.length] = input.slice(i, i + spacing);
        }
        return output;
    } 

    public getPairs(team: Team) {
         this.shuffle(team.members);
         var split = this.splitarray(team.members, 2);
         this.pairs = [];
         this.odd = [];
            split.forEach((element: Person[], index, array) => {
            if (element.length === 2) {
                this.pairs.push(element[0].name + " : " + element[1].name);
            }
            else {
                this.odd.push(element[0].name)
            }
        });
    }
}
