import { useEffect, useState } from 'react';
import axios from 'axios';

const ImagesApi = (search) => {
  const apiKey = 'e0fdcc3687db83f3bf4a938787e50a42';
  const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;
  const apiUrlAll = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}&include_adult=false&language=en-US&page=1`;
  const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;

  const [data, setData] = useState(null);
  const [loadingImage, setLoading] = useState(true);
  const [errorImage, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [top10, setTop10] = useState([]);
  const [all, setAll] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    let isMounted = true; // Flag to check if the component is still mounted

    const fetchData = async () => {
      try {
        const [AllResponse, genreResponse, Top10response] = await Promise.all([
          axios.get(apiUrlAll),
          axios.get(genreUrl),
          axios.get(apiUrl),
        ]);

        if (!isMounted) {
          return; // If the component unmounted, do not update state
        }

        if (AllResponse.status !== 200 || genreResponse.status !== 200 || Top10response.status !== 200) {
          throw new Error('Network response was not ok');
        }

        const AllData = AllResponse.data.results;
        setAll(AllData);

        const genreData = genreResponse.data.genres;
        setGenres(genreData);

        const Top10jsonData = Top10response.data;
        setData(Top10jsonData);

        const topTen = Top10jsonData.results;
        setTop10(topTen);

        setLoading(false);
      } catch (err) {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function to set isMounted to false when the component unmounts
    return () => {
      isMounted = false;
    };
  }, [apiUrl, apiUrlAll, genreUrl, search]);

  return { data, loadingImage, errorImage, movies, top10, all, genres };
};

export default ImagesApi;
