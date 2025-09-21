import type { Course } from '../types/course';
import type { MockCourse } from '../types/user';

// Transform MockAPI course data to application Course interface
export const transformMockCourseToAppCourse = (mockCourse: MockCourse): Course => {
  return {
    id: mockCourse.id,
    title: mockCourse.courseName,
    instructor: {
      name: mockCourse.courseIntructorName,
      job: mockCourse.courseInstructorJob,
      company: mockCourse.courseInstructorJobDetail || 'Unknown Company',
      avatar: '/images/userIcon.png' // Default avatar
    },
    price: {
      current: mockCourse.coursePrice,
      original: mockCourse.coursePrice,
      discount: 0
    },
    rating: 4.5, // Default rating since MockAPI doesn't provide this
    reviewCount: Math.floor(Math.random() * 100) + 10, // Random review count
    category: 'General', // Default category since MockAPI doesn't provide this
    duration: `${Math.floor(Math.random() * 10) + 1} Jam`, // Random duration
    image: mockCourse.courseImage,
    description: `Learn ${mockCourse.courseName} with ${mockCourse.courseIntructorName}. This comprehensive course will guide you through all the essential concepts and practical applications.`
  };
};

// Transform application course data to MockAPI format
export const transformAppCourseToMockCourse = (appCourse: Partial<Course>): Partial<MockCourse> => {
  return {
    courseName: appCourse.title,
    courseIntructorName: appCourse.instructor?.name,
    courseImage: appCourse.image,
    coursePrice: appCourse.price?.current,
    courseInstructorJob: appCourse.instructor?.job,
    courseInstructorJobDetail: appCourse.instructor?.company
  };
};