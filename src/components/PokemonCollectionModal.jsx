import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

function PokemonCollectionModal({ dataCollectionList, setDataCollectionList }) {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [showInputCollection, setShowInputCollection] = useState(false);
  const [titleNewCollection, setTitleNewCollection] = useState("");

  useEffect(() => {
    loadCollectionsFromLocalStorage();
  }, []);

  const loadCollectionsFromLocalStorage = () => {
    try {
      const storedCollections = localStorage.getItem("pokemonCollections");
      if (storedCollections) {
        setCollections(JSON.parse(storedCollections));
      }
    } catch (error) {
      console.error("Gagal memuat koleksi dari localStorage:", error);
      setCollections([]);
    }
  };

  const saveCollectionsToLocalStorage = (currentCollections) => {
    try {
      localStorage.setItem(
        "pokemonCollections",
        JSON.stringify(currentCollections)
      );
    } catch (error) {
      console.error("Gagal menyimpan koleksi ke localStorage:", error);
    }
  };

  const handleCheckboxChange = (collectionName) => {
    setSelectedCollection(collectionName);
  };

  const savePokemonToCollection = () => {
    if (!dataCollectionList || !dataCollectionList.name) {
      alert("Tidak ada Pokémon yang dipilih untuk ditambahkan!");
      return;
    }

    if (!selectedCollection) {
      toast.error("Pilih salah satu koleksi terlebih dahulu!");
      return;
    }

    let collectionToUpdate = collections.find(
      (col) => col.name === selectedCollection
    );

    if (!collectionToUpdate) {
      toast.error("Koleksi tidak ditemukan!");
      return;
    }

    const isPokemonAlreadyInCollection = collectionToUpdate.pokemons.some(
      (pokemon) => pokemon.name === dataCollectionList.name
    );

    if (isPokemonAlreadyInCollection) {
      toast.error(
        `Pokémon ${dataCollectionList.name} sudah ada di koleksi ${collectionToUpdate.name}!`
      );
      return;
    }

    if (collectionToUpdate.pokemons.length >= 6) {
      toast.error(
        `Koleksi ${collectionToUpdate.name} sudah penuh (maksimal 6 Pokémon)!`
      );
      return;
    }

    const updatedCollections = collections.map((col) => {
      if (col.name === selectedCollection) {
        return {
          ...col,
          pokemons: [...col.pokemons, dataCollectionList],
        };
      }
      return col;
    });

    setCollections(updatedCollections);
    saveCollectionsToLocalStorage(updatedCollections);
    toast.success(
      `Pokémon ${dataCollectionList.name} berhasil ditambahkan ke ${selectedCollection}!`
    );
    setDataCollectionList(null);
  };

  const createNewCollection = () => {
    const newCollectionName = titleNewCollection;
    if (newCollectionName && newCollectionName.trim() !== "") {
      const isNameTaken = collections.some(
        (col) =>
          col.name.toLowerCase() === newCollectionName.trim().toLowerCase()
      );
      if (isNameTaken) {
        toast.error("Nama koleksi ini sudah ada! Mohon gunakan nama lain.");
        return;
      }

      const newCollections = [
        ...collections,
        { name: newCollectionName.trim(), pokemons: [] },
      ];
      setCollections(newCollections);
      saveCollectionsToLocalStorage(newCollections);
      setSelectedCollection(newCollectionName.trim());
      toast.success(`Koleksi "${newCollectionName.trim()}" berhasil dibuat!`);
    } else {
      toast.error("Nama koleksi tidak boleh kosong.");
    }
  };

  return (
    dataCollectionList && (
      <div
        onClick={() => setDataCollectionList(null)}
        className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm md:max-w-md lg:max-w-lg max-h-[90vh] overflow-y-auto"
        >
          <h2 className="text-xl font-bold mb-4 text-gray-800 capitalize">
            Nama Hero: {dataCollectionList?.name}
          </h2>

          {collections.length > 0 ? (
            <ul className="mb-4">
              {collections.map((col) => (
                <li key={col.name} className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="pokemonCollection"
                    checked={selectedCollection === col.name}
                    onChange={() => handleCheckboxChange(col.name)}
                    className="mr-2"
                  />
                  <span className="text-black capitalize">
                    {col.name} ({col.pokemons.length}/6)
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 mb-4">Create new collection here</p>
          )}

          {showInputCollection && (
            <div className="flex gap-4 justify-between">
              <input
                type="text"
                placeholder="New Collection title"
                className="text-black placeholder:text-black/50 border rounded-2xl px-2 w-full"
                value={titleNewCollection}
                onChange={(e) => setTitleNewCollection(e.target.value)}
              />
              <button
                onClick={createNewCollection}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Save
              </button>
            </div>
          )}

          <div className="flex justify-between flex-wrap gap-2">
            <button
              onClick={() => setDataCollectionList(null)}
              className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex-grow"
            >
              Close
            </button>
            <button
              onClick={() => setShowInputCollection(!showInputCollection)}
              className="mt-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex-grow"
            >
              Create New Collection
            </button>
            <button
              onClick={savePokemonToCollection}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex-grow"
              disabled={!selectedCollection}
            >
              Save to Collection
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default PokemonCollectionModal;
