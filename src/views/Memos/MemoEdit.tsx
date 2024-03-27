import { Edit, TextInput, RichTextField } from 'react-admin';
import CustomForm from '../../components/CustomForm';
import { Permission } from '@/types/roles';

const UserEdit = ({ actions, resource }: Permission) => {
  const resourcePath = `/${resource}`;

  return (
    <Edit>
      <CustomForm pathTo={resourcePath}>
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
    </Edit>
  );
};

export default UserEdit;
