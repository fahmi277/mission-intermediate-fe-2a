// import React from 'react';
import { useMemo } from 'react';
import { RatingStars } from './RatingStars';
import { Edit, Trash2 } from 'lucide-react';

type CourseType = {
    courseImage: string
    avatarImage: string
    courseName: string
    instructorName: string
    instructorJob: string
    instructorCompany?: string
    rating: number
    reviewCount: number
    price: string
    onClick?: () => void // Optional click handler
    onEdit?: () => void // Optional edit handler
    onDelete?: () => void // Optional delete handler
    showActions?: boolean // Flag to show/hide action buttons
}

const CourseCard = ({ courseImage, avatarImage, courseName, instructorName, instructorJob, instructorCompany, rating, reviewCount, price, onClick, onEdit, onDelete, showActions = false }: CourseType) => {
    const ratingStars = useMemo(() => <RatingStars rating={rating} reviewCount={reviewCount} />, [rating, reviewCount]);

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden w-full mx-auto relative">
            {/* Action buttons */}
            {showActions && (
                <div className="absolute top-2 right-2 flex gap-1 z-10">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onEdit) onEdit();
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded"
                    >
                        <Edit size={16} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onDelete) onDelete();
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white p-1 rounded"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            )}
            
            <div 
                className="cursor-pointer"
                onClick={() => {
                    if (onClick) onClick(); // Call the onClick handler if provided
                }}
            >
            {/* Image */}

            <div className="p-4 flex flex-row md:flex-col gap-4 items-center md:items-start">

                <img
                    src={courseImage}
                    alt="Course Thumbnail"
                    className="w-[82px] h-[82px] md:w-[344px] md:h-[193px] rounded-md object-cover"
                />

                <div>
                    <h3 className="font-semibold text-[16px] mb-1">{courseName}</h3>

                    <div className="flex flex-row items-center gap-2 mb-2">
                        <img
                            src={avatarImage}
                            alt="Avatar"
                            className="w-[40px] h-[40px] rounded-sm object-cover"
                        />
                        <div>
                            <h2 className="text-[16px] font-semibold text-gray-800">{instructorName}</h2>
                            {/* <p className="text-[14px] text-gray-600 mb-3">{instructorJob} di {instructorCompany} </p> */}
                            <p className="text-[14px] text-gray-600 mb-3">
                                {instructorJob} di
                                <span className="font-semibold hidden md:inline"> {instructorCompany}</span>
                            </p>
                        </div>
                    </div>

                </div>


            </div>
            {/* Image */}


            {/* Content */}
            <div className="px-4 mb-4 flex flex-row justify-between items-center">
                <div className="flex items-center gap-2">
                    {ratingStars}
                </div>
                <div className="flex items-center text-green-600 font-semibold text-md lg:text-md">
                    {price}
                </div>
            </div>
            </div>
        </div>
    );
};

export default CourseCard;


