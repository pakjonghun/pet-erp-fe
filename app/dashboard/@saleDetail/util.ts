import { ClientInfoMenu, ProductSaleInfo } from '@/http/graphql/codegen/graphql';
import { getNumberToString, getProfit, getProfitRate } from '@/utils/sale';
import { SaleToNumber } from './type';

export function createTableRowToRawData(client: ClientInfoMenu | ProductSaleInfo) {
  const profit = getProfit({
    accAdPrice: client.accAdPrice ?? 0,
    accDeliveryCost: client.accDeliveryCost,
    accPayCost: client.accPayCost,
    accWonCost: client.accWonCost,
  });

  const result = {
    name: client.name ?? '',
    accCount: client.accCount ?? 0,
    accTotalPayment: client.accTotalPayment ?? 0,
    accPayCost: client.accPayCost ?? 0,
    accWonCost: client.accWonCost ?? 0,
    accDeliveryCost: Math.floor(client.accDeliveryCost ?? 0),
    profit: profit ?? 0,
    profitRate: getProfitRate(profit, client.accTotalPayment ?? 0),
    // accAdPrice: client.accAdPrice ?? 0,
  };

  return result;
}

export function createTableRowToString(client: SaleToNumber) {
  const result = [
    client.name ?? '',
    getNumberToString(client.accCount, 'comma'),
    getNumberToString(client.accTotalPayment, 'comma'),
    getNumberToString(client.accPayCost, 'comma'),
    getNumberToString(client.accWonCost, 'comma'),
    getNumberToString(client.accDeliveryCost, 'comma'),
    // getNumberToString(Math.floor(client.accAdPrice), 'comma'),
    getNumberToString(Math.floor(client.profit), 'comma'),
    getNumberToString(client.profitRate, 'percent'),
  ];

  return result;
}
