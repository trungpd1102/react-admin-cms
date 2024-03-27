import { Edit, TextInput } from 'react-admin';

import CustomForm from '../../components/CustomForm';
import { validateAnimalCfEdition } from './formValidator';
import { Permission } from '@/types/roles';
const AnimalClassificationEdit = ({ actions, resource }: Permission) => {
  const resourcePath = `/${resource}`;

  return (
    <Edit>
      <CustomForm pathTo={resourcePath} validate={validateAnimalCfEdition}>
        <TextInput source="name" isRequired fullWidth />
        <TextInput source="animalCount" disabled />
      </CustomForm>
    </Edit>
  );
};

export default AnimalClassificationEdit;
