import { useNavigate } from "react-router";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";

export default function ItemCard({
  data,
  onClickSave,
  bgClass,
  isFavorite = false,
}) {
  const navigate = useNavigate();

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleReadMoreClick = () => {
    navigate(`/detail/${data.id}`);
  };

  const handleSaveToCollection = (i) => {
    onClickSave(i);
  };

  return (
    <div
      className={`relative ${bgClass} hover:scale-102 hover:outline-white hover:outline-offset-2 transition-all duration-300 p-4 rounded-2xl outline-2 outline-slate-400 shadow-md shadow-slate-500`}
    >
      <div
        onClick={handleReadMoreClick}
        className="flex justify-between items-center mb-2"
      >
        <div className="flex gap-2">
          {data?.types.map((item, index) => (
            <div
              key={index}
              className="bg-emerald-600 outline rounded-lg px-3 py-1"
            >
              {capitalizeFirstLetter(item?.type.name)}
            </div>
          ))}
        </div>
        <h1>#{data?.id}</h1>
      </div>

      <div className="flex w-full items-center gap-1 ">
        <div className="w-2/3 space-y-4">
          <h1 className="text-4xl font-bold">
            {capitalizeFirstLetter(data?.name)}
          </h1>
          {isFavorite ? <div className="h-8" /> : <p>{data?.description}</p>}
          <div className="flex gap-4 items-center">
            <button
              onClick={handleReadMoreClick}
              className="bg-emerald-600 px-4 py-2 rounded-2xl cursor-pointer"
            >
              Read More
            </button>

            <button
              onClick={() => handleSaveToCollection(data)}
              className="bg-emerald-600 px-4 py-2 rounded-2xl cursor-pointer"
            >
              {isFavorite ? (
                <FaTrashCan size={22} />
              ) : (
                <MdOutlinePlaylistAdd size={24} />
              )}
            </button>
          </div>
        </div>
        <div className="w-1/3 flex justify-end">
          <img
            src={data?.sprites.other.dream_world.front_default}
            alt={data?.name}
            className="w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
