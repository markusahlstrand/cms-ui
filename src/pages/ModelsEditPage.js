import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// @mui
import { Stack, Container, Typography, TextField, Divider, Skeleton } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// api
import { getModel, saveModel } from '../services/api';

// ----------------------------------------------------------------------

export default function ModelsEditPage() {
  const [model, setModel] = useState(null);
  const [change, setChange] = useState({});

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!model) {
      getModel(params.id).then((model) => {
        setModel(model);
      });
    }
  }, [model, params]);

  const handleChange = (event) => {
    setChange({
      ...change,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = () => {
    saveModel(params.id, change).then(() => {
      navigate('/dashboard/models');
    });
  };

  const modelWithChanges = {
    ...model,
    ...change,
  };

  return (
    <>
      <Helmet>
        <title> Edit Model </title>
      </Helmet>

      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Edit Model
        </Typography>

        <Stack spacing={3}>
          {model ? (
            <TextField name="name" label="Name" required value={modelWithChanges.name} onChange={handleChange} />
          ) : (
            <Skeleton />
          )}

          {model ? (
            <TextField
              name="description"
              label="Description"
              type="text"
              onChange={handleChange}
              multiline
              rows={8}
              value={modelWithChanges.description}
            />
          ) : (
            <Skeleton />
          )}
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Stack direction="row" spacing={3}>
          <LoadingButton fullWidth size="small" type="reset" variant="outlined" href="/dashboard/models">
            Cancel
          </LoadingButton>
          <LoadingButton fullWidth size="small" type="submit" variant="contained" onClick={handleSave}>
            Save
          </LoadingButton>
        </Stack>
      </Container>
    </>
  );
}
