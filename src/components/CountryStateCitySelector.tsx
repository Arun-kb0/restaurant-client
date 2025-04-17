import { useEffect, useState } from "react";
import { Select } from "@material-tailwind/react";
import { State, City } from "country-state-city";

type Option = {
  value: string;
  label: string;
};

type Props = {
  getStateAndCountry: (state: string, city: string) => void
}

const CountryStateCitySelector = ({ getStateAndCountry }: Props) => {
  const [selectedState, setSelectedState] = useState<Option | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const statesInIndia: Option[] = State.getStatesOfCountry("IN").map((state) => ({
    value: state.isoCode,
    label: state.name,
  }));

  const citiesInSelectedState: Option[] = selectedState?.value
    ? City.getCitiesOfState("IN", selectedState.value)?.map((city) => ({
      value: city.name,
      label: city.name,
    })) || []
    : [];

  const handleState = (optionValue: string) => {
    const opt = statesInIndia.find((s) => s.value === optionValue) || null;
    setSelectedState(opt);
    setSelectedCity(null);
  };

  const handleCity = (optionValue: string) => {
    setSelectedCity(optionValue);
  };

  useEffect(() => {
    if (!selectedCity || !selectedState) return
    getStateAndCountry(selectedState.label, selectedCity)
  }, [selectedCity, selectedState])

  return (
    <div className="flex space-y-2 my-4 w-full" >

      <div className="space-y-3 w-full">
        <Select
          value={selectedState?.value || ""}
          onValueChange={handleState}
          className="w-full"
        >
          <Select.Trigger className="w-72" placeholder="Select State" />
          <Select.List className="max-h-72 overflow-y-auto">
            {statesInIndia.map((item) => (
              <Select.Option key={item.value} value={item.value} >
                {item.label}
              </Select.Option>
            ))}
          </Select.List>
        </Select>

        <Select
          value={selectedCity || ""}          // ← bind your state here
          onValueChange={handleCity}   // ← make sure this prop is on the Select
          className="w-full"
          disabled={!selectedState}
        >
          <Select.Trigger className="w-72" placeholder="Select City" />
          <Select.List className="max-h-72 overflow-y-auto">
            {citiesInSelectedState.map((item) => (
              <Select.Option key={item.value} value={item.value} >
                {item.label}
              </Select.Option>
            ))}
          </Select.List>
        </Select>
      </div>

    </div>

  );
};

export default CountryStateCitySelector;
