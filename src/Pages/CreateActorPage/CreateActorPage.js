import { API_URL } from "../../config";
import Container from "../../Components/Container/Container";
import { Button, VStack, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import Input from "../../Components/Form/Input/Input";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const CreateActorPage = () => {
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
      name: "",
      born: "",
      country: "",
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
    if (response.statusText === "OK" || response.statusText === "Created") {
      navigate("/actors");
    }
  };

  return (
    <Container>
      <h1 className="create-page-title">
        {" "}
        {id ? "Edit Actor" : "Create New Actor"}
      </h1>

      <form onSubmit={handleSubmit(newActorHandler)}>
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
            label="Actor picture link:"
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

export default CreateActorPage;
