import validateForm, { ValidationRule } from '../../utils/formValidator';
import { productContentLength } from '@/consts/product';
import { ProductDetailPostIF } from '@/types/product';

const rules: ValidationRule[] = [
  {
    field: 'name',
    required: true,
    minLength: productContentLength.name.min,
    maxLength: productContentLength.name.max,
  },
];

const detailRules: ValidationRule[] = [
  {
    field: 'detailName',
    required: true,
    minLength: 0,
    maxLength: 20,
  },
  {
    field: 'count',
    required: true,
    minValue: 1,
    maxValue: 100,
  },
];
export const validateProductCreation = (values: RecordValue): RecordValue => {
  return validateForm(values, rules);
};

export const validateProductEdition = (values: RecordValue): RecordValue => {
  let baseValidation = validateForm(values, rules);

  baseValidation = validateDetails(values, baseValidation);

  return baseValidation;
};

export const validateDetails = (
  values: RecordValue,
  errorObj: RecordValue
): RecordValue => {
  errorObj.details = values.details.map((detail: ProductDetailPostIF) => {
    return validateForm(detail, detailRules);
  });

  return errorObj;
};
