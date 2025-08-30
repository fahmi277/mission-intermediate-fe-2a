// Interface untuk Course
export interface Course {
  id: string;
  title: string;
  instructor: {
    name: string;
    job: string;
    company: string;
    avatar: string;
  };
  price: {
    current: number;
    original?: number;
    discount?: number;
  };
  rating: number;
  reviewCount: number;
  category: string;
  duration: string;
  image: string;
  description: string;
}

// Interface untuk Filter State
export interface FilterState {
  bidangStudi: string[];
  harga: string[];
  durasi: string[];
}

// Interface untuk Cart Item
export interface CartItem extends Course {
  quantity: number;
}
