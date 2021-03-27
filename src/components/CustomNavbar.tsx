import React, { useState, useEffect } from "react";
import { Button, Nav, Navbar, NavbarBrand } from "reactstrap";
import { getEnvVariable } from "../environment";
import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";

function CustomNavbar(props: any) {
  let location = useLocation();
  let history = useHistory();

  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  function goBack() {
    history.goBack();
  }

  function triggerCreatePost() {
    document.getElementById("addPostBtn")?.click();
  }

  return (
    <Navbar color="dark" dark expand="md" sticky={"top"}>
      {activeLink && activeLink !== "/" && (
        <>
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="mr-3"
            color={"white"}
            onClick={() => goBack()}
            style={{ cursor: "pointer" }}
          />
          <NavbarBrand onClick={() => goBack()} style={{ cursor: "pointer" }}>
            Back
          </NavbarBrand>
        </>
      )}
      {activeLink && activeLink === "/" && (
        <NavbarBrand href="/">{getEnvVariable().appName}</NavbarBrand>
      )}
      <Nav className="mr-auto" navbar></Nav>
      {activeLink && activeLink === "/" && (
        <Button size="sm" onClick={triggerCreatePost}>
          <FontAwesomeIcon icon={faPlus} className="mr-3" color={"white"} />
          NEW POST
        </Button>
      )}
    </Navbar>
  );
}

export default CustomNavbar;
