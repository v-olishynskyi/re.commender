import * as React from 'react';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  TextField,
} from '@mui/material';
import { useRecoilState } from 'recoil';
import EditIcon from '@mui/icons-material/Edit';

import { currentUserRecoilState } from '../../store';
import { makeAvatarLetters } from '../../utils/startCase';
import { stringAvatar } from '../../utils/stringAvatars';
import { doc, updateDoc } from 'firebase/firestore';
import { firebaseDB } from '../../firebase/firebase';
import { getUserDoc, getUserDocData } from '../../api/firebaseRequests';

type FormFieldEditedState = {
  name: boolean;
  family_name: boolean;
};

const defaultFieldsState: FormFieldEditedState = {
  name: false,
  family_name: false,
};

const ProfilePage = () => {
  const [currentUserState, setCurrentUserState] = useRecoilState(
    currentUserRecoilState
  );

  const [isEditedField, setIsEditedField] =
    React.useState<FormFieldEditedState>(defaultFieldsState);

  const handleChangeIsEditedField = (key: 'name' | 'family_name') =>
    setIsEditedField(prev => ({ ...prev, [key]: !prev[key] }));

  const onClickChangeAvatar = () => {};

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCurrentUserState({ ...currentUserState, loading: true });

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name');
    const family_name = formData.get('family_name');

    const userDoc = await getUserDoc(currentUserState.user!.uid);
    const docRef = doc(firebaseDB, 'users', userDoc.id);

    await updateDoc(docRef, { name, family_name });

    const userDocData = await getUserDocData(currentUserState.user!.uid);

    setCurrentUserState({
      ...currentUserState,
      user: {
        ...userDocData,
      },
    });

    setIsEditedField(defaultFieldsState);
    setCurrentUserState({ ...currentUserState, loading: false });
  };

  return (
    <Container disableGutters maxWidth={'md'} sx={{ position: 'relative' }}>
      {currentUserState.user ? (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Box sx={{ mb: 4, position: 'relative' }}>
              <Avatar
                src='/static/images/avatar/2.jpg'
                sx={{
                  ...stringAvatar(
                    `${currentUserState.user!.name} ${
                      currentUserState.user!.family_name
                    }`
                  ),
                  width: '150px',
                  height: '150px',
                  fontSize: '80px',
                }}>
                {currentUserState.user.isAnonymous
                  ? 'AN'
                  : makeAvatarLetters(
                      `${currentUserState.user.name} ${currentUserState.user.family_name}`
                    )}
              </Avatar>
              <IconButton
                onClick={onClickChangeAvatar}
                sx={{
                  position: 'absolute',
                  right: 0,
                  bottom: 0,
                  bgcolor: 'primary.main',
                }}>
                <EditIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              component='form'
              onSubmit={handleSubmitForm}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id='email'
                    label='Email'
                    name='email'
                    autoComplete='email'
                    type='email'
                    defaultValue={currentUserState.user.email}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete='given-name'
                    name='name'
                    fullWidth
                    id='firstName'
                    label='Імʼя'
                    defaultValue={currentUserState.user.name}
                    disabled={!isEditedField.name}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => handleChangeIsEditedField('name')}>
                          <EditIcon />
                        </IconButton>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id='lastName'
                    label='Прізвище'
                    name='family_name'
                    autoComplete='family-name'
                    defaultValue={currentUserState.user.family_name}
                    disabled={!isEditedField.family_name}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() =>
                            handleChangeIsEditedField('family_name')
                          }>
                          <EditIcon />
                        </IconButton>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ mt: 3 }}>
                {currentUserState.loading ? (
                  <CircularProgress />
                ) : (
                  <Button type='submit' variant='contained'>
                    Зберегти
                  </Button>
                )}
              </Grid>
            </Box>
          </Box>
        </>
      ) : null}
    </Container>
  );
};

export default ProfilePage;
