import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { UsersState } from '../app/App';
import ServiceContext from '../../contexts/serviceContext';
import { UserPosts } from './Posts';

type PostForm = {
    userId: number,
    title: string,
    body: string
}

type Props = {
    users: Array<UsersState>,
    onCloseModal: () => void,
    setPosts: Dispatch<SetStateAction<UserPosts>>
}

const useStyles = makeStyles(() => ({
  paper: {
    height: 400,
    width: 500,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    background: '#fff',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  textField: {
    margin: 20,
  },
  textArea: {
    margin: '0 20px 20px 20px',
  },
  label: {
    margin: '0 0 5px 20px',
  },
  buttonsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > button': {
      margin: 5,
    },
  },
  button: {
    background: 'rgb(144 202 249)',
    color: 'rgb(33 33 33)',
    fontWeight: 'bold',
  },
}));

const NewPostForm: React.FC<Props> = ({ users, onCloseModal, setPosts }: Props) => {
  const { service } = useContext(ServiceContext);
  const classes = useStyles();
  const [formData, setFormData] = useState<PostForm>({
    userId: 0,
    title: '',
    body: '',
  });

  const onChangeFormData = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, body, userId } = formData;
    const author = users.find((u) => u.id === userId)!;
    const newPost = {
      author,
      title,
      body,
    };

    setPosts((prevState) => [...prevState, {
      ...newPost,
      id: prevState.length + 1,
    }]);
    service.createPost(formData);
    onCloseModal();
  };

  return (
    <form className={classes.paper} onSubmit={onSubmitForm}>
      <TextField
        className={classes.textField}
        label="Username"
        name="userId"
        value={formData.userId}
        select
        onChange={onChangeFormData}
      >
        {users.map((el) => (
          <MenuItem key={el.id} value={el.id}>
            {el.username}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        autoComplete=""
        className={classes.textField}
        label="Title"
        name="title"
        onChange={onChangeFormData}
      />
      <span className={classes.label}>
        Body
      </span>
      <TextareaAutosize
        className={classes.textArea}
        name="body"
        rowsMin={5}
        onChange={onChangeFormData}
      />
      <div className={classes.buttonsContainer}>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          classes={{ root: classes.button }}
        >
          Add
        </Button>
        <Button
          color="primary"
          variant="contained"
          classes={{ root: classes.button }}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default NewPostForm;
