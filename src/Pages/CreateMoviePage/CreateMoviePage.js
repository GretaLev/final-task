import Container from "../../Components/Container/Container";
import { API_URL } from "../../config";
import { useForm } from "react-hook-form";
import { Button, VStack, useToast } from "@chakra-ui/react";
import Input from "../../Components/Form/Input/Input";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactSelect from "../../Components/Form/ReactSelect/ReactSelect";

const CreateMoviePage = () => {
  const [genresData, setGenresData] = useState([]);
  const [actors, setActors] = useState([]);
  const [directors, setDirectors] = useState([]);

  const { id } = useParams();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      rate: "",
      releaseDate: "",
      imageUrl: "",
      genresId: "",
      actorsId: "",
      directorId: "",
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

    axios(API_URL + "/genres").then((res) => {
      setGenresData(res.data);
    });

    axios(API_URL + "/actors").then((res) => {
      setActors(res.data);
    });

    axios(API_URL + "/directors").then((res) => {
      setDirectors(res.data);
    });
  }, []);

  const genresOptions = genresData.map((genre) => ({
    value: genre.id,
    label: genre.title,
  }));

  const actorsOptions = actors.map((actor) => ({
    value: actor.id,
    label: actor.name,
  }));

  const directorsOptions = directors.map((director) => ({
    value: director.id,
    label: director.name,
  }));

  const newMovieHandler = async (values) => {
    const response = await axios(API_URL + (id ? `/movies/${id}` : "/movies"), {
      method: id ? "PUT" : "POST",
      data: values,
    });

    const { id: movieId, directorId, actorsId, genresId } = response.data;

    if (response.statusText === "OK") {
      toast({
        title: "Movie updated",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else if (response.statusText === "Created") {
      // Create new actors, genres and director relationships
      await Promise.all([
        await axios(API_URL + "/directorRelationships", {
          method: "POST",
          data: {
            movieId,
            directorId,
          },
        }),
        actorsId.map(async (actorId) => {
          await axios(API_URL + "/actorRelationships", {
            method: "POST",
            data: {
              movieId,
              actorId,
            },
          });
        }),
        genresId.map(async (genreId) => {
          await axios(API_URL + "/movieRelationships", {
            method: "POST",
            data: {
              movieId,
              genreId,
            },
          });
        }),
      ]);

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
      <h1 className="create-page-title">
        {id ? "Edit Movie" : "Create New Movie"}
      </h1>

      <form onSubmit={handleSubmit(newMovieHandler)}>
        <VStack gap={3} alignItems="flex-start">
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

          <ReactSelect
            options={genresOptions}
            label="Genres:"
            name="genresId"
            control={control}
            error={errors?.genresId?.message}
            rules={{ required: "Genre is required" }}
            isMulti
            isDisabled={!!id}
          />

          <ReactSelect
            options={actorsOptions}
            label="Actors:"
            name="actorsId"
            rules={{ required: "Actor is required" }}
            control={control}
            error={errors?.actorsId?.message}
            isMulti
            isDisabled={!!id}
          />

          <ReactSelect
            options={directorsOptions}
            label="Director:"
            name="directorId"
            control={control}
            rules={{ required: "Director is required" }}
            error={errors?.directorId?.message}
            isDisabled={!!id}
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
        </VStack>
      </form>
    </Container>
  );
};

export default CreateMoviePage;
