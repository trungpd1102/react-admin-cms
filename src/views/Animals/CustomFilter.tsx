import ContentFilter from '@mui/icons-material/FilterList';
import { useForm, FormProvider } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import {
  useListContext,
  useNotify,
  AutocompleteInput,
  DateInput,
} from 'react-admin';
import { useEffect, useState } from 'react';
import dataProvider from '../../providers/dataProviders/dataProvider';
import { AnimalClassificationResponseIF, AnimalFilter } from '@/types/animal';
const PostFilterButton = () => {
  const { showFilter } = useListContext();
  return (
    <Button
      size="small"
      color="primary"
      onClick={() => showFilter('main', null)}
      startIcon={<ContentFilter />}
    >
      Filter
    </Button>
  );
};

const PostFilterForm = () => {
  const [classification, setClassification] = useState<
    AnimalClassificationResponseIF[]
  >([]);

  const notify = useNotify();

  const { displayedFilters, filterValues, setFilters, hideFilter } =
    useListContext();

  const form = useForm({
    defaultValues: filterValues,
  });

  const onSubmit = (values: AnimalFilter) => {
    if (Object.keys(values).length > 0) {
      setFilters(values, displayedFilters);
    } else {
      hideFilter('main');
    }
  };

  const clearFilter = () => {
    setFilters({}, []);
    form.reset();
  };

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
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Box display="flex" alignItems="center" mb={1}>
          <Box component="span" mr={2}>
            <AutocompleteInput
              key={1}
              source="classificationId"
              choices={classification}
              label="Classification"
              alwaysOn
            />
          </Box>
          <Box component="span" mr={2}>
            <DateInput source="createdFrom" />
          </Box>
          <Box component="span" mr={2}>
            <DateInput source="createdTo" />
          </Box>
          <Box component="span" mr={2} mb={1.5}>
            <Button variant="contained" color="primary" type="submit">
              Filter
            </Button>
          </Box>
          <Box component="span" mb={1.5}>
            <Button variant="outlined" onClick={clearFilter}>
              Clear
            </Button>
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
};

export { PostFilterButton, PostFilterForm };
