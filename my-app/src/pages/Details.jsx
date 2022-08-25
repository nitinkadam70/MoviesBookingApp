import {
  Box,
  Button,
  Center,
  Image,
  Img,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getBookedMoviesData } from "../Redux/BookTicketPost/action";

const Details = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  let [show, setShow] = useState(false);
  const { bookedMoviesData } = useSelector((store) => store.bookedMovie);
  let token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const getData = async () => {
    setLoading(true);
    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_URL}/movies/${id}`
      );
      let data = await res.json();
      setLoading(false);
      setData(data);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    dispatch(getBookedMoviesData());
    getData();
    cheak();
  }, [token, show, setShow, bookedMoviesData.length]);

  const BookedMovie = (movie_id, name) => {
    let payload = { seat: "A4", movie_id, name };
    axios({
      url: `https://json-server-deploy-api.herokuapp.com/moviesBooked`,
      method: "POST",
      data: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      toast({
        title: "Booking Success",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      dispatch(getBookedMoviesData());
    });
  };

  const cheak = () => {
    bookedMoviesData.filter((elem) => {
      if (data && data.id === elem.movie_id) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  };
  return (
    <>
      <br />
      <br />
      <Button colorScheme={"pink"} onClick={() => navigate("/")}>
        Go to a Homepage
      </Button>
      {loading ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : (
        <Box
          bg="gray.800"
          width="70%"
          margin="auto"
          height={"500px"}
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
          gap={5}
        >
          <Box width="100%" height="100%">
            <Image
              maxH="100%"
              maxW="100%"
              src={data.poster_path}
              alt={data.title}
            />
          </Box>
          <Box fontWeight={500} color="#FFFF" display={"inline-block"} gap={5}>
            <Text color="red">title : {data.title}</Text>
            <Text>original_language : {data.original_language}</Text>
            <Text>original_language : {data.original_language}</Text>
            <Text>popularity : {data.popularity}</Text>
            <Text>vote_average : {data.vote_average}</Text>
            <Text fontWeight="bold">release_date : {data.release_date}</Text>
            <Text color="green">overview : {data.overview}</Text>
            <br />
            {!show ? (
              <Button
                colorScheme={"whatsapp"}
                onClick={() => BookedMovie(data.id, data.title)}
              >
                Book Tickets
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/bookings")}
                colorScheme={"blue"}
              >
                Show Booking Details
              </Button>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Details;
