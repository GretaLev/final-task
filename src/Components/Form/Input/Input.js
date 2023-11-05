import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input as ChakraInput,
} from "@chakra-ui/react";

const Input = ({ label, error, register, ...props }) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <ChakraInput {...register} {...props} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default Input;
