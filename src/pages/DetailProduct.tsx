import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Edit, Trash2, ArrowLeft } from "lucide-react";
import HeaderDashboard from "../components/HeaderDashboard";
import Breadcrumb from "../components/molecules/Breadcrumb";
import { RatingStars } from "../components/molecules/RatingStars";
import CoursePromoBanner from "../components/molecules/CoursePromoBanner";
import CourseDescription from "../components/molecules/CourseDescription";
import TutorProfile from "../components/molecules/TutorProfile";
import AddCourseForm from "../components/molecules/AddCourseForm";
import { useCourses } from "../context/CourseContext";
import type { Course } from "../types/course";

const DetailProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state: { courses }, actions: { getCourseById, updateCourse, deleteCourse } } = useCourses();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (id) {
      const foundCourse = getCourseById(id);
      if (foundCourse) {
        setCourse(foundCourse);
      } else {
        // Course not found, redirect to dashboard
        navigate('/dashboard');
      }
    }
  }, [id, getCourseById, navigate]);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleUpdate = (courseData: Omit<Course, 'id'>) => {
    if (course) {
      const updatedCourse: Course = {
        ...courseData,
        id: course.id
      };
      updateCourse(updatedCourse);
      setCourse(updatedCourse);
      setIsEditMode(false);
    }
  };

  const handleDelete = () => {
    if (course) {
      deleteCourse(course.id);
      navigate('/dashboard');
    }
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FF5C2B] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <HeaderDashboard />

      <div className="container px-4 mx-auto w-full bg-[##fffdf2]">
        {/* Admin Controls */}
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Dashboard
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit Course
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete Course
            </button>
          </div>
        </div>

        <Breadcrumb
          items={[
            { label: "Beranda", href: "/" },
            { label: course.category, href: "/dashboard" },
            { label: course.title },
          ]}
        />
        
        <div className="relative min-h-[400px] bg-dashboard bg-cover bg-no-repeat text-white shadow-md rounded-lg overflow-hidden flex justify-left text-left mb-6">
          {/* Overlay hanya di gambar */}
          <div className="absolute inset-0 bg-black opacity-80 z-0 rounded-lg" />

          {/* Konten di atas overlay */}
          <div className="w-full relative z-10 py-[24px] md:py-[20px] flex flex-col items-start text-left px-5 md:px-10 justify-center">
            <h2 className="text-[24px] md:text-[48px] font-semibold mb-3 max-w-[240px] md:max-w-[900px] leading-snug">
              {course.title}
            </h2>

            <p className="text-white text-[14px] md:text-[16px] mb-6 max-w-[270px] md:max-w-[480px] lg:max-w-[920px] leading-relaxed">
              {course.description}
            </p>

            <RatingStars rating={course.rating} reviewCount={course.reviewCount} className="mb-4" />
          </div>
        </div>

        <div className="block md:hidden">
          <div className="flex flex-col gap-4">
            <CourseDescription />
            <CoursePromoBanner isBanner={true} />
          </div>
          <div>
            <TutorProfile />
          </div>
        </div>

        <div className="hidden md:block">
          <div className="flex flex-row gap-6">
            <div className="basis-3/4">
              <CourseDescription />
              <TutorProfile />
            </div>
            <div>
              <CoursePromoBanner isBanner={true} />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Course Modal */}
      {isEditMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Edit Course</h2>
                <button
                  onClick={handleCancelEdit}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              <AddCourseForm
                onAddCourse={handleUpdate}
                onCancel={handleCancelEdit}
                isOpen={true}
                editMode={true}
                initialData={course}
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="text-center">
              <Trash2 className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Delete Course
              </h3>
              <p className="text-gray-600 mb-6">
                Apakah Anda yakin ingin menghapus course "{course.title}"? 
                Tindakan ini tidak dapat dibatalkan.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Hapus Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailProduct;
