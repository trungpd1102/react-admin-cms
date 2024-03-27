import {
  List,
  Datagrid,
  TextField,
  DeleteWithConfirmButton,
  ShowButton,
  BulkExportButton,
  BulkDeleteButton,
} from 'react-admin';
import { validRole } from '../_core/permissions';
import { Permission } from '@/types/roles';

const UserList = ({ actions, resource }: Permission) => {
  const bulkActionButtons = validRole('delete', actions) ? (
    <>
      <BulkExportButton />
      <BulkDeleteButton />
    </>
  ) : (
    false
  );

  return (
    <List>
      <Datagrid rowClick="show" bulkActionButtons={bulkActionButtons}>
        <TextField source="id" />
        <TextField source="animalId" label="Animal ID" />
        <ShowButton label="Show"></ShowButton>
        {validRole('delete', actions) ? (
          <DeleteWithConfirmButton label="Delete"></DeleteWithConfirmButton>
        ) : null}{' '}
      </Datagrid>
    </List>
  );
};

export default UserList;
