import {useState, useEffect} from "react";
import "./App.css";
import {Pokemon} from "./types/pokemon";
import {NamedAPIResourceList, PokemonClient} from "pokenode-ts";
import Select from "react-select";

type ListOption = {
  value: string;
  label: string;
};

function App() {
  const pokeApi = new PokemonClient();
  const [selectedPkmn, setSelectedPkmn] = useState<Pokemon>();
  const [options, setOptions] = useState<ListOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<ListOption>();

  const handleSelect = (value: ListOption) => {
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

      console.log(foo.sprites);
      setSelectedPkmn(foo);
      setSelectedOption(value);
    });

    // if (handleChange) {
    //   handleChange(value.fullName);
    // }
  };

  useEffect(() => {
    pokeApi
      .listPokemons(undefined, 1050)
      .then((value: NamedAPIResourceList) => {
        console.log(value);
        const pkmn = value.results.map((result) => {
          return {value: result.name, label: result.name};
        });
        setOptions(pkmn);
      })
      .catch((error: string) => console.error(error));
  }, []);

  return (
    <>
      <img
        className="logo"
        src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
      />
      <div className="input-area">
        <Select
          id="input_select"
          options={options}
          value={selectedOption}
          onChange={handleSelect}
          placeholder="Select a Pokemon"
          styles={{
            control: (styles) => ({
              ...styles,
              borderRadius: "20px",
              width: "100%",
              height: "40px",
            }),
            option: (styles) => ({
              ...styles,
              color: "black",
            }),
          }}
        />
      </div>
      <div>
        {selectedPkmn && (
          <img
            src={selectedPkmn?.sprites?.other["official-artwork"].front_default}
          />
        )}
      </div>
    </>
  );
}

export default App;
