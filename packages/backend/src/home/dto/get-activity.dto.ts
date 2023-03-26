import { Activity } from "../interfaces/activity.interface";

export interface GetActivity {
  readonly code: number;
  readonly activities: Activity[];
}
