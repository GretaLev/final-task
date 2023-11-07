import {
  Box,
  Flex,
  IconButton,
  Stack,
  Collapse,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import Container from "../Container/Container";
import logo from "../../assets/logo-movies.svg";

const NAV_ITEMS = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Movies",
    url: "/movies",
  },
  {
    title: "Genres",
    url: "/genres",
  },
  {
    title: "Actors",
    url: "/actors",
  },
  {
    title: "Directors",
    url: "/directors",
  },
];

export default function Navigation() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <div className="page-header">
      <Container>
        <Flex bg="black" py={{ base: 2 }} align="center">
          <img src={logo} alt="logo" width="40px" />
          <Flex flex={{ base: 1 }} justify={{ base: "center", md: "end" }}>
            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>
          <Flex
            flex={{ base: 1, md: "auto" }}
            mr={{ base: -2 }}
            display={{ base: "flex", md: "none" }}
            justify="flex-end"
          >
            <IconButton
              onClick={onToggle}
              _hover={{
                bg: "white",
                "& svg": {
                  color: "black",
                },
              }}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} color="white" />
                ) : (
                  <HamburgerIcon w={5} h={5} color="white" />
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Container>
    </div>
  );
}

const DesktopNav = () => {
  return (
    <nav className="main-navigation">
      <ul className="nav-list">
        {NAV_ITEMS.map((navItem) => (
          <li className="nav-item" key={navItem.url}>
            <NavLink to={navItem.url}> {navItem.title}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const MobileNav = () => {
  return (
    <Stack bg="black" p={4} display={{ md: "none" }}>
      <VStack gap={4}>
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.url}>
            <NavLink to={navItem.url}> {navItem.title}</NavLink>
          </Box>
        ))}
      </VStack>
    </Stack>
  );
};
