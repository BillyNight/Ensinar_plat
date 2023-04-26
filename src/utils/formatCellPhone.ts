export function formatPhone(value) {
  if (!value) return ''

  value = value.replace(/\D/g, '');

  if (value.length <= 10) { // 8 digits phone number
    value = value.replace(/(\d{2})(\d)/, '($1) $2');
    value = value.replace(/(\d{4})(\d)/, '$1-$2');
    value = value.replace(/(\d{4})/, '$1');
  } else { // 9 digits phone number
    value = value.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/g, '($1) $2 $3-$4');
  }

  return value.slice(0, 16);
}


