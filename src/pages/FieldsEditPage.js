import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

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
  Skeleton,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { getField } from '../services/api';

// ----------------------------------------------------------------------

export default function FieldsEditPage() {
  const [change, setChange] = useState({});
  const [field, setField] = useState(null);

  const navigate = useNavigate();

  const params = useParams();
  useEffect(() => {
    if (!field) {
      getField(params.id).then((field) => {
        setField(field);
      });
    }
  }, [field, params]);

  const handleChange = (event) => {
    const { type, name, value } = event.target;
    const formatedValue = type === 'number' ? parseInt(value, 10) : value;

    setChange({
      ...change,
      [name]: formatedValue,
    });
  };

  const handleSave = () => {
    // createField(change).then(() => {
    //   navigate(`/dashboard/models/${modelId}`);
    // });
  };

  const fieldWithChanges = {
    ...field,
    ...change,
  };

  return (
    <>
      <Helmet>
        <title> Edit Field </title>
      </Helmet>

      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Edit Field
        </Typography>

        {field ? (
          <Stack spacing={3}>
            <FormControl fullWidth>
              <InputLabel id="select-type-label">Type</InputLabel>
              <Select
                labelId="select-type-label"
                id="type-select"
                name="type"
                label="Text"
                onChange={handleChange}
                value={fieldWithChanges?.type}
              >
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="datetime">Date and time</MenuItem>
                <MenuItem value="number">Number</MenuItem>
                <MenuItem value="boolean">Boolean</MenuItem>
              </Select>
            </FormControl>

            <TextField name="name" label="Name" required value={fieldWithChanges.name} onChange={handleChange} />

            <TextField
              name="description"
              label="Description"
              type="text"
              multiline
              rows={2}
              onChange={handleChange}
              value={fieldWithChanges.descritpion}
            />

            <TextField name="order" label="Order" type="number" onChange={handleChange} />

            <TextField name="modelId" label="Model Id" type="number" onChange={handleChange} />
          </Stack>
        ) : (
          <Stack spacing={3}>
            <Skeleton />
            <Skeleton />
            <Skeleton height={300} />
            <Skeleton />
            <Skeleton />
          </Stack>
        )}

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
