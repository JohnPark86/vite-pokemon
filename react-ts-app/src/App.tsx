import {useState, useEffect, useMemo} from "react";
import {NamedAPIResourceList, PokemonClient} from "pokenode-ts";
import {Pokemon} from "./types/pokemon";
import {Logo} from "./components/Logo";
import {MainInput} from "./components/MainInput";
import "./App.css";
import {SingleValue} from "react-select";

type ListOption = {
  value: string;
  label: string;
};

function App() {
  const pokeApi = useMemo(() => {
    return new PokemonClient();
  }, []);
  const [selectedPkmn, setSelectedPkmn] = useState<Pokemon>();
  const [options, setOptions] = useState<ListOption[]>([]);

  useEffect(() => {
    pokeApi
      .listPokemons(undefined, 1050)
      .then((value: NamedAPIResourceList) => {
        const pkmn = value.results.map((result) => {
          return {value: result.name, label: result.name};
        });
        setOptions(pkmn);
      })
      .catch((error: string) => console.error("errsssror : ", error));
  }, [pokeApi]);

  const handleChange = (value: SingleValue<ListOption>) => {
    if (value) {
      pokeApi.getPokemonByName(value.value).then((val) => {
        const foo: Pokemon = {
          id: val.id,
          name: val.name,
          base_experience: val.base_experience,
          height: val.height,
          weight: val.weight,
          is_default: val.is_default,
          sprites: val.sprites,
          stats: val.stats,
          types: val.types,
        };

        setSelectedPkmn(foo);
      });
    }
  };

  return (
    <>
      <Logo />
      <MainInput options={options} handleChange={handleChange} />
      {selectedPkmn && (
        <img
          src={selectedPkmn?.sprites?.other["official-artwork"].front_default}
        />
      )}
    </>
  );
}

export default App;
