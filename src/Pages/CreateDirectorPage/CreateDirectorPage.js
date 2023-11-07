import { API_URL } from "../../config";
import Container from "../../Components/Container/Container";
import { useForm } from "react-hook-form";
import { Button, VStack, useToast } from "@chakra-ui/react";
import Input from "../../Components/Form/Input/Input";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Select from "../../Components/Form/Select/Select";

const CreateDirectorPage = () => {
  const { id } = useParams();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      born: "",
      country: "",
      about: "",
      imageUrl: "",
    },
  });

  useEffect(() => {
    const getDirector = async () => {
      const response = await axios(API_URL + `/directors/${id}`);

      reset(response.data);
    };

    if (id) {
      getDirector();
    }
  }, []);

  const newDirectorHandler = async (values) => {
    const response = await axios(
      API_URL + (id ? `/directors/${id}` : "/directors"),
      {
        method: id ? "PUT" : "POST",
        data: values,
      }
    );

    if (response.statusText === "OK") {
      toast({
        title: "Director updated",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else if (response.statusText === "Created") {
      toast({
        title: "New Director created",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Container>
      <h1 className="create-page-title">
        {" "}
        {id ? "Edit Director" : "Create New Director"}
      </h1>

      <form onSubmit={handleSubmit(newDirectorHandler)}>
        <VStack gap={3} alignItems="flex-start">
          <Input
            label="Name:"
            register={register("name", { required: "Name is required" })}
            error={errors?.name?.message}
          />
          <Input
            label="Born:"
            type="date"
            register={register("born", {
              required: "Date is required",
            })}
            error={errors?.born?.message}
          />

          <Input
            label="Country:"
            register={register("country", {
              required: "Country is required",
            })}
            error={errors?.country?.message}
          />
          <Input
            label="About:"
            type="textarea"
            register={register("about", {
              required: "Description is required",
            })}
            error={errors?.about?.message}
          />
          <Input
            label="Director picture link:"
            type="url"
            register={register("imageUrl", { required: "Link is required" })}
            error={errors?.about?.message}
          />

          <Button type="submit" colorScheme="green" isLoading={isSubmitting}>
            {id ? "Edit" : "Create"}
          </Button>
        </VStack>
      </form>
    </Container>
  );
};
export default CreateDirectorPage;
