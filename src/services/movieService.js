import axios from "axios";
import { BASE_URL, TMDB_TOKEN } from "../constants";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_TOKEN}`,
  },
});

export const fetchGenreList = async (content = "movie") => {
  try {
    const response = await apiClient.get(`/genre/${content}/list`, {
      params: { 
        language: "en-US" 
      },
    });
    return response.data.genres; 
  } catch (error) {
    console.error(`Error fetching ${content} genres:`, error);
    return [];
  }
};

export const fetchMovies = async (
  endpoint = "/movie/popular",
  page = 1,
  extraParams = {},
) => {
  try {
    const response = await apiClient.get(endpoint, {
      params: {
        page: page,
        language: "en-US",
        ...extraParams, 
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("TMDB Fetch Error:", error.response?.data || error.message);
    return [];
  }
};

export const fetchMovieDetails = async (id, content) => {
  try {
    const response = await apiClient.get(`/${content}/${id}`, {
      params: { append_to_response: "videos,credits" },
    });
    return response.data;
  } catch (error) {
    console.error("TMDB Detail Error:", error);
    return null;
  }
};

export const fetchMovieVideos = async (id, content) => {
  try {
    const response = await apiClient.get(`/${content}/${id}/videos`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await apiClient.get("/search/multi", {
      params: { query: query, language: "en-US" },
    });
    return response.data.results;
  } catch (error) {
    console.error("Search Error:", error);
    return [];
  }
};