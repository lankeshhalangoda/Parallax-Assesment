export interface Request {
    id: number;
    location: string;
    service: 'Service A' | 'Service B' | 'Service C';
    status: 'NEW' | 'IN_PROGRESS' | 'ON_HOLD' | 'REJECTED' | 'CANCELLED';
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    department: 'IT' | 'HR';
    requested_by: string;
    assigned_to?: string | null;
    created_at: Date;
    updated_at: Date;
    floor: '1' | '2' | '3' | '4' | '5';
    room_unit: 'Room A' | 'Room B' | 'Unit 1' | 'Unit 2';
    block: 'A' | 'B' | 'C' | 'D';
    guest_name: string;
    phone_number: string;
}
