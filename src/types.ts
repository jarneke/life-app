export interface Event {
    id: number;
    title: string;
    description?: string;
    date: Date;
    startTime: Date;
    endTime: Date
}