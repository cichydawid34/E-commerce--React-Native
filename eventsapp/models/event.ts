
export interface EventType {
    _id?:string;
    name?: string;
    type?: string;
    owner?: string;
    street?: string;
    city?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    image?: string;
    latitude?: number;
    longitude?: number;
    participants?: string[];
    price?: number;
    isPromoted?: boolean;
}