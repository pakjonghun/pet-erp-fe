import { useMutation } from '@tanstack/react-query';
import { client } from '../../client';
import { AxiosError } from 'axios';
import { CommonError } from '../../types';

const downloadExcelFile = async (service: string) => {
  return client.post(`/download/${service}`, {}, { responseType: 'arraybuffer' }).then((res) => {
    const url = window.URL.createObjectURL(
      new Blob([res.data], { type: 'application/vnd.ms-excel' })
    );
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${service}_${new Date().toISOString()}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  });
};

export const useDownloadExcelFile = () => {
  return useMutation<void, AxiosError<CommonError>, string>({
    mutationFn: downloadExcelFile,
  });
};
