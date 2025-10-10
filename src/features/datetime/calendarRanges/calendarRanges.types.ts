export type DateUTC = string;
export interface DateUTCParts {
  YYYY: number;
  MM: number;
  DD: number;
}

export interface DateUTCPartsWithDelta extends DateUTCParts {
  deltaValue: number;
  deltaPart: 'YYYY' | 'MM' | 'DD';
}
