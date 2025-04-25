export function isNewProduct(dateInsertStr: Date) {
  const dateInsert = new Date(dateInsertStr).getTime();
  const newDate = new Date().getTime();
  const deferenceMillisecond = Math.abs(newDate - dateInsert);

  const days = Math.floor(deferenceMillisecond / (1000 * 60 * 60 * 24));

  return days <= 15 ? true : false;
}
