import { RAFile } from '@/types/imgRecSelection';

const convertFileToBase64 = (file: { rawFile: Blob }) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file.rawFile);
  });

/**
 * Generate filename with the current date.
 * @param originalFileName filename with extension. Eg: 'lion.jpg'
 * @returns filename with the current date. Eg: '20240124_122254_lion.jpg'
 */
const generateFileName = (originalFileName: string) => {
  const date = new Date();
  const dateISOString = date.toISOString();

  const year = dateISOString.slice(0, 4);
  const month = dateISOString.slice(5, 7);
  const day = dateISOString.slice(8, 10);
  const hour = dateISOString.slice(11, 13);
  const minute = dateISOString.slice(14, 16);
  const second = dateISOString.slice(17, 19);

  return `${year}${month}${day}_${hour}${minute}${second}_${originalFileName}`;
};

/**
 * Convert multiple  ReactAdmin based original pictures to base64
 * @param pictures original pictures
 * @returns base64 pictures
 */
const convertRAFiles = async (pictures: RAFile[], isRaw = false) => {
  if (isRaw) {
    return pictures.map((picture) => {
      console.log(':::picture', picture);

      return {
        src: picture.rawFile,
        title: generateFileName(picture.title),
      };
    });
  }

  const newPictures = pictures.filter((p) => p.rawFile instanceof File);
  const formerPictures = pictures.filter((p) => !(p.rawFile instanceof File));

  const base64Pictures = await Promise.all(
    newPictures.map(convertFileToBase64)
  );

  const uploadedPictures = [
    ...base64Pictures.map((dataUrl, index) => ({
      src: dataUrl,
      title: generateFileName(newPictures[index].title),
    })),
    ...formerPictures,
  ];

  return uploadedPictures;
};

/**
 * Convert single ReactAdmin based original pictures to base64
 * @param pictures original pictures
 * @returns base64 pictures
 */
const convertRASingleFileWithBase64 = async (picture: RAFile) => {
  const convertedFiles = await convertRAFiles([picture]);

  return convertedFiles[0];
};

const convertRASingleFileWithRaw = async (picture: RAFile) => {
  const convertedFiles = await convertRAFiles([picture], true);
  console.log(':::convertedFiles', convertedFiles);

  return convertedFiles[0];
};

const convertBase64ToObjectUrl = (base64: string) => {
  const arr = base64.split(',');
  const mimeMatch = /:(.*?);/.exec(arr[0]);
  const mime = mimeMatch ? mimeMatch[1] : '';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  const blob = new Blob([u8arr], { type: mime });
  const url = URL.createObjectURL(blob);

  return url;
};

export {
  convertFileToBase64,
  generateFileName,
  convertRAFiles,
  convertRASingleFileWithBase64,
  convertBase64ToObjectUrl,
  convertRASingleFileWithRaw,
};
