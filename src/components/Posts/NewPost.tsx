import React, {
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import NewPostForm from './NewPostForm';
import { UsersState } from '../app/App';
import { UserPosts } from './Posts';

export type Props = {
    users: Array<UsersState>
    setPosts: Dispatch<SetStateAction<UserPosts>>
}

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 20,
  },
}));

const NewPost: React.FC<Props> = ({ users, setPosts }: Props) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalBody = (
    <div>
      <NewPostForm users={users} onCloseModal={handleClose} setPosts={setPosts} />
    </div>
  );

  return (
    <>
      <Tooltip
        title="Add new post"
      >
        <Fab
          classes={{ root: classes.root }}
          color="primary"
          onClick={handleOpen}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
      >
        {modalBody}
      </Modal>
    </>
  );
};

export default NewPost;
