import { useState, useCallback } from "react";

const CACHE_KEY = "details_cache";

const useCachedFetch = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getCachedData = useCallback((type, id) => {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY)) || {};
    return cache[`${type}_${id}`];
  }, []);

  const setCachedData = (type, id, data) => {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY)) || {};

    if (Array.isArray(data)) {
      data.forEach((item) => {
        cache[`${type}_${item.id}`] = item;
      });
    } else if (type === "artist") {
      const existingArtist = cache[`${type}_${id}`] || {};
      cache[`${type}_${id}`] = {
        ...existingArtist,
        ...data,
        albums: data.albums || existingArtist.albums || [],
        topTracks: data.topTracks || existingArtist.topTracks || [],
      };
    } else if (type === "album") {
      const existingAlbum = cache[`${type}_${id}`] || {};
      cache[`${type}_${id}`] = {
        ...existingAlbum,
        ...data,
        tracks: Array.isArray(data.tracks) ? data.tracks : existingAlbum.tracks || [],
      };
    } else {
      cache[`${type}_${id}`] = data;
    }

    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  };

  const fetchData = useCallback(
    async (type, id, fetchFunction) => {
      const cachedData = getCachedData(type, id);
      if (cachedData) {
        console.log(`Usando caché para ${type} con ID: ${id}`);
        return cachedData;
      }

      console.log(`No hay caché para ${type} con ID: ${id}. Haciendo solicitud a la API...`);
      setIsLoading(true);
      try {
        const data = await fetchFunction();
        setCachedData(type, id, data);
        return data;
      } catch (error) {
        console.error(`Error fetching ${type} con ID: ${id}`, error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getCachedData]
  );

  return { fetchData, getCachedData, isLoading };
};

export default useCachedFetch;