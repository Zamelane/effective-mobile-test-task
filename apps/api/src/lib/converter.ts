export function converter(value: string|number, to: 'number'): number;
export function converter(value: string|number, to: 'string'): string;
export function converter(value: string|number, to: 'string'|'number') {
  const isString = typeof value === 'string';
  if (to === 'string') {
    return isString ? value : String(value);
  } else {
    return isString ? Number.parseInt(value) : value;
  }
}