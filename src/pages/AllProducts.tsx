import HeaderDashboard from "../components/HeaderDashboard";
import { useNavigate } from "react-router-dom";
import FilterMenu from "../components/molecules/FilterMenu";
import FooterContent from "../components/molecules/FooterContent";
import courseImage from '../data/courseImage'; // import courseImage from the correct path
import avatarImage from "../data/avatarImage"; // import avatarImage from the correct path
import CourseCard from "../components/molecules/CourseCard";
import CustomPagination from "../components/molecules/CustomPagination";
import SortDropdown from "../components/molecules/SortDropDown";
import { Search } from "lucide-react";



const AllProducts = () => {
  const navigate = useNavigate();
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



          <FilterMenu className="mr-4" />
          {/* Urutkan dan Cari Kelas */}

          <div>


            <div className="flex flex-row gap-4 justify-end mb-4 h-[60px]">

              <SortDropdown />


              {/* Cari Kelas (Input) */}
              <div className="relative w-full md:max-w-[240px] rounded-lg bg-white shadow-md p-4 flex flex-row items-center justify-between">
                <input
                  type="text"
                  placeholder="Cari Kelas"
                  className="text-sm text-gray-800 placeholder-gray-400 focus:outline-none w-full"
                />
                <Search className="w-4 h-4 text-primary ml-2" />
              </div>
            </div>



            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">

              {
                // Generate multiple CourseCard components with random images and avatars
                Array.from({ length: 9 }).map((_, index) => (
                  <CourseCard
                    key={index}
                    courseImage={courseImage[index]}
                    avatarImage={avatarImage[index]}
                    courseName="Big 4 Auditor Financial Analyst"
                    instructorName="Jenna Ortega"
                    instructorJob="Senior Accountant"
                    instructorCompany="Harisenin"
                    rating={(index % 5) + 3} // Example rating from 1 to 5
                    reviewCount={120}
                    price={`Rp ${(100 +
                      Math.floor(Math.random() * 5) * 150).toLocaleString()} K`} // Example price variation
                    onClick={() => navigate("/detail-product")}
                  />
                ))
              }

            </div>
            <CustomPagination
              totalPages={5} // Example total pages
            // onPageChange={(page) => console.log(`Current Page: ${page}`)}
            />

          </div>



        </div>
      </div>
      <FooterContent />
      {/* Render your product list here */}
    </div>
  );
};

export default AllProducts;