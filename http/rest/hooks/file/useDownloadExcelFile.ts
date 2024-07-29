import { useMutation } from '@tanstack/react-query';
import { client } from '../../client';
import { AxiosError } from 'axios';
import { CommonError } from '../../types';
import { SaleOrdersInput } from '@/http/graphql/codegen/graphql';

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

const downloadSaleOrders = async (saleOrdersInput: SaleOrdersInput) => {
  return client
    .post('/sale-orders/download', saleOrdersInput, { responseType: 'arraybuffer' })
    .then((res) => {
      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: 'application/vnd.ms-excel' })
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `주문내역_${new Date().toISOString()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    });
};

export const useDownloadSaleOrders = () => {
  return useMutation<void, AxiosError<CommonError>, SaleOrdersInput>({
    mutationFn: downloadSaleOrders,
  });
};
