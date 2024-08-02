import dayjs, { Dayjs } from 'dayjs';
import { Direction, SearchStandard } from './types';
import { getDateRange } from '../dateFilter/utils';

export function getDateValueByStandard(standard: SearchStandard, dayjsObj: Dayjs) {
  switch (standard) {
    case '년도':
      return dayjsObj.get('year');
    case '월':
      return dayjsObj.get('month') + 1;
    case '일':
      return dayjsObj.get('date');

    default:
      throw new Error('날짜 계산에 올바른 기준값을 입력해주세요.');
  }
}

export function getNextDayjsObj(standard: SearchStandard, dayjsObj: Dayjs, direction: Direction) {
  switch (standard) {
    case '년도': {
      const newDateObj =
        direction === 'left' //
          ? dayjsObj.subtract(1, 'year')
          : dayjsObj.add(1, 'year');
      return getDateRange(newDateObj, 'year');
    }

    case '월': {
      const newDateObj =
        direction === 'left' //
          ? dayjsObj.subtract(1, 'month')
          : dayjsObj.add(1, 'month');
      return getDateRange(newDateObj, 'month');
    }

    case '일': {
      const newDateObj =
        direction === 'left' //
          ? dayjsObj.subtract(1, 'day')
          : dayjsObj.add(1, 'day');
      return getDateRange(newDateObj, 'day');
    }

    default:
      throw new Error('날짜 계산에 올바른 기준값을 입력해주세요.');
  }
}

export function getStandardDayjsObj(standard: SearchStandard, dayjsObj: Dayjs) {
  const hangleToStandardMapper: Record<string, dayjs.UnitType> = {
    년도: 'year',
    월: 'month',
    일: 'day',
  };

  return getDateRange(dayjsObj, hangleToStandardMapper[standard]);
}
