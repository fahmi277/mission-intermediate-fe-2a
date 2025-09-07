import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import HeaderDashboard from "../components/HeaderDashboard";
import CourseCard from "../components/molecules/CourseCard";
import BannerCard from "../components/molecules/BannerCard";
import FooterContent from "../components/molecules/FooterContent";
import FilterMenu from "../components/molecules/FilterMenu";
import SearchBar from "../components/molecules/SearchBar";
import CategoryTabs from "../components/molecules/CategoryTabs";
import AddCourseForm from "../components/molecules/AddCourseForm";

import { useCourses } from "../context/CourseContext";
import type { Course, FilterState } from "../types/course";
import { useCart } from "../hooks/useCart";

const Dashboard: React.FC = () => {
    // Get courses from context
    const { state: { courses }, actions: { addCourse } } = useCourses();
    
    // Local state management dengan useState
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Semua Kelas");
    const [filters, setFilters] = useState<FilterState>({
        bidangStudi: [],
        harga: [],
        durasi: []
    });
    const [sortBy, setSortBy] = useState<"rating" | "price-low" | "price-high" | "newest">("rating");
    const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);

    const navigate = useNavigate();
    const { getTotalItems } = useCart();

    // Categories untuk tabs
    const categories = [
        "Semua Kelas",
        "Pemasaran", 
        "Digital & Teknologi",
        "Pengembangan Diri",
        "Bisnis Manajemen"
    ];

    // Helper function untuk filter berdasarkan harga
    const matchesPriceFilter = (course: Course, priceFilters: string[]) => {
        if (priceFilters.length === 0) return true;
        
        return priceFilters.some(filter => {
            switch (filter) {
                case "Gratis":
                    return course.price.current === 0;
                case "< Rp100.000":
                    return course.price.current < 100000;
                case "Rp100.000 – Rp500.000":
                    return course.price.current >= 100000 && course.price.current <= 500000;
                case "> Rp500.000":
                    return course.price.current > 500000;
                default:
                    return true;
            }
        });
    };

    // Helper function untuk filter berdasarkan durasi
    const matchesDurationFilter = (course: Course, durationFilters: string[]) => {
        if (durationFilters.length === 0) return true;
        
        const duration = parseInt(course.duration);
        return durationFilters.some(filter => {
            switch (filter) {
                case "Kurang dari 4 Jam":
                    return duration < 4;
                case "4 – 8 Jam":
                    return duration >= 4 && duration <= 8;
                case "Lebih dari 8 Jam":
                    return duration > 8;
                default:
                    return true;
            }
        });
    };

    // Array operations dengan useMemo untuk performance
    const filteredAndSortedCourses = useMemo(() => {
        let filtered = courses.filter(course => {
            // Filter berdasarkan search query
            const matchesSearch = 
                course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.description.toLowerCase().includes(searchQuery.toLowerCase());

            // Filter berdasarkan kategori
            const matchesCategory = 
                selectedCategory === "Semua Kelas" || 
                course.category === selectedCategory;

            // Filter berdasarkan bidang studi
            const matchesBidangStudi = 
                filters.bidangStudi.length === 0 || 
                filters.bidangStudi.includes(course.category);

            // Filter berdasarkan harga
            const matchesPrice = matchesPriceFilter(course, filters.harga);

            // Filter berdasarkan durasi
            const matchesDuration = matchesDurationFilter(course, filters.durasi);

            return matchesSearch && matchesCategory && matchesBidangStudi && matchesPrice && matchesDuration;
        });

        // Sorting dengan array methods
        const sorted = [...filtered].sort((a, b) => {
            switch (sortBy) {
                case "rating":
                    return b.rating - a.rating;
                case "price-low":
                    return a.price.current - b.price.current;
                case "price-high":
                    return b.price.current - a.price.current;
                case "newest":
                    return b.id.localeCompare(a.id); // Assuming newer courses have higher IDs
                default:
                    return 0;
            }
        });

        return sorted;
    }, [courses, searchQuery, selectedCategory, filters, sortBy]);

    // Event handlers
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleFilterChange = (newFilters: FilterState) => {
        setFilters(newFilters);
    };

    // Handler untuk menambah course baru
    const handleAddCourse = (courseData: Omit<Course, "id">) => {
        addCourse(courseData);
        setIsAddCourseOpen(false);
    };

    const handleCancelAddCourse = () => {
        setIsAddCourseOpen(false);
    };

    return (
        <div>


            <div className="mb-7">
                <HeaderDashboard />
            </div>

            <div className="container mx-auto px-4 ">
                <div className="relative min-h-[400px] bg-dashboard bg-cover bg-no-repeat text-white shadow-md rounded-lg overflow-hidden flex justify-center text-center mb-6">
                    {/* Overlay hanya di gambar */}
                    <div className="absolute inset-0 bg-black opacity-60 z-0 rounded-lg" />

                    {/* Konten di atas overlay */}
                    <div className="relative z-10 px-4 py-[24px] md:py-[20px] flex flex-col items-center text-center">
                        <h2 className="text-[24px] md:text-[48px] font-semibold mb-3 max-w-[240px] md:max-w-[800px] leading-snug">
                            <span className="block md:hidden">
                                Revolusi <br /> Pembelajaran: <br />
                                Temukan Ilmu Baru melalui Platform Video Interaktif!
                            </span>

                            <span className="hidden md:inline"
                               
                            >

                                Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform Video Interaktif!

                            </span>
                        </h2>

                        <p className="text-white text-[14px] md:text-[16px] mb-6 max-w-[270px] md:max-w-[480px] lg:max-w-[920px] mx-auto leading-relaxed">
                            Temukan ilmu baru yang menarik dan mendalam melalui koleksi video pembelajaran berkualitas tinggi. Tidak hanya itu, <br className="hidden md:inline" /> Anda juga dapat berpartisipasi dalam latihan interaktif yang akan meningkatkan pemahaman Anda.
                        </p>

                        <button className="bg-[#3ECF4C] hover:bg-green-700 text-sm text-white py-2 px-6 rounded-md transition duration-300"
                         onClick={() => navigate("/all-products")}>
                            Temukan Video Course untuk Dipelajari!
                        </button>
                    </div>
                </div>
                
                {/* Header Section dengan tombol Add Course */}
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-sm md:text-lg font-semibold mb-3">Kelola Video <br /> Pembelajaran Unggulan</h2>
                        <p className="text-[#333333AD] text-sm md:text-base">
                            Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!
                        </p>
                    </div>
                    <button
                        onClick={() => setIsAddCourseOpen(true)}
                        className="bg-[#FF5C2B] hover:bg-[#e5511f] text-white px-8 py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                        {/* <span className="text-xl">+</span> */}
                        Tambah Course
                    </button>
                </div>

                {/* Category Tabs dengan useState */}
                <div className="bg-[#fdfbf5] mb-6 md:mb-8">
                    <CategoryTabs 
                        categories={categories}
                        activeCategory={selectedCategory}
                        onCategoryChange={handleCategoryChange}
                    />
                </div>

                {/* Search dan Filter Section */}
                <div className="flex flex-col lg:flex-row gap-6 mb-6">
                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row gap-4 mb-4">
                            <SearchBar 
                                onSearch={handleSearch}
                                placeholder="Cari kelas, instruktur, atau topik..."
                            />
                            
                            {/* Sort Dropdown */}
                            <select 
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5C2B] bg-white"
                            >
                                <option value="rating">Rating Tertinggi</option>
                                <option value="price-low">Harga Terendah</option>
                                <option value="price-high">Harga Tertinggi</option>
                                <option value="newest">Terbaru</option>
                            </select>
                        </div>

                        {/* Results Info */}
                        <div className="mb-4">
                            <p className="text-gray-600 text-sm">
                                Menampilkan {filteredAndSortedCourses.length} dari {courses.length} kelas
                                {searchQuery && (
                                    <span> untuk "{searchQuery}"</span>
                                )}
                                {getTotalItems() > 0 && (
                                    <span className="ml-4 text-[#FF5C2B] font-medium">
                                        {getTotalItems()} item di keranjang
                                    </span>
                                )}
                            </p>
                        </div>

                        {/* Course Grid dengan data dari state */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                            {filteredAndSortedCourses.map((course) => (
                                <CourseCard
                                    key={course.id}
                                    courseImage={course.image}
                                    avatarImage={course.instructor.avatar}
                                    courseName={course.title}
                                    instructorName={course.instructor.name}
                                    instructorJob={course.instructor.job}
                                    instructorCompany={course.instructor.company}
                                    rating={course.rating}
                                    reviewCount={course.reviewCount}
                                    price={`Rp ${course.price.current.toLocaleString()}`}
                                    onClick={() => navigate(`/detail-product/${course.id}`)}
                                />
                            ))}
                        </div>

                        {/* Empty State */}
                        {filteredAndSortedCourses.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg mb-2">Tidak ada kelas yang ditemukan</p>
                                <p className="text-gray-400 text-sm">Coba ubah filter atau kata kunci pencarian</p>
                                <button 
                                    onClick={() => {
                                        setSearchQuery("");
                                        setSelectedCategory("Semua Kelas");
                                        setFilters({ bidangStudi: [], harga: [], durasi: [] });
                                    }}
                                    className="mt-4 px-6 py-2 bg-[#FF5C2B] text-white rounded-lg hover:bg-[#e5511f] transition-colors"
                                >
                                    Reset Semua Filter
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Filter Menu di samping */}
                    <div className="lg:w-80">
                        <FilterMenu 
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            className="sticky top-4"
                        />
                    </div>
                </div>

                <BannerCard heading="Mau Belajar Lebih Banyak ?" subheading="Daftarkan dirimu untuk mendapatkan informasi terbaru dan penawaran spesial dari program-program terbaik harisenin.com" />

                <FooterContent />

            </div>

            {/* Add Course Modal */}
            {isAddCourseOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text- font-bold text-gray-900">Tambah Course Baru</h2>
                                <button
                                    onClick={handleCancelAddCourse}
                                    className="text-gray-400 hover:text-gray-600 text-2xl"
                                >
                                    ×
                                </button>
                            </div>
                            <AddCourseForm
                                onAddCourse={handleAddCourse}
                                onCancel={handleCancelAddCourse}
                                isOpen={isAddCourseOpen}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>


    );
}

export default Dashboard;