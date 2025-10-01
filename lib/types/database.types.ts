// Strict TypeScript types for Hypaws Lead PWA Database

export type UserRole = 'admin' | 'tasker';
export type PetType = 'Dog' | 'Cat';

export interface User {
  id: string;
  phone_number: string;
  role: UserRole;
  name: string;
  assigned_area: string | null;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  name: string;
  phone_number: string;
  pet_type: PetType | null;
  pet_name: string | null;
  pet_dob: string | null;
  pet_breed: string | null;
  pet_food: string | null;
  pet_treat: string | null;
  area_name: string | null;
  nearby_landmark: string | null;
  tasker_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Location {
  id: string;
  tasker_id: string | null;
  latitude: number;
  longitude: number;
  accuracy: number | null;
  timestamp: string;
  created_at: string;
}

export interface LeadWithTasker extends Lead {
  tasker_name: string | null;
  tasker_phone: string | null;
  tasker_area: string | null;
  last_location_timestamp: string | null;
}

export interface TaskerWithLocation extends User {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  last_location_timestamp: string | null;
  lead_count: number;
}

export interface TaskerWithLocationHistory extends User {
  locations: Location[];
  lead_count: number;
}

export interface CreateLeadInput {
  name: string;
  phone_number: string;
  pet_type: PetType;
  pet_name?: string;
  pet_dob?: string;
  pet_breed?: string;
  pet_food?: string;
  pet_treat?: string;
  area_name?: string;
  nearby_landmark?: string;
  tasker_id: string;
}

export interface CreateTaskerInput {
  name: string;
  phone_number: string;
  assigned_area?: string;
}

export interface CreateLocationInput {
  tasker_id: string;
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export interface LoginCredentials {
  phone_number: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  session: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  };
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>;
      };
      leads: {
        Row: Lead;
        Insert: Omit<Lead, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Lead, 'id' | 'created_at' | 'updated_at'>>;
      };
      locations: {
        Row: Location;
        Insert: Omit<Location, 'id' | 'created_at' | 'timestamp'>;
        Update: Partial<Omit<Location, 'id' | 'created_at' | 'timestamp'>>;
      };
    };
    Views: {
      leads_with_tasker: {
        Row: LeadWithTasker;
      };
      taskers_with_latest_location: {
        Row: TaskerWithLocation;
      };
    };
  };
}