import {useState, useEffect, useMemo} from "react";
import {NamedAPIResourceList, PokemonClient} from "pokenode-ts";
import {Pokemon} from "./types/pokemon";
import {ImageComponent} from "./components/ImageComponent";
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
        console.log("🚀 ~ pokeApi.getPokemonByName ~ foo:", foo);

        setSelectedPkmn(foo);
      });
    }
  };

  return (
    <>
      <ImageComponent
        src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
        styleClass="logo"
        altText="Classic Pokemon logo in blue and yellow"
      />
      <MainInput options={options} handleChange={handleChange} />
      {selectedPkmn && (
        <div style={{border: "2px solid white"}}>
          <ImageComponent
            src={selectedPkmn?.sprites?.other["official-artwork"].front_default}
            altText={`Official artwork for ${selectedPkmn.name}`}
            styleClass="mainImage"
          />
          {<h1>{selectedPkmn.name}</h1>}
        </div>
      )}
    </>
  );
}

export default App;
