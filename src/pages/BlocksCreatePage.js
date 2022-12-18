import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// @mui
import { Stack, Container, Typography, TextField, Divider } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { createBlock } from '../services/api';

// ----------------------------------------------------------------------

export default function ModelsPage() {
  const [change, setChange] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    setChange({
      ...change,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = () => {
    createBlock(change).then(() => {
      navigate('/dashboard/blocks');
    });
  };

  return (
    <>
      <Helmet>
        <title> Create Block </title>
      </Helmet>

      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Create new Block
        </Typography>

        <Stack spacing={3}>
          <TextField name="name" label="Name" onChange={handleChange} required />

          <TextField name="description" label="Description" type="text" multiline rows={8} onChange={handleChange} />
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Stack direction="row" spacing={3}>
          <LoadingButton fullWidth size="small" type="reset" variant="outlined" href="/dashboard/models">
            Cancel
          </LoadingButton>
          <LoadingButton fullWidth size="small" type="submit" variant="contained" onClick={handleSave}>
            Create
          </LoadingButton>
        </Stack>
      </Container>
    </>
  );
}
