import { useState, useMemo } from "react";
import HeaderDashboard from "../components/HeaderDashboard";
import { useNavigate } from "react-router-dom";
import FilterMenu from "../components/molecules/FilterMenu";
import FooterContent from "../components/molecules/FooterContent";
import CourseCard from "../components/molecules/CourseCard";
import CustomPagination from "../components/molecules/CustomPagination";
import SortDropdown from "../components/molecules/SortDropDown";
import SearchBar from "../components/molecules/SearchBar";

import { useCourses } from "../context/CourseContext";
import type { Course, FilterState } from "../types/course";

const AllProducts = () => {
  const navigate = useNavigate();
  
  // Get courses from context
  const { state: { courses } } = useCourses();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    bidangStudi: [],
    harga: [],
    durasi: []
  });
  const [sortBy] = useState<"rating" | "price-low" | "price-high" | "newest">("rating"); // setSortBy removed as not used yet
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Helper functions untuk filtering
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

      // Filter berdasarkan bidang studi
      const matchesBidangStudi = 
        filters.bidangStudi.length === 0 || 
        filters.bidangStudi.includes(course.category);

      // Filter berdasarkan harga
      const matchesPrice = matchesPriceFilter(course, filters.harga);

      // Filter berdasarkan durasi
      const matchesDuration = matchesDurationFilter(course, filters.durasi);

      return matchesSearch && matchesBidangStudi && matchesPrice && matchesDuration;
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
          return b.id.localeCompare(a.id);
        default:
          return 0;
      }
    });

    return sorted;
  }, [courses, searchQuery, filters, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedCourses.length / itemsPerPage);
  const paginatedCourses = filteredAndSortedCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Event handlers
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <HeaderDashboard />
      <div className="container px-4 mx-auto w-full bg-[##fffdf2]">
        <div className="max-w-[320px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[1000px]">

          <h1 className="text-[24px] font-semibold mb-4">Koleksi Video <br className="inline sm:hidden" /> Pembelajaran  Unggulan</h1>
          <p className="text-[14px] text-gray-600 mb-6">
            Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!
          </p>


        </div>

        <div className="flex flex-col md:flex-row justify-between">

          {/* FilterMenu with proper props */}
          <FilterMenu 
            className="mr-4" 
            filters={filters}
            onFilterChange={handleFilterChange}
          />
          
          {/* Urutkan dan Cari Kelas */}
          <div>
            <div className="flex flex-row gap-4 justify-end mb-4 h-[60px]">
              <SortDropdown />
              
              {/* Search Bar */}
              <SearchBar 
                onSearch={handleSearch}
                placeholder="Cari Kelas"
              />
            </div>

            {/* Results Info */}
            <div className="mb-4">
              <p className="text-gray-600 text-sm">
                Menampilkan {paginatedCourses.length} dari {filteredAndSortedCourses.length} kelas
                {searchQuery && <span> untuk "{searchQuery}"</span>}
                - Halaman {currentPage} dari {totalPages}
              </p>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {paginatedCourses.map((course) => (
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
                    setFilters({ bidangStudi: [], harga: [], durasi: [] });
                    setCurrentPage(1);
                  }}
                  className="mt-4 px-6 py-2 bg-[#FF5C2B] text-white rounded-lg hover:bg-[#e5511f] transition-colors"
                >
                  Reset Semua Filter
                </button>
              </div>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <CustomPagination
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
      <FooterContent />
      {/* Render your product list here */}
    </div>
  );
};

export default AllProducts;