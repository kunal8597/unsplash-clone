import { useState, useEffect } from "react";

interface usePhotoProps {
  query: string;
  pageNumber: number;
}

interface Photo {
  urls: any;
  alt_description: string | undefined;
  id: string;
  // Other properties based on your photo object structure
}

interface ErrorState {
  msg: string;
  state: boolean;
}

const usePhotos = ({ query, pageNumber }: usePhotoProps): { photos: Photo[], maxPages: number, error: ErrorState } => {
  const [maxPages, setMaxPages] = useState<number>(0);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [error, setError] = useState<ErrorState>({
    msg: "",
    state: false
  });

  useEffect(() => {
    setPhotos([]); // Reset photos when query changes
    setMaxPages(0); // Reset maxPages when query changes
  }, [query]); // Trigger this effect when the query changes

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.unsplash.com/search/photos?page=${pageNumber}&per_page=30&query=${query}&client_id=mGd5AlKdydkyIYiGro0xm2mQrCnITrZY99UfTDZRdmE`);

        if (!response.ok) {
          throw new Error(`${response.status} Error, something went wrong`);
        }

        const data = await response.json();
        setPhotos((prevPhotos: Photo[]) => [...prevPhotos, ...data.results]);
        setMaxPages(data.total_pages);
      } catch (err:any) {
        setError({
          msg: err.message,
          state: true
        });
      }
    };

    if (query) {
      fetchData();
    }
  }, [query, pageNumber]);

  return { photos, maxPages, error };
};

export default usePhotos;
