import { client } from '../../client';
import { AxiosError } from 'axios';
import { CommonError } from '../../types';
import { useMutation } from '@tanstack/react-query';

const uploadExcelFile = async ({ service, formBody }: { service: string; formBody: FormData }) => {
  return client.post(`/upload/${service}`, formBody).then((res) => res.data);
};

export const useUploadExcelFile = () => {
  return useMutation<void, AxiosError<CommonError>, { service: string; formBody: FormData }>({
    mutationFn: uploadExcelFile,
  });
};
