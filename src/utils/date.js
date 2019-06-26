export const formatDate = date => {
  const splitDate = date.split('-', 3);
  splitDate[2] = splitDate[2].split('T', 1)[0]; // split 08T00
  
  const year = splitDate[0];
  const month = splitDate[1].replace(/^0+/, ''); // trim leading 0
  const day = splitDate[2].replace(/^0+/, '');

  const formattedDate = `${month}/${day}/${year}`;

  return formattedDate
}