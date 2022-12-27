import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';

// @mui
import {
  Stack,
  Container,
  Typography,
  TextField,
  Divider,
  Card,
  Skeleton,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Button,
  IconButton,
  MenuItem,
  Popover,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// api
import { getFieldsForModel, getModel, saveModel } from '../services/api';
import { UserListHead } from '../sections/@dashboard/user';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar/Scrollbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'type', label: 'Type', alignRight: false },
  { id: '' },
];

export default function ModelsEditPage() {
  const [open, setOpen] = useState(null);
  const [model, setModel] = useState(null);
  const [fields, setFields] = useState(null);
  const [change, setChange] = useState({});

  const handleOpenMenu = (event, id) => {
    setOpen({
      target: event.currentTarget,
      id,
    });
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!model) {
      getModel(params.id).then((model) => {
        setModel(model);
      });
    }
    if (!fields) {
      getFieldsForModel(params.id).then((fields) => {
        setFields(fields);
      });
    }
  }, [model, fields, params]);

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

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Edit Model
          </Typography>
        </Stack>

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
              rows={2}
              value={modelWithChanges.description}
            />
          ) : (
            <Skeleton />
          )}

          <TableContainer>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Fields
              </Typography>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
                href={`/dashboard/fields-create?modelId=${model?.id}`}
              >
                New Field
              </Button>
            </Stack>

            <Card>
              {/* <UserListToolbar /> */}

              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <UserListHead headLabel={TABLE_HEAD} rowCount={fields?.length} />
                    <TableBody>
                      {fields?.map((field) => (
                        <TableRow key={field.id}>
                          <TableCell padding="checkbox">
                            <Checkbox />
                          </TableCell>
                          <TableCell>{field.name}</TableCell>
                          <TableCell>{field.type}</TableCell>
                          <TableCell align="right">
                            <IconButton
                              size="large"
                              color="inherit"
                              onClick={(event) => handleOpenMenu(event, field.id)}
                            >
                              <Iconify icon={'eva:more-vertical-fill'} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
            </Card>
          </TableContainer>
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

      <Popover
        open={Boolean(open)}
        anchorEl={open?.target}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem component={NavLink} to={`/dashboard/models/${open?.id}`}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
