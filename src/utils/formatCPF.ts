export function formatCPF(value: string) {
  if (!value) return ''

  value = value.replace(/\D/g, '');

  if (value.length <= 11) { // CPF formatting
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})/, '$1-$2');
  }

  return value;
}