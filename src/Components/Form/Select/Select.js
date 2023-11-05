import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select as ChakraSelect,
} from "@chakra-ui/react";

const Select = ({ label, options, error, register }) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <ChakraSelect {...register}>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </ChakraSelect>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default Select;
