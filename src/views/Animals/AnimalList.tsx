import {
  List,
  Datagrid,
  TextField,
  ShowButton,
  EditButton,
  DeleteWithConfirmButton,
  BulkDeleteButton,
  TopToolbar,
  ExportButton,
  CreateButton,
  DateField,
} from 'react-admin';
import { Box } from '@mui/material';

import { validRole } from '../_core/permissions';

import { PostFilterForm } from './CustomFilter';
import { Actions, Permission } from '@/types/roles';

const ListActions = ({ actions }: { actions: Actions }) => {
  return (
    <Box width="100%">
      <TopToolbar>
        {validRole('edit', actions) ? <CreateButton /> : null}
        <ExportButton />
      </TopToolbar>
      <PostFilterForm />
    </Box>
  );
};

const AnimalClassificationList = ({ actions, resource }: Permission) => {
  return (
    <List actions={<ListActions actions={actions} />}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="classification.name" label="Classification" />
        <DateField source="created" />
        <ShowButton label="Detail"></ShowButton>
        {validRole('edit', actions) ? (
          <EditButton label="Edit"></EditButton>
        ) : null}{' '}
        {validRole('delete', actions) ? (
          <DeleteWithConfirmButton label="Delete"></DeleteWithConfirmButton>
        ) : null}{' '}
      </Datagrid>
    </List>
  );
};

export default AnimalClassificationList;
