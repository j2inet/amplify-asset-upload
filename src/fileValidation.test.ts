import { describe, expect, it } from 'vitest';
import { isAllowedFile } from './fileValidation';

describe('isAllowedFile', () => {
  it('accepts Excel and CSV files', () => {
    for (const n of ['a.xlsx', 'a.XLS', 'b.csv', 'c.d.xlsm']) expect(isAllowedFile(n)).toBe(true);
  });
  it('rejects other files', () => {
    for (const n of ['a.txt', 'csv', 'a.csv.exe', '']) expect(isAllowedFile(n)).toBe(false);
  });
});
