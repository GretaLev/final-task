import Container from "../../Components/Container/Container";
import { API_URL } from "../../config";
import { useForm } from "react-hook-form";
import Input from "../../Components/Form/Input/Input";
import { Button, VStack, useToast } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const CreateGenrePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
    },
  });

  useEffect(() => {
    const getGenre = async () => {
      const response = await axios(API_URL + `/genres/${id}`);

      reset(response.data);
    };

    if (id) {
      getGenre();
    }
  }, []);

  const newGenreHandler = async (values) => {
    const response = await axios(API_URL + (id ? `/genres/${id}` : "/genres"), {
      method: id ? "PUT" : "POST",
      data: values,
    });

    if (response.statusText === "OK") {
      toast({
        title: "Genre updated",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else if (response.statusText === "Created") {
      toast({
        title: "New Genre created",
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
    if (response.statusText === "OK" || response.statusText === "Created") {
      navigate("/genres");
    }
  };

  return (
    <Container>
      <h1 className="create-page-title">
        {" "}
        {id ? "Edit Genre" : "Create New genre"}
      </h1>

      <form onSubmit={handleSubmit(newGenreHandler)}>
        <VStack gap={3} alignItems="flex-start">
          <Input
            label="Title:"
            register={register("title", { required: "Title is required" })}
            error={errors?.title?.message}
          />
          <Button type="submit" colorScheme="green" isLoading={isSubmitting}>
            {id ? "Edit" : "Create"}
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default CreateGenrePage;
