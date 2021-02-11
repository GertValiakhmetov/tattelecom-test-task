import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import './posts.scss';
import Pagination from '@material-ui/lab/Pagination';
import ServiceContext from '../../contexts/serviceContext';
import { UsersState } from '../app/App';
import Post from './Post';
import NewPost from './NewPost';

type Props = {
    users: Array<UsersState>
}

export type UserPosts = {
    author: UsersState,
    id: number,
    title: string,
    body: string
}[]

const Posts: React.FC<Props> = ({ users }: Props) => {
  const { service } = useContext(ServiceContext);
  const [posts, setPosts] = useState<UserPosts>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const itemsPerPage: number = 5;
  const [numberOfPages, setNumberOfPages] = useState<number>(0);

  useEffect(() => {
    if (users.length) {
      (async () => {
        setLoading(true);
        const fetchedPosts = await service.getPosts();
        const userPosts = fetchedPosts.map((post) => {
          const user = users.find((u) => u.id === post.userId)!;
          return {
            author: user,
            title: post.title,
            body: post.body,
            id: post.id,
          };
        });
        setLoading(false);
        setNumberOfPages(Math.ceil(userPosts.length / itemsPerPage));
        setPosts(userPosts);
      })();
    }
  }, [users]);

  useEffect(() => {
    setNumberOfPages(Math.ceil(posts.length / itemsPerPage));
  }, [posts]);

  const handleChange = (event: object, nextPage: number) => {
    setPage(nextPage);
  };

  return (
    <>
      {
          isLoading
            ? <p>loading...</p>
            : (
              <div className="pageContainer">
                <NewPost users={users} setPosts={setPosts} />
                <div className="postContainer">
                  {posts
                    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                    .map((post) => (
                      <Post
                        title={post.title}
                        body={post.body}
                        author={post.author.username}
                        key={post.id}
                      />
                    ))}
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
            )
      }
    </>
  );
};

export default Posts;
