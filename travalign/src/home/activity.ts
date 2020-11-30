export interface Activity {
    id?: string;
    upvoted: string[];
    downvoted: string[];
    name: string;
    type?: ActivityType;
    link: string;
    details?: string;
    date: string;
    time?: string;
    optional?: boolean;
    confirmed: boolean;
    owner: string;
}

export enum ActivityType {
    Eat,
    Sleep,
    Logistics,
    Recreational,
    Default
}