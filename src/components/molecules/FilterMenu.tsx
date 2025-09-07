import { Book, Clock, ChevronDown, ChevronUp, Wallet } from "lucide-react";
import { useState } from "react";
import type { FilterState } from "../../types/course";

interface FilterMenuProps {
    className?: string;
    onFilterChange: (filters: FilterState) => void;
    filters?: FilterState; // Make filters optional
}

// Filter options definition
const filterOptions = {
    bidangStudi: [
        "Pemasaran",
        "Digital & Teknologi", 
        "Pengembangan Diri",
        "Bisnis Manajemen"
    ],
    harga: [
        "Gratis",
        "< Rp100.000",
        "Rp100.000 – Rp500.000", 
        "> Rp500.000"
    ],
    durasi: [
        "Kurang dari 4 Jam",
        "4 – 8 Jam",
        "Lebih dari 8 Jam"
    ]
};

const FilterMenu = ({ className, onFilterChange, filters }: FilterMenuProps) => {
    const [openSection, setOpenSection] = useState<string | null>(null);

    // Safe default values for filters
    const safeFilters: FilterState = {
        bidangStudi: filters?.bidangStudi || [],
        harga: filters?.harga || [],
        durasi: filters?.durasi || []
    };

    const toggleSection = (section: string) => {
        setOpenSection(prev => (prev === section ? null : section));
    };

    const handleFilterChange = (
        category: keyof FilterState, 
        value: string, 
        checked: boolean
    ) => {
        const updatedFilters = {
            ...safeFilters,
            [category]: checked 
                ? [...safeFilters[category], value]
                : safeFilters[category].filter(item => item !== value)
        };
        onFilterChange(updatedFilters);
    };

    const resetFilters = () => {
        onFilterChange({
            bidangStudi: [],
            harga: [],
            durasi: []
        });
    };

    return (
        <div className={className}>




            <div className="w-full md:w-[366px] bg-white border rounded-lg p-4 shadow-sm flex flex-col mx-auto mb-4 ">
                {/* Reset Button */}
                <div className="flex justify-between mb-4">
                    <h6>
                        <span className="text-lg text-[#333333] font-semibold">Filter</span>
                    </h6>
                    <button 
                        onClick={resetFilters}
                        className="text-[#FF5C2B] font-semibold text-[16px] flex items-center gap-1 hover:underline"
                    >
                        Reset
                    </button>
                </div>

                {/* Filter Options */}
                <div className="space-y-3">
                    {/* Bidang Studi */}
                    <div className="rounded-lg bg-white shadow-md p-4">
                        <div
                            className="flex items-center justify-between cursor-pointer hover:text-yellow-600"
                            onClick={() => toggleSection("bidang")}
                        >
                            <div className="flex items-center gap-2">
                                <Book className="w-4 h-4 text-primary" />
                                <span className="text-sm text-primary font-medium">Bidang Studi</span>
                            </div>
                            {openSection === "bidang" || window.innerWidth >= 768 ? (
                                <ChevronUp className="w-4 h-4 text-primary" />
                            ) : (
                                <ChevronDown className="w-4 h-4 text-primary" />
                            )}
                        </div>
                        {(openSection === "bidang" || window.innerWidth >= 768) && (
                            <div className="mt-3 space-y-2 text-sm text-[#333] flex flex-col">
                                {filterOptions.bidangStudi.map((option) => (
                                    <label key={option} className="flex items-center gap-2 text-sm text-gray-800">
                                        <input 
                                            type="checkbox" 
                                            className="w-4 h-4 bg-primary"
                                            checked={safeFilters.bidangStudi.includes(option)}
                                            onChange={(e) => handleFilterChange('bidangStudi', option, e.target.checked)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Harga */}
                    <div className="rounded-lg bg-white shadow-md p-4">
                        <div
                            className="flex items-center justify-between cursor-pointer hover:text-yellow-600"
                            onClick={() => toggleSection("harga")}
                        >
                            <div className="flex items-center gap-2">
                                <Wallet className="w-4 h-4 text-primary" />
                                <span className="text-sm text-primary font-medium">Harga</span>
                            </div>
                            {openSection === "harga" || window.innerWidth >= 768 ? (
                                <ChevronUp className="w-4 h-4 text-primary" />
                            ) : (
                                <ChevronDown className="w-4 h-4 text-primary" />
                            )}
                        </div>
                        {(openSection === "harga" || window.innerWidth >= 768) && (
                            <div className="mt-3 space-y-2 text-sm text-[#333] flex flex-col">
                                {filterOptions.harga.map((option) => (
                                    <label key={option} className="flex items-center gap-2 text-sm text-gray-800">
                                        <input 
                                            type="checkbox" 
                                            className="w-4 h-4 bg-primary"
                                            checked={safeFilters.harga.includes(option)}
                                            onChange={(e) => handleFilterChange('harga', option, e.target.checked)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Durasi */}
                    <div className="rounded-lg bg-white shadow-md p-4">
                        <div
                            className="flex items-center justify-between cursor-pointer hover:text-yellow-600"
                            onClick={() => toggleSection("durasi")}
                        >
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-primary" />
                                <span className="text-sm text-primary font-medium">Durasi</span>
                            </div>
                            {openSection === "durasi" || window.innerWidth >= 768 ? (
                                <ChevronUp className="w-4 h-4 text-primary" />
                            ) : (
                                <ChevronDown className="w-4 h-4 text-primary" />
                            )}
                        </div>
                        {(openSection === "durasi" || window.innerWidth >= 768) && (
                            <div className="mt-3 space-y-2 text-sm text-[#333] flex flex-col">
                                {filterOptions.durasi.map((option) => (
                                    <label key={option} className="flex items-center gap-2 text-sm text-gray-800">
                                        <input 
                                            type="checkbox" 
                                            className="w-4 h-4 bg-primary"
                                            checked={safeFilters.durasi.includes(option)}
                                            onChange={(e) => handleFilterChange('durasi', option, e.target.checked)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>


        </div>
    );
};

export default FilterMenu;