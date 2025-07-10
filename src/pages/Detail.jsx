import { useEffect, useState } from "react";
import CardDetail from "../components/CardDetail";
import { EvolDetailCard } from "../components/CardDetail";
import { data, useParams } from "react-router";
import axios from "axios";
import NavbarSec from "../components/navbar";
import LanguageSelector from "../components/LanguageSelector";

export default function DetailsPages() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [descript, setDescript] = useState("");
  const [evolNames, setEvolNames] = useState([]);
  const selectedLang = localStorage.getItem("lang") || "en";

  useEffect(() => {
    async function getData() {
      const resPokemon = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${id}/`
      );
      const dataPokemon = await resPokemon.json();

      const resSpecies = await fetch(dataPokemon.species.url);
      const dataSpecies = await resSpecies.json();
      // localstorage
      const lang = localStorage.getItem("lang") || "en";

      const flavor = dataSpecies.flavor_text_entries;
      const foundFlavor = flavor.find((item) => item.language.name === lang);
      const descriptLang = foundFlavor
        ? foundFlavor.flavor_text
        : "No description found";

      const nameLang = lang === "ja" ? "ja-Hrkt" : lang;
      const foundName = dataSpecies.names.find(
        (item) => item.language.name === nameLang
      );
      const nameLangVer = foundName ? foundName.name : dataSpecies.name;

      const evoUrl = dataSpecies.evolution_chain.url;
      const resEvo = await fetch(evoUrl);
      const dataEvo = await resEvo.json();

      const evo1 = dataEvo.chain?.species?.url;
      const evo2 = dataEvo.chain?.evolves_to?.[0]?.species?.url;
      const evo3 =
        dataEvo.chain?.evolves_to?.[0]?.evolves_to?.[0]?.species?.url;

      const evol = [evo1, evo2, evo3].filter(Boolean);

      setPokemon({ ...dataPokemon, name: nameLangVer });
      setDescript(descriptLang);
      setEvolNames(evol);
    }
    getData();
  }, []);

  if (!pokemon)
    return (
      <div className="col-span-full text-center">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  return (
    <main className="bg-[url(./assets/bg-detail.png)] bg-cover h-full ">
      <NavbarSec />
      <div className="flex flex-col items-center">
        <div className="flex w-full justify-end px-4 lg:px-74">
          <LanguageSelector />
        </div>
        <CardDetail
          pokemon={pokemon}
          descript={descript}
          selectedLang={selectedLang}
        />
      </div>
      <div className="w-full px-2 lg:px-70 py-10">
        <h3 className="text-white text-2xl font-bold mb-4 ml-2">Evolution</h3>
        <EvolDetailCard evolNames={evolNames} />
      </div>
    </main>
  );
}
