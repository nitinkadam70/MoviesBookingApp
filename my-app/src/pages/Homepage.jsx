import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Img,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cards from "../Components/Cards";
import { getMoviesData } from "../Redux/MoviesGet/action";

const Homepage = () => {
  const { loading, movies, error } = useSelector((store) => store.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    if (movies.length === 0) {
      dispatch(getMoviesData());
    }
  }, [token, movies.length]);

  return (
    <>
      <br />
      <br />
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
            templateColumns="repeat(4, 20%)"
            templateRows={"repeat(25%)"}
            gap={6}
          >
            {movies &&
              movies.map((elem) => (
                <GridItem w="100%" h={"100%"} key={elem.id}>
                  <Cards
                    url={elem.poster_path}
                    title={elem.title}
                    id={elem.id}
                  />
                </GridItem>
              ))}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default Homepage;
