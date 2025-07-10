import React from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="flex gap-2 w-full justify-center py-8">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="p-2  rounded-full disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        <FaChevronCircleLeft className="text-emerald-400 text-2xl" />
      </button>
      <div className="text-white font-semibold text-3xl">
        Page {currentPage} of {totalPages}
      </div>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        <FaChevronCircleRight className="text-emerald-400 text-2xl" />
      </button>
    </div>
  );
}
