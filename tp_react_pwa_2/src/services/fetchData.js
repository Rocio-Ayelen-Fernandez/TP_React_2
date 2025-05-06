
export const fetchData = async ({ url, accessToken, onSuccess, onError }) => {
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (!res.ok) {
        throw new Error(`Error al obtener datos desde ${url}`);
      }
  
      const data = await res.json();
      if (onSuccess) onSuccess(data);
      return data;
    } catch (err) {
      console.error("fetchData error:", err);
      if (onError) onError(err);
      return null;
    }
  };
  