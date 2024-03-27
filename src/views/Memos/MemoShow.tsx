import { TextInput, RichTextField, Show } from 'react-admin';
import CustomForm from '../../components/CustomForm';
import { Permission } from '@/types/roles';

const UserEdit = ({ actions, resource }: Permission) => {
  const resourcePath = `/${resource}`;

  return (
    <Show>
      <CustomForm
        pathTo={resourcePath}
        showDeleteButton={false}
        showSaveButton={false}
      >
        <TextInput source="id" disabled></TextInput>
        <TextInput source="animalId" label="Animal ID" disabled></TextInput>
        <RichTextField
          source="content"
          sx={{
            border: '1px solid #ccc',
            padding: '1rem',
            borderRadius: '5px',
            width: '100%',
          }}
          label="Content"
        />
      </CustomForm>
    </Show>
  );
};

export default UserEdit;
