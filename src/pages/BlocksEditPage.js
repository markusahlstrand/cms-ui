import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// @mui
import { Stack, Container, Typography, TextField, Divider, Skeleton } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// api
import { getBlock, saveBlock } from '../services/api';

// ----------------------------------------------------------------------

export default function BlocksEditPage() {
  const [block, setBlock] = useState(null);
  const [change, setChange] = useState({});

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!block) {
      getBlock(params.id).then((block) => {
        setBlock(block);
      });
    }
  }, [block, params]);

  const handleChange = (event) => {
    setChange({
      ...change,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = () => {
    saveBlock(params.id, change).then(() => {
      navigate('/dashboard/blocks');
    });
  };

  const blockWithChanges = {
    ...block,
    ...change,
  };

  return (
    <>
      <Helmet>
        <title> Edit Block </title>
      </Helmet>

      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Edit Block
        </Typography>

        <Stack spacing={3}>
          {block ? (
            <TextField name="name" label="Name" required value={blockWithChanges.name} onChange={handleChange} />
          ) : (
            <Skeleton />
          )}

          {block ? (
            <TextField
              name="description"
              label="Description"
              type="text"
              onChange={handleChange}
              multiline
              rows={8}
              value={blockWithChanges.description}
            />
          ) : (
            <Skeleton />
          )}
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Stack direction="row" spacing={3}>
          <LoadingButton fullWidth size="small" type="reset" variant="outlined" href="/dashboard/blocks">
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
