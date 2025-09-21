import type { User, MockCourse, AuthResponse, LoginRequest, RegisterRequest } from '../types/user';

const BASE_URL = 'https://68c521bea712aaca2b67edde.mockapi.io/api/v1';

class APIService {
  // User endpoints
  static async getAllUsers(): Promise<User[]> {
    try {
      const response = await fetch(`${BASE_URL}/users`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  static async getUserById(id: string): Promise<User> {
    try {
      const response = await fetch(`${BASE_URL}/users/${id}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const users = await this.getAllUsers();
      const user = users.find(
        u => u.userEmail === credentials.userEmail && u.userPassword === credentials.userPassword
      );

      if (user) {
        return {
          success: true,
          user,
          message: 'Login successful'
        };
      } else {
        return {
          success: false,
          message: 'Email atau password salah'
        };
      }
    } catch (error) {
      console.error('Error during login:', error);
      return {
        success: false,
        message: 'Terjadi kesalahan saat login'
      };
    }
  }

  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      // Check if email already exists
      const users = await this.getAllUsers();
      const existingUser = users.find(u => u.userEmail === userData.userEmail);
      
      if (existingUser) {
        return {
          success: false,
          message: 'Email sudah terdaftar'
        };
      }

      // Create new user
      const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const newUser = await response.json();
      return {
        success: true,
        user: newUser,
        message: 'Registrasi berhasil'
      };
    } catch (error) {
      console.error('Error during registration:', error);
      return {
        success: false,
        message: 'Terjadi kesalahan saat registrasi'
      };
    }
  }

  // Course endpoints
  static async getAllCourses(): Promise<MockCourse[]> {
    try {
      const response = await fetch(`${BASE_URL}/course`);
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  }

  static async getCourseById(id: string): Promise<MockCourse> {
    try {
      const response = await fetch(`${BASE_URL}/course/${id}`);
      if (!response.ok) {
        throw new Error('Course not found');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching course:', error);
      throw error;
    }
  }

  static async createCourse(courseData: Omit<MockCourse, 'id' | 'createdAt'>): Promise<MockCourse> {
    try {
      const response = await fetch(`${BASE_URL}/course`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) {
        throw new Error('Failed to create course');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  }

  static async updateCourse(id: string, courseData: Partial<MockCourse>): Promise<MockCourse> {
    try {
      const response = await fetch(`${BASE_URL}/course/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) {
        throw new Error('Failed to update course');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating course:', error);
      throw error;
    }
  }

  static async deleteCourse(id: string): Promise<void> {
    try {
      const response = await fetch(`${BASE_URL}/course/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete course');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      throw error;
    }
  }
}

export default APIService;