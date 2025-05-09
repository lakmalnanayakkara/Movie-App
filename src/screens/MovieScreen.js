import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../api/TmdbApi";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import apiConfig from "../api/ApiConfig";
import { Container } from "@mui/material";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, movie: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function MovieScreen() {
  const params = useParams();
  const { id } = params;

  const [{ loading, error, movie }, dispatch] = useReducer(reducer, {
    movie: {},
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      const params = {};
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await tmdbApi.detail(id, { params });
        dispatch({ type: "FETCH_SUCCESS", payload: result });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox severity="error">{error}</MessageBox>
      ) : (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                movie.backdrop_path || movie.poster_path
              )})`,
            }}
          ></div>
          <Container></Container>
        </>
      )}
    </>
  );
}
