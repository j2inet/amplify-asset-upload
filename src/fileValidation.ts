export const ALLOWED_EXTENSIONS = ['.xls', '.xlsx', '.xlsm', '.xlsb', '.xlt', '.xltx', '.xltm', '.csv'];

export function isAllowedFile(name: string): boolean {
  const dot = name.lastIndexOf('.');
  if (dot < 0) return false;
  return ALLOWED_EXTENSIONS.includes(name.slice(dot).toLowerCase());
}
