import validateForm, { ValidationRule } from '../../utils/formValidator';

const editRules: ValidationRule[] = [
  {
    field: 'name',
    required: true,
    minLength: 2,
    maxLength: 100,
  },
];

const createRules: ValidationRule[] = [
  {
    field: 'name',
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  {
    field: 'pictures',
    required: true,
  },
];

const validateImgRecSelectionCreation = (values: RecordValue): RecordValue => {
  return validateForm(values, createRules);
};

const validateImgRecSelectionEdition = (values: RecordValue): RecordValue => {
  return validateForm(values, editRules);
};

export { validateImgRecSelectionCreation, validateImgRecSelectionEdition };
