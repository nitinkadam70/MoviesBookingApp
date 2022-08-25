import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  return (
    <Flex
      bg="skyblue"
      p="2%"
      justifyContent="space-between"
      alignItems="center"
      fontWeight="bold"
      fontSize="md"
    >
      <Box display="flex" gap="5%">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/bookings">Bookings</NavLink>
      </Box>
      {token ? (
        <Box display="flex" gap="10%">
          <Button
            onClick={() => {
              localStorage.clear();
              navigate("/login");
              window.location.reload();
              toast({
                title: "you have logged out",
                status: "success",
                duration: 9000,
                isClosable: true,
                position: "top",
              });
            }}
            colorScheme="teal"
            variant="solid"
          >
            Logout
          </Button>
          <Button>Nitin</Button>
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Avatar
                size={"sm"}
                src="https://ca.slack-edge.com/T03QSVDQAMU-U03QZQB13KQ-c79290fadb01-512"
              />
            </MenuButton>
          </Menu>
        </Box>
      ) : null}
    </Flex>
  );
};

export default Navbar;
