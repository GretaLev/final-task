import { Controller } from "react-hook-form";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import Select from "react-select";

const ReactSelect = ({
  error,
  label,
  name,
  control,
  options,
  rules,
  isDisabled,
  isMulti = false,
}) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        rules={{ ...rules }}
        render={({ field }) => {
          const { value, onChange } = field;

          return (
            <Select
              {...field}
              isDisabled={isDisabled}
              options={options}
              isMulti={isMulti}
              value={
                isMulti
                  ? options.filter((option) => value.includes(option.value))
                  : options.find((option) => option.value === value)
              }
              onChange={(selectedValue) => {
                if (
                  isMulti &&
                  Array.isArray(selectedValue) &&
                  selectedValue.length
                ) {
                  onChange(selectedValue.map((v) => v.value));
                  return;
                }

                onChange(selectedValue?.value);
              }}
            />
          );
        }}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default ReactSelect;
