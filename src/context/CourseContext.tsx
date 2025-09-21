import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Course } from '../types/course';
import type { MockCourse } from '../types/user';
import APIService from '../services/api';
import { transformMockCourseToAppCourse, transformAppCourseToMockCourse } from '../utils/courseTransform';

interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

type CourseAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_COURSES'; payload: Course[] }
  | { type: 'ADD_COURSE'; payload: Course }
  | { type: 'UPDATE_COURSE'; payload: Course }
  | { type: 'DELETE_COURSE'; payload: string };

const initialState: CourseState = {
  courses: [],
  loading: false,
  error: null,
};

const courseReducer = (state: CourseState, action: CourseAction): CourseState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'SET_COURSES':
      return { ...state, courses: action.payload, loading: false, error: null };
    
    case 'ADD_COURSE': {
      // Add course via API
      return { 
        ...state, 
        courses: [...state.courses, action.payload],
        error: null 
      };
    }
    
    case 'UPDATE_COURSE': {
      const updatedCourses = state.courses.map(course =>
        course.id === action.payload.id ? action.payload : course
      );
      return { 
        ...state, 
        courses: updatedCourses,
        error: null 
      };
    }
    
    case 'DELETE_COURSE': {
      const filteredCourses = state.courses.filter(course => course.id !== action.payload);
      return { 
        ...state, 
        courses: filteredCourses,
        error: null 
      };
    }
    
    default:
      return state;
  }
};

interface CourseContextType {
  state: CourseState;
  actions: {
    addCourse: (courseData: Omit<Course, 'id'>) => Promise<void>;
    updateCourse: (course: Course) => Promise<void>;
    deleteCourse: (id: string) => Promise<void>;
    getCourseById: (id: string) => Course | undefined;
    refreshCourses: () => Promise<void>;
  };
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(courseReducer, initialState);

  // Load courses from MockAPI
  useEffect(() => {
    const loadCourses = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      try {
        const mockCourses = await APIService.getAllCourses();
        const transformedCourses = mockCourses.map(transformMockCourseToAppCourse);
        dispatch({ type: 'SET_COURSES', payload: transformedCourses });
      } catch (error) {
        console.error('Error loading courses:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load courses from API' });
      }
    };

    loadCourses();
  }, []);

  // Actions
  const addCourse = async (courseData: Omit<Course, 'id'>) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const mockCourseData = transformAppCourseToMockCourse(courseData);
      const newMockCourse = await APIService.createCourse(mockCourseData as Omit<MockCourse, 'id' | 'createdAt'>);
      const newCourse = transformMockCourseToAppCourse(newMockCourse);
      
      dispatch({ type: 'ADD_COURSE', payload: newCourse });
    } catch (error) {
      console.error('Error adding course:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add course' });
    }
  };

  const updateCourse = async (course: Course) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const mockCourseData = transformAppCourseToMockCourse(course);
      const updatedMockCourse = await APIService.updateCourse(course.id, mockCourseData);
      const updatedCourse = transformMockCourseToAppCourse(updatedMockCourse);
      
      dispatch({ type: 'UPDATE_COURSE', payload: updatedCourse });
    } catch (error) {
      console.error('Error updating course:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update course' });
    }
  };

  const deleteCourse = async (id: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      await APIService.deleteCourse(id);
      dispatch({ type: 'DELETE_COURSE', payload: id });
    } catch (error) {
      console.error('Error deleting course:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete course' });
    }
  };

  const getCourseById = (id: string): Course | undefined => {
    return state.courses.find(course => course.id === id);
  };

  const refreshCourses = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const mockCourses = await APIService.getAllCourses();
      const transformedCourses = mockCourses.map(transformMockCourseToAppCourse);
      dispatch({ type: 'SET_COURSES', payload: transformedCourses });
    } catch (error) {
      console.error('Error refreshing courses:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to refresh courses' });
    }
  };

  const contextValue: CourseContextType = {
    state,
    actions: {
      addCourse,
      updateCourse,
      deleteCourse,
      getCourseById,
      refreshCourses,
    },
  };

  return (
    <CourseContext.Provider value={contextValue}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};

export default CourseContext;
