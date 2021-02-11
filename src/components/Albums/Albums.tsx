import React, { useContext, useEffect, useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import ServiceContext from '../../contexts/serviceContext';
import { FetchedAlbums } from '../../services/service';
import Album from '../Album/Album';
import './albums.scss';

const Albums = () => {
  const { service } = useContext(ServiceContext);
  const [albums, setAlbums] = useState<FetchedAlbums[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const itemsPerPage: number = 24;
  const [page, setPage] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(0);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const fetchedAlbums = await service.getAlbums();
      setLoading(false);
      setNumberOfPages(Math.ceil(albums.length / itemsPerPage));
      setAlbums(fetchedAlbums);
    })();
  }, []);

  useEffect(() => {
    setNumberOfPages(Math.ceil(albums.length / itemsPerPage));
  }, [albums]);

  const handleChange = (event: object, nextPage: number) => {
    setPage(nextPage);
  };

  return (
    <div className="albumsPage">
      <div className="albumsContainer">
        {isLoading
          ? <p>loading...</p>
          : albums
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((album) => (<Album album={album} key={album.id} />))}
      </div>
      <Pagination
        count={numberOfPages}
        page={page}
        onChange={handleChange}
        defaultPage={1}
        showFirstButton
        showLastButton
      />
    </div>
  );
};

export default Albums;
