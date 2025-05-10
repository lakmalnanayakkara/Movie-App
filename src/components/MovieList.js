import { useEffect, useState } from "react";
import tmdbApi from "../api/TmdbApi";
import Movie from "./Movie";
import { Box } from "@mui/material";
import { SwiperSlide, Swiper } from "swiper/react";

export default function MovieList(props) {
  const { id } = props;
  const [similarMovies, setSimilarMovies] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await tmdbApi.similar(id);
      setSimilarMovies(result.results);
    };
    fetchData();
  }, [id]);
  return (
    <Box sx={{ width: "100%" }}>
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
        {similarMovies.map((item, i) => (
          <SwiperSlide key={i}>
            <Movie movie={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
