import {Person} from './person'

export interface Team {
    name: string;
    members: Person[]
}
/*
export class Team {
  constructor(public name:string, public members:Person[]) { }
}*/