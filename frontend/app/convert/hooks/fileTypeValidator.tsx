export function fileTypeValidator(fileExtension: string) {
  if (fileExtension !== 'csv' && fileExtension !== 'xlsx') {
    return true;
  } else {
    return false;
  }
}
