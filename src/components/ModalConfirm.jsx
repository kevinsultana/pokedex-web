import React from "react";

export default function ModalConfirm({ onClickCancel, onClickConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm md:max-w-md lg:max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl text-black font-bold mb-4">Confirmation</h2>
        <p className="mb-4 text-black">
          Are you sure you want to remove this item from your collection?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClickConfirm}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md"
          >
            Yes
          </button>
          <button
            onClick={onClickCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded-md"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
