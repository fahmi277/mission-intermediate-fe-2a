import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCourses } from '../../context/CourseContext';

type CoursePromoBannerProps = {
    isBanner?: boolean;
    courseId?: string; // Optional prop to pass specific course ID
};

const CoursePromoBanner: React.FC<CoursePromoBannerProps> = ({ isBanner = true, courseId }) => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { actions: { getCourseById } } = useCourses();
    
    // Get course data - use courseId prop if provided, otherwise use from URL params
    const targetCourseId = courseId || id;
    const course = targetCourseId ? getCourseById(targetCourseId) : null;

    // Default values if no course found
    const title = course?.title || "Gapai Karier Impianmu sebagai Seorang UI/UX Designer & Product Manager";
    const currentPrice = course?.price.current || 250000;
    const originalPrice = course?.price.original || 500000;
    const discount = course?.price.discount || 50;
    return (
        <div className="relative h-auto rounded-xl shadow-lg overflow-hidden p-6 w-full md:max-w-[350px] bg-white">
            {/* Header */}
            <h2 className="text-[18px] font-bold leading-snug mb-4">
                {title}
            </h2>

            {/* Pricing */}
            <div className="mb-4">
                {/* Price Section */}
                <div className="flex items-center gap-4 mb-3 flex-wrap">
                    <div className="text-[18px] font-bold text-green-400">
                        {currentPrice === 0 ? 'Gratis' : `Rp ${currentPrice.toLocaleString('id-ID')}`}
                    </div>
                    {originalPrice > currentPrice && originalPrice > 0 && (
                        <div className="line-through text-gray-300 text-[18px]">
                            Rp {originalPrice.toLocaleString('id-ID')}
                        </div>
                    )}
                    {discount > 0 && originalPrice > currentPrice && (
                        <div className="bg-green-500 text-white text-sm px-3 py-1 rounded-full font-semibold">
                            Diskon {discount}%
                        </div>
                    )}
                </div>
                
                {/* Offer Timer - only show if there's a discount */}
                {discount > 0 && (
                    <div className="text-sm text-blue-600 font-medium mb-4">
                        Penawaran berlaku 2 hari lagi
                    </div>
                )}

                {/* Buy Button */}
                {isBanner && (
                    <button
                        className="w-full bg-[#3ECF4C] hover:bg-green-600 text-white text-sm font-semibold py-3 px-6 rounded-xl transition duration-300 mb-4"
                        onClick={() => {
                            if (course) {
                                // Pass course data to payment page
                                navigate('/payment-methode', { state: { course } });
                            } else {
                                navigate('/payment-methode');
                            }
                        }}
                    >
                        Beli Sekarang
                    </button>
                )}
            </div>

            {/* Features */}
            <div className="mb-4">
                <div className="text-sm font-medium text-black mb-3">Kelas ini Sudah Termasuk</div>
                <ul className="grid grid-cols-2 gap-2 text-sm">
                    <li className="flex items-center gap-1">
                        <span>✅</span> Ujian Akhir
                    </li>
                    <li className="flex items-center gap-1">
                        <span>🎥</span> {course?.duration || '49'} Video
                    </li>
                    <li className="flex items-center gap-1">
                        <span>📄</span> 7 Dokumen
                    </li>
                    <li className="flex items-center gap-1">
                        <span>📜</span> Sertifikat
                    </li>
                    <li className="flex items-center gap-1">
                        <span>📝</span> Pretest
                    </li>
                    {course?.rating && (
                        <li className="flex items-center gap-1 col-span-2">
                            <span>⭐</span> {course.rating}/5 ({course.reviewCount} ulasan)
                        </li>
                    )}
                </ul>
            </div>

            {/* Language */}
            <div>
                <div className="text-sm font-medium text-black mb-2">Bahasa Pengantar</div>
                <div className="flex items-center gap-1 text-sm">
                    <span>🌐</span> Bahasa Indonesia
                </div>
            </div>

        </div>
    );
};

export default CoursePromoBanner;