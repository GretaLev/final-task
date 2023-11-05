import { API_URL } from "../../config";
import Container from "../../Components/Container/Container";
import { Button, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import Input from "../../Components/Form/Input/Input";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Select from "../../Components/Form/Select/Select";
import { monthArray } from "../../constants";

const CreateActorPage = () => {
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
      born: {
        year: "",
        month: "",
        day: "",
        country: "",
      },
      about: "",
      imageUrl: "",
    },
  });

  useEffect(() => {
    const getActor = async () => {
      const response = await axios(API_URL + `/actors/${id}`);

      reset(response.data);
    };

    if (id) {
      getActor();
    }
  }, []);

  const newActorHandler = async (values) => {
    const response = await axios(API_URL + (id ? `/actors/${id}` : "/actors"), {
      method: id ? "PUT" : "POST",
      data: values,
    });

    if (response.statusText === "OK") {
      toast({
        title: "Actor updated",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else if (response.statusText === "Created") {
      toast({
        title: "New Actor created",
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
      <h1> {id ? "Edit Actor" : "Create New Actor"}</h1>

      <form onSubmit={handleSubmit(newActorHandler)}>
        <Input
          label="Name:"
          register={register("name", { required: "Name is required" })}
          error={errors?.name?.message}
        />
        <Input
          label="Year:"
          type="number"
          register={register("born.year", { required: "Year is required" })}
          error={errors?.year?.message}
        />
        <Select
          options={monthArray}
          label="Month:"
          register={register("born.month", { required: "Month is required" })}
          error={errors?.month?.message}
        />
        <Input
          label="Day:"
          type="number"
          register={register("born.day", { required: "Day is required" })}
          error={errors?.day?.message}
        />
        <Input
          label="Country:"
          register={register("born.country", {
            required: "Country is required",
          })}
          error={errors?.country?.message}
        />
        <Input
          label="About:"
          type="textarea"
          register={register("about", { required: "Description is required" })}
          error={errors?.about?.message}
        />
        <Input
          label="Actor picture link:"
          type="url"
          register={register("imageUrl", { required: "Link is required" })}
          error={errors?.about?.message}
        />

        <Button type="submit" colorScheme="green" isLoading={isSubmitting}>
          {id ? "Edit" : "Create"}
        </Button>
      </form>
    </Container>
  );
};

export default CreateActorPage;
