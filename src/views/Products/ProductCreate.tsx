import { Permission } from '@/types/roles';
import {
  TextInput,
  Create,
  SelectInput,
  FormDataConsumer,
} from 'react-admin';
import { validateProductCreation } from './formValidator';
import { masterCategories, subCategories } from '@/consts/product';
import CustomForm from '@/components/CustomForm';

const ProductCreate = ({ actions, resource }: Permission) => {
  const resourcePath = `/${resource}`;

  return (
    <Create>
      <CustomForm
        pathTo={resourcePath}
        showDeleteButton={false}
        validate={validateProductCreation}
      >
        <TextInput source="name" isRequired />
        <SelectInput
          source="masterCategory"
          choices={masterCategories}
          title="Master Category"
        />

        <FormDataConsumer>
          {({ formData, ...rest }) => (
            <SelectInput
              source="subCategory"
              choices={subCategories.filter((subCategories) => {
                return subCategories.masterId === formData.masterCategory;
              })}
              {...rest}
              title="Sub Category"
            />
          )}
        </FormDataConsumer>
      </CustomForm>
    </Create>
  );
};

export default ProductCreate;
