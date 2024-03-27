

interface UpdateAnimalClassificationCount {
  classificationId: number;
  dataProvider: DataProvider;
  decrement?: boolean;
}

interface GetPutPresignedUrlparams {
  data: {
    fileKey: string;
  };
}

interface PutObjectViaPresignedUrlParams {
  body: File;
  type: string;
}
