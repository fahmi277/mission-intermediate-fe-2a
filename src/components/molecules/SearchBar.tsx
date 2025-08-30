import { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar = ({ onSearch, placeholder = "Cari Kelas", className = "" }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <div className={`relative w-full md:max-w-[240px] rounded-lg bg-white shadow-md p-4 flex flex-row items-center justify-between ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleInputChange}
        className="text-sm text-gray-800 placeholder-gray-400 focus:outline-none w-full"
      />
      {searchQuery ? (
        <button
          onClick={clearSearch}
          className="w-4 h-4 text-gray-400 hover:text-gray-600 ml-2 flex items-center justify-center"
        >
          ×
        </button>
      ) : (
        <Search className="w-4 h-4 text-primary ml-2" />
      )}
    </div>
  );
};

export default SearchBar;
