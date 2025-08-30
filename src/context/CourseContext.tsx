import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Course } from '../types/course';
import { coursesData } from '../data/coursesData';

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
      const updatedCourses = [...state.courses, action.payload];
      // Save to localStorage
      localStorage.setItem('harisenin_courses', JSON.stringify(updatedCourses));
      return { 
        ...state, 
        courses: updatedCourses,
        error: null 
      };
    }
    
    case 'UPDATE_COURSE': {
      const updatedCourses = state.courses.map(course =>
        course.id === action.payload.id ? action.payload : course
      );
      // Save to localStorage
      localStorage.setItem('harisenin_courses', JSON.stringify(updatedCourses));
      return { 
        ...state, 
        courses: updatedCourses,
        error: null 
      };
    }
    
    case 'DELETE_COURSE': {
      const filteredCourses = state.courses.filter(course => course.id !== action.payload);
      // Save to localStorage
      localStorage.setItem('harisenin_courses', JSON.stringify(filteredCourses));
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
    addCourse: (courseData: Omit<Course, 'id'>) => void;
    updateCourse: (course: Course) => void;
    deleteCourse: (id: string) => void;
    getCourseById: (id: string) => Course | undefined;
    refreshCourses: () => void;
  };
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(courseReducer, initialState);

  // Load courses from localStorage or use default data
  useEffect(() => {
    const loadCourses = () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      try {
        const savedCourses = localStorage.getItem('harisenin_courses');
        
        if (savedCourses) {
          const parsedCourses = JSON.parse(savedCourses);
          // Validate data structure
          if (Array.isArray(parsedCourses) && parsedCourses.length > 0) {
            dispatch({ type: 'SET_COURSES', payload: parsedCourses });
          } else {
            // If invalid data, use default
            dispatch({ type: 'SET_COURSES', payload: coursesData });
            localStorage.setItem('harisenin_courses', JSON.stringify(coursesData));
          }
        } else {
          // First time load, use default data
          dispatch({ type: 'SET_COURSES', payload: coursesData });
          localStorage.setItem('harisenin_courses', JSON.stringify(coursesData));
        }
      } catch (error) {
        console.error('Error loading courses:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load courses' });
        // Fallback to default data
        dispatch({ type: 'SET_COURSES', payload: coursesData });
        localStorage.setItem('harisenin_courses', JSON.stringify(coursesData));
      }
    };

    loadCourses();
  }, []);

  // Actions
  const addCourse = (courseData: Omit<Course, 'id'>) => {
    // Generate unique ID
    const newId = `course_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newCourse: Course = {
      ...courseData,
      id: newId,
    };
    
    dispatch({ type: 'ADD_COURSE', payload: newCourse });
  };

  const updateCourse = (course: Course) => {
    dispatch({ type: 'UPDATE_COURSE', payload: course });
  };

  const deleteCourse = (id: string) => {
    dispatch({ type: 'DELETE_COURSE', payload: id });
  };

  const getCourseById = (id: string): Course | undefined => {
    return state.courses.find(course => course.id === id);
  };

  const refreshCourses = () => {
    const savedCourses = localStorage.getItem('harisenin_courses');
    if (savedCourses) {
      try {
        const parsedCourses = JSON.parse(savedCourses);
        dispatch({ type: 'SET_COURSES', payload: parsedCourses });
      } catch (error) {
        console.error('Error refreshing courses:', error);
      }
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
