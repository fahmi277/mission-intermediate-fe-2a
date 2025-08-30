import { useState } from "react";

interface CategoryTabsProps {
  categories: string[];
  onCategoryChange: (category: string) => void;
  activeCategory: string;
}

const CategoryTabs = ({ categories, onCategoryChange, activeCategory }: CategoryTabsProps) => {
  return (
    <div className="category-buttons flex-nowrap flex justify-start gap-4 md:gap-6 px-4 py-3 md:py-4 text-xs md:text-sm font-medium overflow-x-auto scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`relative pb-1 px-1 md:px-0 whitespace-nowrap transition-colors duration-200 ${
            activeCategory === category
              ? "text-[#f25c05]"
              : "text-gray-500 hover:text-black"
          }`}
        >
          {category}
          {activeCategory === category && (
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#f25c05] rounded-full"></span>
          )}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
