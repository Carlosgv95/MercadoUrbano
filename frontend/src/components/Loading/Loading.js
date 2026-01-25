// src/components/Loading.js
import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loading = ({ message = "Cargando..." }) => (
  <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "200px" }}>
    <Spinner animation="border" role="status" />
    <span className="mt-2">{message}</span>
  </div>
);

export default Loading;