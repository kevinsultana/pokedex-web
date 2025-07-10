import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaCaretDown } from "react-icons/fa";
import NavbarSec from "../components/navbar";
import { useNavigate } from "react-router";

function EvolutionPage() {
  const [generations, setGenerations] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedGen, setSelectedGen] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemonList, setPokemonList] = useState([]);
  const [detailedList, setDetailedList] = useState([]);
  const [loading, setLoading] = useState(false);

  const romanNumerals = [
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
  ];

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

  console.log(selectedGen);
  const favoritePokemon = [
    { name: "pikachu", id: "25" },
    { name: "charizard", id: "6" },
  ];

  useEffect(() => {
    fetchGenerations();
    fetchTypes();
    setSelectedGen("generation-i");
  }, []);

  useEffect(() => {
    if (selectedGen) {
      fetchPokemonByGeneration(selectedGen);
    } else {
      setPokemonList([]);
    }
  }, [selectedGen]);

  useEffect(() => {
    fetchDetailedList();
  }, [pokemonList]);

  const fetchGenerations = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://pokeapi.co/api/v2/generation/");
      setGenerations(res.data.results);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Failed to fetch generations", err);
    }
  };

  const fetchTypes = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://pokeapi.co/api/v2/type/");
      const filteredTypes = res.data.results.filter(
        (type) => !["shadow", "unknown"].includes(type.name)
      );
      setTypes(filteredTypes);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Failed to fetch types", err);
    }
  };

  const fetchPokemonByGeneration = async (genName) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/generation/${genName}`
      );
      const species = res.data.pokemon_species;
      const sortedSpecies = species.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      const mapped = sortedSpecies.map((p) => {
        const id = p.url.split("/").filter(Boolean).pop();
        return { name: p.name, id };
      });
      setPokemonList(mapped);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Failed to fetch Pokémon by generation", err);
    }
  };

  const fetchDetailedList = async () => {
    setLoading(true);
    try {
      const detailed = await Promise.all(
        pokemonList.map(async (p) => {
          try {
            const res = await axios.get(
              `https://pokeapi.co/api/v2/pokemon/${p.id}`
            );
            return {
              ...p,
              types: res.data.types.map((t) => t.type.name),
              forms: res.data.forms.map((f) => f.name),
            };
          } catch {
            return { ...p, types: [], forms: [] };
          }
        })
      );
      setDetailedList(detailed);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Failed to fetch Pokémon details", err);
    }
  };

  const filteredList = detailedList.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || p.types.includes(selectedType);
    return matchesSearch && matchesType;
  });

  const formatKebabCase = (text) => {
    return text
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  };

  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="bg-[url(./assets/bg-detail.png)] bg-repeat min-h-screen">
      <NavbarSec />
      <div className=" text-white p-8">
        <h1 className="text-3xl font-medium mb-6">Generation Pokémon</h1>

        {/* Filter Section */}
        <div className="flex flex-wrap gap-4 mb-6">
          {/* Search Input with icon */}
          <div className="flex items-center w-64 h-12 px-4 gap-2 bg-white rounded-lg text-black ">
            <FaSearch className=" text-gray-500" />
            <input
              type="text"
              placeholder="Search Pokémon"
              className="plcaeholder:text-gray-600 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Generation Dropdown with icon */}
          <div className="relative">
            <select
              onChange={(e) => setSelectedGen(e.target.value)}
              className="appearance-none w-64 h-12 px-4 py-3 bg-white text-black rounded-lg"
            >
              {/* <option value="">Any Generation</option> */}
              {generations.map((gen, index) => (
                <option key={gen.name} value={gen.name}>
                  Gen {romanNumerals[index] || index + 1}
                </option>
              ))}
            </select>
            <FaCaretDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Type Dropdown with icon */}
          <div className="relative">
            <select
              onChange={(e) => setSelectedType(e.target.value)}
              className="appearance-none w-64 h-12 px-4 py-2.5 bg-white text-black rounded-lg pr-10"
            >
              <option value="">Any Types</option>
              {types.map((type) => (
                <option key={type.name} value={type.name}>
                  {type.name.toUpperCase()}
                </option>
              ))}
            </select>
            <FaCaretDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Card List */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading ? (
            <div className="col-span-full text-center mt-14">
              <span className="loading loading-bars loading-xl"></span>
            </div>
          ) : filteredList.length === 0 ? (
            <div className="col-span-full text-center text-white text-lg">
              No Pokémon found for selected filter.
            </div>
          ) : (
            filteredList.map((pokemon) => {
              const type1 = pokemon.types?.[0];
              const type2 = pokemon.types?.[1];

              const color1 =
                typeColors[type1]?.split(" ")[0] || "from-slate-500";
              const color2 = typeColors[type2]?.split(" ")[1] || "to-slate-400";
              const bgClass = `bg-gradient-to-br ${color1} ${color2}`;

              return (
                <div
                  key={`${pokemon.id}-${pokemon.name}`}
                  onClick={() => handleNavigate(pokemon.id)}
                  className={`p-3 ${bgClass} rounded-[10px] cursor-pointer trasnsition-all duration-300 hover:scale-102 hover:outline-white  outline-slate-400 flex justify-between items-center`}
                >
                  <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold">
                      {formatKebabCase(pokemon.name)}
                    </h2>
                    <p className="text-slate-200">
                      #{pokemon.id.padStart?.(3, "0") ?? pokemon.id}
                    </p>
                    <p className="text-white text-sm">
                      {pokemon.types?.map(formatKebabCase).join(", ") || "-"}
                    </p>
                    <p className="text-white text-sm">
                      {pokemon.forms
                        ?.slice(0, 3)
                        ?.map(formatKebabCase)
                        .join(", ") || "-"}
                    </p>
                  </div>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                    alt={pokemon.name}
                    className="w-24 h-24 object-contain"
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default EvolutionPage;
