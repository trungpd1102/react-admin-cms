import {
  SimpleFormIterator,
  Show,
  TextInput,
  ArrayInput,
  NumberInput,
  SelectInput,
  FormDataConsumer,
  useShowContext,
} from 'react-admin';

import { Stack } from '@mui/material';
import CustomForm from '../../components/CustomForm';
import { Permission } from '@/types/roles';
import { masterCategories, subCategories } from '@/consts/product';

const ShowContent = ({ actions, resource }: Permission) => {
  const resourcePath = `/${resource}`;
  const { record } = useShowContext();

  return (
    <CustomForm
      pathTo={resourcePath}
      showDeleteButton={false}
      showSaveButton={false}
    >
      <Stack spacing={2}>
        <TextInput source="id" disabled />
        <TextInput source="name" disabled />
      </Stack>

      <SelectInput
        source="masterCategory"
        choices={masterCategories}
        title="Master Category"
        disabled
      />

      <FormDataConsumer>
        {({ formData, ...rest }) => (
          <SelectInput
            source="subCategory"
            choices={subCategories.filter((subCategories) => {
              return subCategories.masterId === record?.masterCategory;
            })}
            {...rest}
            title="Sub Category"
            disabled
          />
        )}
      </FormDataConsumer>
      <ArrayInput source="details" label="Parts">
        <SimpleFormIterator
          inline
          disableReordering
          disableClear
          disableAdd
          disableRemove
        >
          <TextInput source="detailName" label="Detail Name" disabled />
          <NumberInput source="count" label="Detail count" disabled />
        </SimpleFormIterator>
      </ArrayInput>
    </CustomForm>
  );
};

const ProductShow = ({ actions, resource }: Permission) => {
  return (
    <Show>
      <ShowContent actions={actions} resource={resource} />
    </Show>
  );
};

export default ProductShow;
