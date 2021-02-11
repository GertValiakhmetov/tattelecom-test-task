import React,
{
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  withRouter,
  Link,
  RouteComponentProps,
} from 'react-router-dom';
import {
  FetchedAlbums,
  AlbumData,
} from '../../services/service';
import './album.scss';
import ServiceContext from '../../contexts/serviceContext';

type Props = {
    album: FetchedAlbums;
} & RouteComponentProps

const Album: React.FC<Props > = ({ album, match }: Props) => {
  const { service } = useContext(ServiceContext);
  const [albumData, setAlbumData] = useState<AlbumData>({} as AlbumData);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (album) {
      (async () => {
        setLoading(true);
        const fetchedAlbumData = await service.getAlbum(album.id);
        setAlbumData(fetchedAlbumData);
        setLoading(false);
      })();
    }
  }, [album]);

  return (
    <Link to={`${match.url}/${album.id}`} className="albumLink">
      <div className="albumContainer">
        <div className="albumTitle">{album.title}</div>
        {
                  isLoading ? null : (
                    <img src={albumData.photos[0].thumbnailUrl} alt="album preview" width="100%" />
                  )
              }
      </div>
    </Link>
  );
};

export default withRouter(Album);
