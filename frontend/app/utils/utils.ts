import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const gettingAbbr = (company: any) => {
  switch (company) {
    case 'TenneT DE':
      return 'TTG';
    case 'TransnetBW':
      return 'TNG';
    case 'Amprion':
      return 'AMP';
    case '50Hertz':
      return '50Hertz';
    case 'HOPS':
      return 'HOPS';
    case 'TRANSELECTRICA':
      return 'TRANSELECTRICA';
    case 'helloElectrica':
      return 'HL';
    case 'SEPS':
      return 'SEPS';
    case 'Elia':
      return 'ELIA';
    case 'APG':
      return 'APG';
    case 'PSE':
      return 'PSE';

    default:
      break;
  }
};

export const gettingAbbrReverse = (company: any) => {
  switch (company) {
    case 'TTG':
      return 'TenneT DE';
    case 'TNG':
      return 'TransnetBW';
    case 'AMP':
      return 'Amprion';
    case '50Hertz':
      return '50Hertz';
    case 'HOPS':
      return 'HOPS';
    case 'TRANSELECTRICA':
      return 'TRANSELECTRICA';
    case 'HL':
      return 'helloElectrica';
    case 'SEPS':
      return 'SEPS';
    case 'ELIA':
      return 'Elia';
    case 'APG':
      return 'APG';
    case 'PSE':
      return 'PSE';

    default:
      break;
  }
};
