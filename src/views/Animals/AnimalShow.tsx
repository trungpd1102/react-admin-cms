import {
  TextInput,
  useNotify,
  BooleanInput,
  AutocompleteInput,
  RadioButtonGroupInput,
  ImageField,
  Show,
  RichTextField,
} from 'react-admin';

import { Stack } from '@mui/material';
import dataProvider from '../../providers/dataProviders/dataProvider';
import { AnimalClassificationResponseIF } from '@/types/animal';
import { continents, feedTypes, genders } from '@/consts/animal';
import { useEffect, useState } from 'react';

import CustomForm from '../../components/CustomForm';
import { Permission } from '@/types/roles';

const ShowForm = ({ actions, resource }: Permission) => {
  const resourcePath = `/${resource}`;

  const [classification, setClassification] = useState<
    AnimalClassificationResponseIF[]
  >([]);

  const notify = useNotify();

  useEffect(() => {
    const fetchClassification = async () => {
      try {
        const { data } = await dataProvider.getMany('animal_classifications', {
          ids: [],
        });
        setClassification(data);
      } catch (error) {
        notify('Error: Get Classification failed: ' + error, {
          type: 'warning',
        });
      }
    };
    fetchClassification();
  }, []);

  return (
    <CustomForm
      pathTo={resourcePath}
      showDeleteButton={false}
      showSaveButton={false}
    >
      <TextInput source="name" isRequired fullWidth disabled />

      <ImageField source="thumbImg" title="title" />

      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
        width={'100%'}
      >
        <AutocompleteInput
          source="classificationId"
          choices={classification}
          label="Classification"
          isRequired
          disabled
          fullWidth
        />
        <BooleanInput
          source="extinction"
          label="Extinction"
          fullWidth
          disabled
        />
      </Stack>
      <AutocompleteInput
        source="continent"
        choices={continents}
        label="Continent"
        isRequired
        disabled
        fullWidth
      />
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
        width={'100%'}
      >
        <RadioButtonGroupInput
          label="Gender"
          source="gender"
          choices={genders}
          fullWidth
          disabled
        />
        <RadioButtonGroupInput
          label="Feed Type"
          source="feedType"
          choices={feedTypes}
          fullWidth
          disabled
        />
      </Stack>

      <RichTextField source="memo.content"></RichTextField>
    </CustomForm>
  );
};

const AnimalClassificationEdit = (props: Permission) => {
  return (
    <Show>
      <ShowForm {...props} />
    </Show>
  );
};

export default AnimalClassificationEdit;
