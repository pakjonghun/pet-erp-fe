import dayjs from 'dayjs';

export const getFirstPath = (pathname: string) => {
  const firstPath = pathname.match(/^\/([^\/]+)/)?.[1] ?? '';
  return firstPath;
};

export const getOriginPath = (pathname: string) => {
  return pathname.replace(/^\/|\/$/g, '');
};

export const getDateFormat = (date: Date) => {
  return dayjs(date).format('YYYY. MM. DD');
};

export const getKCWFormat = (number: number) => {
  return Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(number);
};

export const getNumberWithComma = (number: number) => {
  return Intl.NumberFormat('ko-KR').format(number);
};

const findSkip = (obj: any) => {
  for (const k in obj) {
    if (k === 'skip') {
      return obj[k] as number;
    }
    if (typeof obj[k] === 'object') {
      const result = findSkip(obj[k]) as number | null;
      if (result != null) return result;
    }
  }

  return null;
};

const baseMergeData = { totalCount: 0, data: [] };
export const merge = (existing = baseMergeData, incoming: any, { args }: any) => {
  const existingData = existing?.data as any[];
  const incomingData = (incoming?.data as any[]) ?? baseMergeData;
  const merged = existingData ? existingData.slice(0) : [];

  const skip = findSkip(args);
  if (skip == null) {
    return existing;
  }

  for (let i = 0; i < incomingData.length; ++i) {
    merged[skip + i] = incomingData[i];
  }

  const total = (incoming as any).total;
  const result = {
    totalCount: incoming?.totalCount,
    data: merged,
    total,
  };

  return result;
};

export const filterEmptyValues = (values: object) => {
  const parsedValues = Object.entries(values).filter(([k, v]) => {
    const result = typeof v == 'string' ? !!v.trim() : v != null;
    return result;
  });

  const newValues = Object.fromEntries(parsedValues);
  return newValues;
};

export const emptyValueToNull = (values: object) => {
  const parsedValues = Object.entries(values).map(([k, v]) => {
    const isFilled = typeof v == 'string' ? !!v.trim() : v != null;
    return [k, isFilled ? v : null];
  });

  const newValues = Object.fromEntries(parsedValues);
  return newValues;
};

export const isNumber = (value: unknown) => {
  const isNotNull = value !== null;
  const parseValue = Number(value);
  const isNan = isNaN(parseValue);
  const isNotInfinity = !isFinite(parseValue);
  return isNotNull && !isNan && !isNotInfinity;
};

export const removeTrailString = (str: string) => {
  if (!str) return '';
  return str.replace(/\([^)]*\)$/, '');
};
