import axios from "axios";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import PokemonCollectionModal from "./PokemonCollectionModal";

export default function CardDetail({ pokemon, descript, selectedLang }) {
  const [abilitiesLang, setAbilitiesLang] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const statLabels = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SpA",
    "special-defense": "SpD",
    speed: "SPD",
  };

  const getAbilities = async () => {
    try {
      const abilityDetailPromises = pokemon.abilities.map((ability) =>
        axios.get(ability.ability.url)
      );

      const responses = await Promise.all(abilityDetailPromises);

      const detailedAbilities = responses.map((response) => response.data);

      setAbilitiesLang(detailedAbilities);
    } catch (error) {
      console.error("Error fetching abilities:", error);
    }
  };

  useEffect(() => {
    getAbilities();
  }, []);

  const japanLang = abilitiesLang.map((ability) =>
    ability.names.find((name) => name.language.name === "ja")
  );

  const typeColors = {
    fire: "from-orange-500 to-red-600",
    water: "from-blue-500 to-blue-700",
    grass: "from-green-500 to-green-700",
    electric: "from-yellow-400 to-yellow-600",
    psychic: "from-pink-500 to-pink-700",
    ice: "from-cyan-400 to-cyan-600",
    dragon: "from-purple-600 to-purple-800",
    dark: "from-gray-800 to-gray-950",
    fairy: "from-pink-400 to-pink-600",
    normal: "from-gray-400 to-gray-600",
    fighting: "from-red-700 to-red-900",
    flying: "from-indigo-400 to-indigo-600",
    poison: "from-purple-500 to-purple-700",
    ground: "from-yellow-700 to-yellow-900",
    rock: "from-yellow-800 to-yellow-950",
    bug: "from-green-600 to-green-800",
    ghost: "from-indigo-600 to-indigo-800",
    steel: "from-gray-500 to-gray-700",
  };

  const type1 = pokemon.types[0]?.type.name;
  const type2 = pokemon.types[1]?.type.name;

  const color1 = typeColors[type1]?.split(" ")[0] || "from-slate-500";
  const color2 = typeColors[type2]?.split(" ")[1] || "to-slate-400";
  const bgClass = `bg-gradient-to-br ${color1} ${color2}`;

  const handleSaveToCollection = (data) => {
    setSelectedData(data);
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div
          className={`rounded-2xl ${bgClass} p-4 py-8 flex w-fit flex-col lg:flex-row mx-4`}
        >
          <div className="flex items-center justify-center">
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              className="w-62 lg:w-[500px] "
            />
          </div>

          <div className="flex flex-col gap-2  justify-center pl-4">
            <div className="text-base font-bold">#{pokemon.id}</div>
            <div className="font-bold text-2xl">{pokemon.name}</div>

            <div className="flex gap-2">
              {pokemon.types.map((type, i) => (
                <span
                  key={i}
                  className="bg-emerald-600 px-2 py-1 rounded text-xs font-semibold capitalize"
                >
                  {type.type.name}
                </span>
              ))}
            </div>

            <div className="text-base my-4">{descript}</div>

            <div className="grid grid-cols-2 gap-3 mt-2 mb-4 w-full max-w-[400px]">
              <div className="bg-lime-600/70 rounded-md px-3 py-2 flex justify-between items-center">
                <span className="text-sm font-bold text-white">
                  {selectedLang === "ja" ? `身長` : `Height`}
                </span>
                <span className="text-sm font-normal text-white">
                  {pokemon.height / 10} m
                </span>
              </div>

              <div className="bg-lime-600/70 rounded-md px-3 py-2 flex justify-between items-center">
                <span className="text-sm font-bold text-white">
                  {selectedLang === "ja" ? `体重` : `Weight`}
                </span>
                <span className="text-sm font-normal text-white">
                  {pokemon.weight / 10} kg
                </span>
              </div>
            </div>

            <h3 className="font-semibold text-white text-xl mb-1">
              {selectedLang === "ja" ? `ステータス` : `Stats`}
            </h3>
            <div className="grid grid-cols-2 gap-3 max-w-[400px]">
              {pokemon.stats.map((stat, index) => {
                const label = statLabels[stat.stat.name];
                let bgColor = null;

                if (label === "HP" || label === "体力") {
                  bgColor = "bg-red-600";
                } else if (label === "ATK") {
                  bgColor = "bg-orange-600";
                } else if (label === "DEF") {
                  bgColor = "bg-yellow-600";
                } else if (label === "SpA") {
                  bgColor = "bg-cyan-600";
                } else if (label === "SpD") {
                  bgColor = "bg-lime-600";
                } else if (label === "SPD") {
                  bgColor = "bg-pink-600";
                }

                const labelJA = {
                  HP: "体力",
                  ATK: "攻撃力",
                  DEF: "防御力",
                  SpA: "特攻",
                  SpD: "特防",
                  SPD: "素早さ",
                };

                return (
                  <div
                    key={index}
                    className={`flex justify-between items-center rounded px-3 py-2 font-bold text-white ${bgColor}`}
                  >
                    <span>
                      {selectedLang === "ja" ? labelJA[label] : label}
                    </span>
                    <span>{stat.base_stat}</span>
                  </div>
                );
              })}
            </div>

            <p className="font-semibold text-xl mt-4 mb-2">
              {selectedLang === "ja" ? `スキル ` : `Abilities`}
            </p>
            <div className="flex gap-4">
              {abilitiesLang.map((item, i) => (
                <button
                  key={i}
                  className="bg-emerald-600 rounded px-6 py-2 font-bold text-white capitalize"
                >
                  {selectedLang === "ja" ? japanLang[i].name : item.name}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleSaveToCollection(pokemon)}
              className="flex w-1/2 text-black transition-all duration-300 gap-2 justify-center py-2 rounded-lg cursor-pointer hover:bg-white/70 items-center mt-4 bg-white/50"
            >
              <MdOutlinePlaylistAdd size={24} />
              <p className="">
                {selectedLang === "ja" ? `保存` : `Save To Your Collection`}
              </p>
            </button>
          </div>
        </div>
      </div>
      {selectedData && (
        <PokemonCollectionModal
          dataCollectionList={selectedData}
          setDataCollectionList={setSelectedData}
        />
      )}
    </>
  );
}

export function EvolDetailCard({ evolNames }) {
  const [data, setData] = useState([]);

  const getData = async () => {
    let allData = [];

    await Promise.all(
      evolNames.map(async (item) => {
        try {
          const id = item.match(/(\d+)\/$/)[1];
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${id}/`
          );
          return response.data;
        } catch (error) {
          console.log(error);
        }
      })
    ).then((data) => {
      allData = data;
    });

    setData(allData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex items-center justify-around mt-4 p-2 lg:gap-40">
      {data.map((item, i) => (
        <div key={i} className="flex flex-col items-center gap-4">
          <img
            src={item.sprites.other["official-artwork"].front_default}
            alt={item.name}
            className={`w-24 lg:w-72 h-24 lg:h-72`}
          />
          <p className="capitalize">{item.name}</p>
        </div>
      ))}
    </div>
  );
}
