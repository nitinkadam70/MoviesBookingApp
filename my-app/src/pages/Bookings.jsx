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
  TableContainer,
  Table,
  Thead,
  Tr,
  Tbody,
  Td,
  Th,
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
        <Box width="50%" margin="auto">
          {loading ? (
            <Center>
              <Spinner size="xl" />
            </Center>
          ) : error ? (
            <Center>
              <Heading>Something went Wrong </Heading>
            </Center>
          ) : (
            <TableContainer>
              <Table variant="striped" colorScheme="teal">
                <Thead>
                  <Tr>
                    <Th>#</Th>
                    <Th>Movie Name</Th>
                    <Th>Seat No.</Th>
                    <Th>Cancle Booking</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {bookedMoviesData &&
                    bookedMoviesData.map((elem, index) => (
                      <Tr key={elem.name}>
                        <Td>{index + 1}</Td>
                        <Td>{elem.name}</Td>
                        <Td>{elem.seat}</Td>
                        <Td>
                          <Button
                            onClick={() => removeItem(elem.id)}
                            colorScheme={"red"}
                            minW={"100%"}
                          >
                            Cancle Booking
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
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
