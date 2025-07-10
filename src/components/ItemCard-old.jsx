import React, { use } from "react";
import { useNavigate } from "react-router";
import { MdOutlinePlaylistAdd } from "react-icons/md";

export default function ItemCardOld({ data }) {
  const navigate = useNavigate();

  const capilatizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleReadMoreClick = () => {
    navigate(`/detail/${data.id}`);
  };

  return (
    <div className="bg-green-600 p-4 rounded-2xl">
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-2">
          {data?.types.map((item, index) => {
            return (
              <div key={index} className="bg-emerald-600 rounded-2xl px-1 py-1">
                {capilatizeFirstLetter(item?.type.name)}
              </div>
            );
          })}
        </div>
        <h1>#{data?.id}</h1>
      </div>

      <div className="flex w-full items-center gap-1">
        <div className="w-2/3 space-y-4">
          <h1 className="text-4xl font-bold">
            {capilatizeFirstLetter(data?.name)}
          </h1>
          <p>{data?.description}</p>
          <div className="flex gap-4">
            <button
              onClick={handleReadMoreClick}
              className="bg-emerald-600 px-4 py-2 rounded-2xl cursor-pointer"
            >
              Read More
            </button>
            <button
              // onClick={handleReadMoreClick}
              className="bg-emerald-600 px-4 py-2 rounded-2xl cursor-pointer"
            >
              <MdOutlinePlaylistAdd />
            </button>
          </div>
        </div>
        <div className="w-1/3 flex justify-end">
          <img
            src={data?.sprites.other.dream_world.front_default}
            alt="bulbasour"
            className="w-full object-cover  "
          />
        </div>
      </div>
    </div>
  );
}
