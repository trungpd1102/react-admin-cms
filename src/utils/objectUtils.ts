import { RecordValue } from '@/types/general';

function compareObjects(oldArray: RecordValue[], newArray: RecordValue[]) {
  const oldMap = new Map(oldArray.map((obj) => [obj.id, obj]));
  const newMap = new Map(newArray.map((obj) => [obj.id, obj]));

  const added = newArray.filter((obj) => !oldMap.has(obj.id));
  const removed = oldArray.filter((obj) => !newMap.has(obj.id));
  const changed = newArray.filter(
    (obj) =>
      oldMap.has(obj.id) &&
      JSON.stringify(obj) !== JSON.stringify(oldMap.get(obj.id))
  );

  return { added, removed, changed };
}

const convertToRawValue = (value: string) => {
  if (!isNaN(Number(value))) {
    return Number(value);
  } else if (
    value.toLowerCase() === 'true' ||
    value.toLowerCase() === 'false'
  ) {
    return value.toLowerCase() === 'true';
  } else if (value === 'undefined') {
    return undefined;
  } else if (value === 'null') {
    return null;
  } else {
    return value;
  }
};

const convertObjectToRawValues = (obj: {
  [key: string]: FormDataEntryValue;
}) => {
  const rawObj: { [key: string]: any } = {};

  for (const key in obj) {
    const value = obj[key];
    if (value instanceof Blob) {
      rawObj[key] = value;
    } else {
      rawObj[key] = convertToRawValue(value);
    }
  }

  return rawObj;
};

const convertFormDataToObject = (formData: FormData) => {
  const payload = Object.fromEntries(formData.entries());

  return convertObjectToRawValues(payload);
};

export {
  compareObjects,
  convertToRawValue,
  convertObjectToRawValues,
  convertFormDataToObject,
};
