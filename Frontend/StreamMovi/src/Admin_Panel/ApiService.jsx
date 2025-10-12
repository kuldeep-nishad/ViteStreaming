import axios from "axios";
import { ApiMovi } from "../Url-Link/ApiMovi";



// Get all movies
export const getMovies = async () => {
  try {
    const res = await axios.get(ApiMovi);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

// Get movie by ID
export const getMovieById = async (id) => {
  try {
    const res = await axios.get(`${ApiMovi}/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

// Create movie
export const createMovie = async (movie) => {
  try {
    const res = await axios.post(ApiMovi, movie);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

// Update movie
export const updateMovie = async (id, movie) => {
  try {
    const res = await axios.put(`${ApiMovi}/${id}`, movie);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

// Delete movie
export const deleteMovie = async (id) => {
  try {
    const res = await axios.delete(`${ApiMovi}/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
