export type IApiResponse<DataType> = SuccessResponse<DataType> | ErrorResponse;

type SuccessResponse<DataType> = {
  data: DataType;
  success: true;
  reason: string;
};

type ErrorResponse = {
  error: string;
  success: false;
  reason: string;
};
