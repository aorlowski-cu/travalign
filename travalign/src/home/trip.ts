import { Activity } from './activity';

export interface Trip {
  id?: string;
  name: string;
  startDate: string;
  endDate: string;
  members: string[];
  creator: string;
  activities: Activity[];
}
