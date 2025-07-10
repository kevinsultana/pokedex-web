import React, { useState, useEffect } from "react";
import NavbarSec from "../components/navbar";
import ItemCard from "../components/ItemCard";
import toast from "react-hot-toast";
import ModalConfirm from "../components/ModalConfirm";

function CollectionPage() {
  const [dataCollectionPokemon, setDataCollectionPokemon] = useState([]);
  const [activeCollection, setActiveCollection] = useState(null);
  const [currentCollectionPokemons, setCurrentCollectionPokemons] = useState(
    []
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [SelectedDataToDelete, setSelectedDataToDelete] = useState(null);

  useEffect(() => {
    loadAllCollections();
  }, []);

  useEffect(() => {
    if (dataCollectionPokemon.length > 0 && !activeCollection) {
      setActiveCollection(dataCollectionPokemon[0].name);
    }
  }, [dataCollectionPokemon, activeCollection]);

  useEffect(() => {
    if (activeCollection) {
      const foundCollection = dataCollectionPokemon.find(
        (col) => col.name === activeCollection
      );
      if (foundCollection) {
        setCurrentCollectionPokemons(foundCollection.pokemons || []);
      } else {
        setCurrentCollectionPokemons([]);
      }
    }
  }, [activeCollection, dataCollectionPokemon]);

  const loadAllCollections = () => {
    try {
      const storedCollections = localStorage.getItem("pokemonCollections");
      if (storedCollections) {
        const parsedCollections = JSON.parse(storedCollections);
        setDataCollectionPokemon(parsedCollections);
        if (parsedCollections.length > 0) {
          if (
            !activeCollection ||
            !parsedCollections.some((col) => col.name === activeCollection)
          ) {
            setActiveCollection(parsedCollections[0].name);
          }
        } else {
          setActiveCollection(null);
        }
      } else {
        setDataCollectionPokemon([]);
        setActiveCollection(null);
      }
    } catch (error) {
      console.error("Gagal memuat koleksi dari localStorage:", error);
      setDataCollectionPokemon([]);
      setActiveCollection(null);
    }
  };

  const saveCollectionsToLocalStorage = (collectionsToSave) => {
    try {
      localStorage.setItem(
        "pokemonCollections",
        JSON.stringify(collectionsToSave)
      );
    } catch (error) {
      console.error("Gagal menyimpan koleksi ke localStorage:", error);
      toast.error("Gagal menyimpan perubahan koleksi!");
    }
  };

  const removePokemonFromCollection = (pokemonNameToRemove) => {
    if (!activeCollection) {
      toast.error("Tidak ada koleksi yang aktif.");
      return;
    }

    const updatedCollections = dataCollectionPokemon.map((col) => {
      if (col.name === activeCollection) {
        const filteredPokemons = col.pokemons.filter(
          (p) => p.name !== pokemonNameToRemove
        );

        if (filteredPokemons.length === col.pokemons.length) {
          toast.error(
            `Pokémon ${pokemonNameToRemove} tidak ditemukan di koleksi ${col.name}.`
          );
          return col;
        }

        toast.success(
          `Pokémon ${pokemonNameToRemove} berhasil dihapus dari ${col.name}.`
        );
        return {
          ...col,
          pokemons: filteredPokemons,
        };
      }
      return col;
    });

    setDataCollectionPokemon(updatedCollections);
    saveCollectionsToLocalStorage(updatedCollections);
    setSelectedDataToDelete(null);

    setCurrentCollectionPokemons((prev) =>
      prev.filter((p) => p.name !== pokemonNameToRemove)
    );
  };

  const handleCollectionClick = (collectionName) => {
    setActiveCollection(collectionName);
    setIsSidebarOpen(false);
  };

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

  return (
    <div className="bg-[url(./assets/bg-detail.png)] bg-repeat min-h-screen">
      <NavbarSec />
      <div className="h-12" /> {/* Spacer untuk navbar */}
      <div className="container mx-auto p-4 bg-gray-500/50 rounded-3xl">
        <div className="w-full h-full flex flex-col lg:flex-row justify-center items-center lg:items-start mt-4 ">
          {/* Tombol untuk membuka sidebar di mobile */}
          <button
            className="lg:hidden fixed top-20 left-4 z-40 p-2 bg-red-600 text-white rounded-md"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? "Tutup Koleksi" : "Koleksi Saya"}
          </button>

          {/* Sidebar */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}
          <div
            className={`
              fixed lg:static top-0 left-0 h-full bg-gray-800 lg:bg-transparent z-40
              w-60 lg:w-48 flex flex-col items-center gap-4 py-8 lg:py-0
              transform transition-transform duration-300 ease-in-out
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
              lg:translate-x-0 lg:flex
              border-r border-gray-700 lg:border-r-0
            `}
          >
            <h3 className="text-white text-lg font-bold mb-4 lg:hidden">
              Koleksi Saya
            </h3>
            {/* Playlist Items */}
            <div className="w-full px-4 lg:w-40 lg:h-44 flex flex-col lg:flex-row gap-2.5">
              <div className="flex flex-col items-start lg:items-end gap-2 w-full">
                {dataCollectionPokemon.length > 0 ? (
                  dataCollectionPokemon.map((item, i) => (
                    <div
                      key={i}
                      className={`
                        w-full px-3 py-2 rounded-lg cursor-pointer
                        ${
                          activeCollection === item.name
                            ? "bg-red-700"
                            : "hover:bg-red-700"
                        }
                      `}
                      onClick={() => handleCollectionClick(item.name)}
                    >
                      <div className="text-slate-200 text-sm font-semibold">
                        {item.name}
                      </div>
                      <div className="text-slate-200 text-xs">
                        ({item.pokemons.length}/6)
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-slate-400 text-sm p-3 text-center">
                    Belum ada koleksi.
                  </div>
                )}
              </div>

              <div className="hidden lg:block w-1 h-44 bg-zinc-300 rounded-lg" />
            </div>
          </div>

          {/* Konten Koleksi */}
          <div className="w-full lg:w-[1112px] flex flex-col gap-12 px-4 lg:px-0 mt-20 lg:mt-0">
            <div className="flex flex-col gap-5">
              {/* Header Koleksi */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-0.5">
                    <div className="text-white text-xl lg:text-2xl font-bold">
                      {activeCollection || "Pilih Koleksi Anda"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Row */}
              <div className="w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2  gap-4">
                  {currentCollectionPokemons.length > 0 ? (
                    currentCollectionPokemons.map((pokemon, idx) => {
                      const type1 = pokemon?.types[0]?.type?.name;
                      const type2 = pokemon?.types[1]?.type?.name;

                      const color1 =
                        typeColors[type1]?.split(" ")[0] || "from-slate-500";
                      const color2 =
                        typeColors[type2]?.split(" ")[1] || "to-slate-400";
                      const bgClass = `bg-gradient-to-br ${color1} ${color2}`;

                      return (
                        <ItemCard
                          key={pokemon?.id || idx}
                          data={pokemon}
                          bgClass={bgClass}
                          isFavorite={true}
                          onClickSave={() =>
                            setSelectedDataToDelete(pokemon?.name)
                          }
                        />
                      );
                    })
                  ) : (
                    <div className="col-span-full text-white text-center py-10">
                      This is an empty Collection, please add pokemon
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-12" />
      {SelectedDataToDelete && (
        <ModalConfirm
          onClickConfirm={() =>
            removePokemonFromCollection(SelectedDataToDelete)
          }
          onClickCancel={() => setSelectedDataToDelete(null)}
        />
      )}
    </div>
  );
}

export default CollectionPage;
