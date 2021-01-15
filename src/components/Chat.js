import { Grid, Container, Avatar } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React, { useContext, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase';

import { Context } from '../index';
import Loader from './Loader';

const Chat = () => {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [messages, loading] = useCollectionData(
    firestore.collection('messages').orderBy('createAt'),
  );

  const [value, setValue] = useState('');

  const sendMessage = async () => {
    firestore.collection('messages').add({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setValue('');
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <Container>
      <Grid container justify={'center'} style={{ height: window.innerHeight - 50, margin: 20 }}>
        <div
          style={{
            width: '80%',
            height: '60vh',
            border: '1px solid gray',
            overflowY: 'auto',
          }}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                margin: 10,
                border: user.uid === message.uid ? '2px solid green' : '2px dashed red',
                marginLeft: user.uid === message.uid ? 'auto' : '10px',
                width: 'fit-content',
                padding: 5,
              }}>
              <Grid container>
                <Avatar src={message.photoURL} />
                <div>{message.displayName}</div>
              </Grid>
              <div>{message.text}</div>
            </div>
          ))}
        </div>
        <Grid container direction={'column'} alignItems={'flex-end'} style={{ width: '80%' }}>
          <TextField
            fullWidth
            rowsMax={2}
            variant={'outlined'}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button onClick={sendMessage} variant={'outlined'}>
            Отправить
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
