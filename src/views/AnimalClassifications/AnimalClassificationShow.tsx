import { Show, TextInput } from 'react-admin';

import CustomForm from '../../components/CustomForm';
import { Permission } from '@/types/roles';

const AnimalClassificationShow = ({ actions, resource }: Permission) => {
  const resourcePath = `/${resource}`;

  return (
    <Show>
      <CustomForm
        pathTo={resourcePath}
        showDeleteButton={false}
        showSaveButton={false}
      >
        <TextInput source="name" disabled />
        <TextInput source="animalCount" disabled />
      </CustomForm>
    </Show>
  );
};

export default AnimalClassificationShow;
