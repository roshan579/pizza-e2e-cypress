export interface Order {
    id: string;
    address: string;
    time: any;
    accepted: boolean;
    transit: boolean;
    completed: boolean;
    canceled: boolean;
    _duration?: any;
    total: number;
}
