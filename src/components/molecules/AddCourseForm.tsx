import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import type { Course } from "../../types/course";

interface AddCourseFormProps {
  onAddCourse: (course: Omit<Course, 'id'>) => void;
  onCancel: () => void;
  isOpen: boolean;
  editMode?: boolean;
  initialData?: Course;
}

const AddCourseForm: React.FC<AddCourseFormProps> = ({ 
  onAddCourse, 
  onCancel, 
  isOpen, 
  editMode = false, 
  initialData 
}) => {
  // State management untuk form dengan useState
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    instructor: {
      name: initialData?.instructor.name || "",
      job: initialData?.instructor.job || "",
      company: initialData?.instructor.company || "Harisenin",
      avatar: initialData?.instructor.avatar || "images/avatar/avatar1.png"
    },
    price: {
      current: initialData?.price.current || 0,
      original: initialData?.price.original || 0,
      discount: initialData?.price.discount || 0
    },
    rating: initialData?.rating || 4.5,
    reviewCount: initialData?.reviewCount || 0,
    category: initialData?.category || "Pemasaran",
    duration: initialData?.duration || "",
    image: initialData?.image || "images/auditor_financial_analyst.jpg",
    description: initialData?.description || ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Category options
  const categories = ["Pemasaran", "Digital & Teknologi", "Pengembangan Diri", "Bisnis Manajemen"];
  const avatarOptions = [
    "images/avatar/avatar1.png",
    "images/avatar/avatar2.png", 
    "images/avatar/avatar3.png",
    "images/avatar/avatar4.png",
    "images/avatar/avatar5.png",
    "images/avatar/avatar6.png",
    "images/avatar/avatar7.png",
    "images/avatar/avatar8.png",
    "images/avatar/avatar9.png"
  ];

  const courseImages = [
    "images/auditor_financial_analyst.jpg",
    "images/auditor_financial_analyst_2.jpg",
    "images/auditor_financial_analyst_3.jpg",
    "images/auditor_financial_analyst_4.jpg",
    "images/auditor_financial_analyst_5.jpg",
    "images/auditor_financial_analyst_6.jpg",
    "images/auditor_financial_analyst_7.jpg",
    "images/auditor_financial_analyst_8.jpg",
    "images/auditor_financial_analyst_9.jpg"
  ];

  // Event handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested objects (instructor.name, price.current, etc.)
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as object,
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handlePriceChange = (field: 'current' | 'original') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setFormData(prev => {
      const newPrice = {
        ...prev.price,
        [field]: value
      };
      
      // Auto calculate discount
      if (newPrice.original > 0 && newPrice.current > 0) {
        newPrice.discount = Math.round(((newPrice.original - newPrice.current) / newPrice.original) * 100);
      }
      
      return {
        ...prev,
        price: newPrice
      };
    });
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Judul course harus diisi";
    if (!formData.instructor.name.trim()) newErrors['instructor.name'] = "Nama instruktur harus diisi";
    if (!formData.instructor.job.trim()) newErrors['instructor.job'] = "Jabatan instruktur harus diisi";
    if (!formData.description.trim()) newErrors.description = "Deskripsi harus diisi";
    if (!formData.duration.trim()) newErrors.duration = "Durasi harus diisi";
    if (formData.price.current <= 0) newErrors['price.current'] = "Harga harus lebih dari 0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAddCourse(formData);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      instructor: {
        name: "",
        job: "",
        company: "Harisenin",
        avatar: "images/avatar/avatar1.png"
      },
      price: {
        current: 0,
        original: 0,
        discount: 0
      },
      rating: 4.5,
      reviewCount: 0,
      category: "Pemasaran",
      duration: "",
      image: "images/auditor_financial_analyst.jpg",
      description: ""
    });
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-900">
            {editMode ? 'Edit Course' : 'Tambah Course Baru'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Course Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Judul Course *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5C2B] ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Masukkan judul course"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5C2B]"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Durasi *
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5C2B] ${
                    errors.duration ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="contoh: 8 jam"
                />
                {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
              </div>

              {/* Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Harga Sekarang *
                  </label>
                  <input
                    type="number"
                    name="price.current"
                    value={formData.price.current || ''}
                    onChange={handlePriceChange('current')}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5C2B] ${
                      errors['price.current'] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="250000"
                  />
                  {errors['price.current'] && <p className="text-red-500 text-sm mt-1">{errors['price.current']}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Harga Asli
                  </label>
                  <input
                    type="number"
                    name="price.original"
                    value={formData.price.original || ''}
                    onChange={handlePriceChange('original')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5C2B]"
                    placeholder="500000"
                  />
                  {formData.price.discount > 0 && (
                    <p className="text-green-600 text-sm mt-1">Diskon: {formData.price.discount}%</p>
                  )}
                </div>
              </div>

              {/* Course Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gambar Course
                </label>
                <select
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5C2B]"
                >
                  {courseImages.map((image, index) => (
                    <option key={image} value={image}>Course Image {index + 1}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Instructor Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Instruktur *
                </label>
                <input
                  type="text"
                  name="instructor.name"
                  value={formData.instructor.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5C2B] ${
                    errors['instructor.name'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Nama lengkap instruktur"
                />
                {errors['instructor.name'] && <p className="text-red-500 text-sm mt-1">{errors['instructor.name']}</p>}
              </div>

              {/* Instructor Job */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jabatan Instruktur *
                </label>
                <input
                  type="text"
                  name="instructor.job"
                  value={formData.instructor.job}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5C2B] ${
                    errors['instructor.job'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="contoh: Senior Developer"
                />
                {errors['instructor.job'] && <p className="text-red-500 text-sm mt-1">{errors['instructor.job']}</p>}
              </div>

              {/* Instructor Avatar */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Avatar Instruktur
                </label>
                <select
                  name="instructor.avatar"
                  value={formData.instructor.avatar}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5C2B]"
                >
                  {avatarOptions.map((avatar, index) => (
                    <option key={avatar} value={avatar}>Avatar {index + 1}</option>
                  ))}
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating Awal
                </label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  min="1"
                  max="5"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5C2B]"
                />
              </div>

              {/* Review Count */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah Review
                </label>
                <input
                  type="number"
                  name="reviewCount"
                  value={formData.reviewCount}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5C2B]"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi Course *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5C2B] ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Deskripsi lengkap tentang course ini..."
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#FF5C2B] text-white rounded-lg hover:bg-[#e5511f] transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              {editMode ? 'Update Course' : 'Tambah Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseForm;
