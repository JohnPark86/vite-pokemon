import {useState} from "react";
import Select, {SingleValue} from "react-select";

type ListOption = {
  value: string;
  label: string;
};

type MainInputProps = {
  options: ListOption[];
  handleChange: (value: SingleValue<ListOption>) => void;
};

export const MainInput: React.FC<MainInputProps> = ({
  options,
  handleChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<ListOption>();

  const handleSelect = (value: SingleValue<ListOption>) => {
    setSelectedOption(value as ListOption);
    if (handleChange) {
      handleChange(value);
    }
  };

  return (
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
  );
};
