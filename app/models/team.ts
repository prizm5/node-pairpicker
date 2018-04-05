import {Person} from './person';

export class Team {
  name: string;
  members: Person[]
}

export interface TeamMember {
  name:   string;
  team:   string;
  status: string;
}
