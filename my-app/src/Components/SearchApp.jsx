import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
const SearchApp = () => {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function searchMovie() {
    setLoading(true);
    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_URL}/movies?q=${text}`
      );

      let data = await res.json();

      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  //now we are joint(searchMovie+Appendmovie) two function in one function

  async function main() {
    let data = await searchMovie();

    if (data === undefined) {
      return false;
    }

    setData(data);
  }

  let timerid;
  function debounce(func, delay) {
    if (timerid) {
      clearTimeout(timerid); //almost similar to like innerHTML.null
    }
    timerid = setTimeout(function () {
      func(); // these is main function we r only change name here
    }, delay);
  }

  // const getData = async () => {
  //   setLoading(true);
  //   try {
  //     let res = await fetch(
  //       `${process.env.REACT_APP_API_URL}/movies?q=${text}`
  //     );
  //     let data = await res.json();
  //     setData(data);
  //     setLoading(false);
  //   } catch (err) {
  //     console.log(err);
  //     setLoading(false);
  //   }
  // };
  useEffect(() => {
    debounce(main, 1000);
  }, [text]);
  return (
    <>
      <Box>
        <Flex>
          <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Search Movies here..."
          />
          <IconButton
            colorScheme="blue"
            aria-label="Search database"
            icon={<SearchIcon />}
          />
        </Flex>

        {text ? (
          <Box bg="Gray.800" pos="relative" zIndex={1}>
            {loading ? (
              <Center>Loading....</Center>
            ) : (
              text &&
              data.map((elem, index) => (
                <Box key={index}>
                  <Text color={"#FFFF"}>{elem.title}</Text>
                </Box>
              ))
            )}
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default SearchApp;
