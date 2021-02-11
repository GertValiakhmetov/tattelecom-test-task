import React, { useContext, useEffect, useState } from 'react';
import './albumOverview.scss';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import ServiceContext from '../../contexts/serviceContext';
import { Album, AlbumData } from '../../services/service';

type Props = {
    id: string
}

const useStyles = makeStyles(() => ({
  modal: {
    width: 400,
    height: 400,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
  },
}));

const AlbumOverview: React.FC<RouteComponentProps<Props>> = (
  { match }: RouteComponentProps<Props>,
) => {
  const { service } = useContext(ServiceContext);
  const classes = useStyles();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [albumData, setAlbumData] = useState<AlbumData>({} as AlbumData);
  const [open, setOpen] = useState<boolean>(false);
  const [currentPhotoView, setCurrentPhotoView] = useState<Album>();
  const [page, setPage] = useState<number>(1);
  const itemsPerPage: number = 15;
  const [numberOfPages, setNumberOfPages] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const albumId = match.params.id;
      const fetchedAlbumData = await service.getAlbum(albumId);
      setAlbumData(fetchedAlbumData);
      setNumberOfPages(Math.ceil(fetchedAlbumData.photos.length / itemsPerPage));
      setLoading(false);
    })();
  });

  const onOpenPhotoView = (photo: Album) => {
    setOpen(true);
    setCurrentPhotoView(photo);
  };

  const onClosePhotoView = () => {
    setOpen(false);
  };

  const handleChange = (event: object, nextPage: number) => {
    setPage(nextPage);
  };

  return (
    <div className="photosPage">
      {
            isLoading
              ? <p>...loading</p>

              : (
                <>
                  <div className="photosContainer">
                    {albumData.photos
                      .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                      .map((photo) => (
                        <>
                          <div
                            key={photo.id}
                            className="photoContainer"
                            onClick={() => onOpenPhotoView(photo)}
                            role="button"
                            aria-hidden="true"
                            tabIndex={0}
                          >
                            <img src={photo.thumbnailUrl} alt="album preview" width="100%" />
                          </div>
                        </>
                      ))}
                  </div>

                  <Modal
                    open={open}
                    onClose={onClosePhotoView}
                  >
                    <img src={currentPhotoView?.url} alt="test" width="100%" className={classes.modal} />
                  </Modal>
                  <Pagination
                    count={numberOfPages}
                    page={page}
                    onChange={handleChange}
                    defaultPage={1}
                    showFirstButton
                    showLastButton
                  />
                </>
              )
        }
    </div>
  );
};

export default withRouter(AlbumOverview);
