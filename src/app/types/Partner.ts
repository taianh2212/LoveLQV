export interface Partner {
  _id?: string; // MongoDB ID
  id?: string; // For backward compatibility
  name: string;
  nickname?: string;
  avatar: string;
  dateOfBirth?: string;
  anniversaryDate: string;
  hobbies: string[];
  favoriteThings: string[];
  notes: string;
  phoneNumber?: string;
  address?: string;
  rating: number;
  isFavorite: boolean;
  gifts: Gift[];
  memories: Memory[];
  status?: 'pending' | 'approved' | 'rejected';
  createdAt?: string;
  updatedAt?: string;
}

export interface Gift {
  id: string;
  name: string;
  date: string;
  price?: number;
  image?: string;
  note?: string;
}

export interface Memory {
  id: string;
  title: string;
  description: string;
  date: string;
  images: string[];
}
