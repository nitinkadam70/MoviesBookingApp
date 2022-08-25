import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBookedMoviesData } from "../Redux/BookTicketPost/action";

const Bookings = () => {
  const toast = useToast();
  let token = localStorage.getItem("token");
  const { loading, bookedMoviesData, error } = useSelector(
    (store) => store.bookedMovie
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    dispatch(getBookedMoviesData());
  }, [token]);

  const removeItem = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/moviesBooked/${id}`)
      .then((res) => {
        dispatch(getBookedMoviesData());
        toast({
          title: "Cancle Booking Success",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      });
  };
  return (
    <>
      <br />
      <br />
      {bookedMoviesData.length > 0 ? (
        <Box width="80%" margin="auto">
          {loading ? (
            <Center>
              <Spinner size="xl" />
            </Center>
          ) : error ? (
            <Center>
              <Heading>Something went Wrong </Heading>
            </Center>
          ) : (
            <Grid
              justifyContent="center"
              alignItems={"center"}
              templateColumns="repeat(4, 1fr)"
              templateRows={"repeat(25%)"}
              gap={6}
            >
              {bookedMoviesData &&
                bookedMoviesData.map((elem) => (
                  <GridItem
                    w="100%"
                    h={"100%"}
                    bg="green"
                    color="white"
                    key={elem.id}
                  >
                    <Text fontWeight="bold" fontSize="1rem" textAlign="center">
                      name : {elem.name}
                    </Text>
                    <Text
                      fontWeight="bold"
                      color="black"
                      fontSize="1rem"
                      textAlign="center"
                    >
                      seat No : {elem.seat}
                    </Text>
                    <Button
                      onClick={() => removeItem(elem.id)}
                      colorScheme={"red"}
                      minW={"100%"}
                    >
                      cancle booking
                    </Button>
                  </GridItem>
                ))}
            </Grid>
          )}
        </Box>
      ) : (
        <Box>
          <Heading>You have no bookings click on Booked movies</Heading>
          <Button colorScheme={"teal"} onClick={() => navigate("/")}>
            Booked Movies
          </Button>
        </Box>
      )}
    </>
  );
};

export default Bookings;
