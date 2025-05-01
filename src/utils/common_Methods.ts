export const ValidatingInteger = (
  e: React.ChangeEvent<HTMLInputElement>,
  field: string
) => {
  const fields = [
    'quantity',
    'IFSC_code',
    'price',
    'AccountNo',
    'ContactNo',
    'ewaybillno',
    'hsnCode',
    'pincode',
    'phoneNo',
  ];
  if (fields.includes(field)) {
    e.target.value = e.target.value.replace(/[^0-9.]/g, '');
  }
};
