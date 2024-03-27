import React from 'react';
import { TextInput, Create } from 'react-admin';
import CustomForm from '../../components/CustomForm';
import { validateAnimalCfCreation } from './formValidator';
import { Permission } from '@/types/roles';

const AnimalClassificationCreate = ({ actions, resource }: Permission) => {
  const resourcePath = `/${resource}`;

  return (
    <Create>
      <CustomForm
        pathTo={resourcePath}
        validate={validateAnimalCfCreation}
        showDeleteButton={false}
      >
        <TextInput source="name" isRequired fullWidth />
      </CustomForm>
    </Create>
  );
};
export default AnimalClassificationCreate;
