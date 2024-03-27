import { TextInput, ImageField, Show } from 'react-admin';
import { Permission } from '@/types/roles';

import CustomForm from '../../components/CustomForm';

const ImgRecSelectionShow = ({ actions, resource }: Permission) => {
  const resourcePath = `/${resource}`;

  return (
    <Show>
      <CustomForm
        pathTo={resourcePath}
        showDeleteButton={false}
        showSaveButton={false}
      >
        <TextInput source="name" isRequired fullWidth disabled />

        <ImageField source="imgPath" title="title" />
      </CustomForm>
    </Show>
  );
};

export default ImgRecSelectionShow;
