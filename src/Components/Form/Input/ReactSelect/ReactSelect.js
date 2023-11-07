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
  isMulti = false,
}) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        rules={{ ...rules }}
        render={({ field }) => (
          <Select {...field} options={options} isMulti={isMulti} />
        )}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default ReactSelect;
