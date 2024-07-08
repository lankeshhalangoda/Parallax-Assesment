// interfaces/Request.ts

export interface Request {
    id: number;
    location: string;
    service: 'Service A' | 'Service B' | 'Service C'; // Replace with actual service names
    status: 'NEW' | 'IN_PROGRESS' | 'ON_HOLD' | 'REJECTED' | 'CANCELLED';
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    department: 'IT' | 'HR'; // Replace with actual department names if needed
    requested_by: string;
    assigned_to?: string | null;
    created_at: Date;
    updated_at: Date;
    floor: '1' | '2' | '3' | '4' | '5'; // Replace with actual floor options
    room_unit: 'Room A' | 'Room B' | 'Unit 1' | 'Unit 2'; // Replace with actual room/unit options
    block: 'A' | 'B' | 'C' | 'D'; // Replace with actual block options
    guest_name: string;
    phone_number: string;
}
