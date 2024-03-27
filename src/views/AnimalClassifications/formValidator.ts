import { userContentLength } from '@/consts/user';
import validateForm, { ValidationRule } from '../../utils/formValidator';

const editionRules: ValidationRule[] = [
  {
    field: 'name',
    required: true,
    minLength: userContentLength.name.min,
    maxLength: userContentLength.name.max,
  },
];

const creationRules: ValidationRule[] = [
  {
    field: 'name',
    required: true,
    minLength: userContentLength.name.min,
    maxLength: userContentLength.name.max,
  },
];

const validateAnimalCfCreation = (values: RecordValue): RecordValue => {
  return validateForm(values, creationRules);
};

const validateAnimalCfEdition = (values: RecordValue): RecordValue => {
  return validateForm(values, editionRules);
};

export { validateAnimalCfCreation, validateAnimalCfEdition };
