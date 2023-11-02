import React from "react";
import Container from "../Container/Container";
import { NavLink } from "react-router-dom";
import "./PageHeader.scss";

const PageHeader = () => {
  return (
    <div className="page-header">
      <Container>
        <nav className="main-navigation">
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink to="/">Home</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/movies">MOVIES</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/genres">GENRES</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/actors">ACTORS</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/directors">DIRECTORS</NavLink>
            </li>
          </ul>
        </nav>
      </Container>
    </div>
  );
};

export default PageHeader;
