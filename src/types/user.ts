// Interface untuk User berdasarkan MockAPI structure
export interface User {
  id: string;
  createdAt: string;
  userEmail: string;
  userPassword: string;
  userGender: 'male' | 'female';
  userPhoneNumber: string;
}

// Interface untuk Course berdasarkan MockAPI structure  
export interface MockCourse {
  id: string;
  createdAt: string;
  courseName: string;
  courseIntructorName: string;
  courseImage: string;
  coursePrice: number;
  courseInstructorJob: string;
  courseInstructorJobDetail: string;
}

// Interface untuk Auth response
export interface AuthResponse {
  success: boolean;
  user?: User;
  message?: string;
}

// Interface untuk Login request
export interface LoginRequest {
  userEmail: string;
  userPassword: string;
}

// Interface untuk Register request
export interface RegisterRequest {
  userEmail: string;
  userPassword: string;
  userGender: 'male' | 'female';
  userPhoneNumber: string;
}