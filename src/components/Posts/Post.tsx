import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    marginTop: 25,
    minWidth: 275,
    maxWidth: 700,
    background: '#424242',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  author: {
    marginLeft: 0,
  },
  title: {
    paddingTop: 20,
    fontSize: 24,
  },
  body: {
    paddingTop: 20,
    fontSize: 14,
    wordBreak: 'break-word',
  },
  pos: {
    marginBottom: 12,
  },
});

type Props = {
    title: string,
    body: string,
    author: string
}

const Post: React.FC<Props> = ({ title, body, author }: Props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.author}>
          {author}
        </Typography>
        <Typography className={classes.title} gutterBottom color="inherit">
          {title}
        </Typography>
        <Typography className={classes.body} color="inherit">
          {body}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
