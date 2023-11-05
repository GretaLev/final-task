import Container from "../../Components/Container/Container";
import { API_URL } from "../../config";
import { useForm } from "react-hook-form";
import { Button, useToast } from "@chakra-ui/react";
import Input from "../../Components/Form/Input/Input";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const CreateMoviePage = () => {
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
      description: "",
      rate: "",
      releaseDate: "",
      imageUrl: "",
    },
  });

  useEffect(() => {
    const getMovie = async () => {
      const response = await axios(API_URL + `/movies/${id}`);

      reset(response.data);
    };

    if (id) {
      getMovie();
    }
  }, []);

  const newMovieHandler = async (values) => {
    const response = await axios(API_URL + (id ? `/movies/${id}` : "/movies"), {
      method: id ? "PUT" : "POST",
      data: values,
    });

    if (response.statusText === "OK") {
      toast({
        title: "Movie updated",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else if (response.statusText === "Created") {
      toast({
        title: "New Movie created",
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
      <h1> {id ? "Edit Movie" : "Create New Movie"}</h1>

      <form onSubmit={handleSubmit(newMovieHandler)}>
        <Input
          label="Title:"
          register={register("title", { required: "Title is required" })}
          error={errors?.title?.message}
        />
        <Input
          label="Description:"
          type="textarea"
          register={register("description", {
            required: "Description is required",
          })}
          error={errors?.description?.message}
        />
        <Input
          label="Rating:"
          type="number"
          register={register("rate", {
            required: "Rating is required",
          })}
          error={errors?.rate?.message}
        />
        <Input
          label="Released in:"
          type="number"
          register={register("releaseDate", {
            required: "Release date is required",
          })}
          error={errors?.releaseDate?.message}
        />
        <Input
          label="Movie picture link:"
          type="url"
          register={register("imageUrl", {
            required: "Link is required",
          })}
          error={errors?.imageUrl?.message}
        />

        <Button type="submit" colorScheme="green" isLoading={isSubmitting}>
          {id ? "Edit" : "Create"}
        </Button>
      </form>
    </Container>
  );
};

export default CreateMoviePage;
