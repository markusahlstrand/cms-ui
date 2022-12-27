import { Helmet } from 'react-helmet-async';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';

// @mui
import {
  Stack,
  Container,
  Typography,
  TextField,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { createField } from '../services/api';

// ----------------------------------------------------------------------

export default function FieldsCreatePage() {
  const [change, setChange] = useState({});

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const modelId = searchParams.get('modelId');

  const handleChange = (event) => {
    const { type, name, value } = event.target;
    const formatedValue = type === 'number' ? parseInt(value, 10) : value;

    setChange({
      ...change,
      [name]: formatedValue,
    });
  };

  const handleSave = () => {
    createField(change).then(() => {
      navigate(`/dashboard/models/${modelId}`);
    });
  };

  return (
    <>
      <Helmet>
        <title> Create Field </title>
      </Helmet>

      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Create new Field
        </Typography>

        <Stack spacing={3}>
          <FormControl fullWidth>
            <InputLabel id="select-type-label">Type</InputLabel>
            <Select labelId="select-type-label" id="type-select" name="type" label="Text" onChange={handleChange}>
              <MenuItem value="text">Text</MenuItem>
              <MenuItem value="datetime">Date and time</MenuItem>
              <MenuItem value="number">Number</MenuItem>
              <MenuItem value="boolean">Boolean</MenuItem>
            </Select>
          </FormControl>

          <TextField name="name" label="Name" onChange={handleChange} required />

          <TextField name="description" label="Description" type="text" multiline rows={8} onChange={handleChange} />

          <TextField name="order" label="Order" type="number" onChange={handleChange} />

          <TextField name="modelId" label="Model Id" type="number" onChange={handleChange} />
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
