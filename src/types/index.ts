export interface User {
    id: string; 
    username: string; 
    email: string; 
    role: 'USER' | 'ADMIN'; 
    created_at: string; 
    updated_at: string; 
    status: 'ACTIVE' | 'INACTIVE' | 'DEACTIVATED' | 'SUSPENDED'; 
    deactivated_at: string | null; 
    deactivated_by: string | null; 
    contactCount: number;
}