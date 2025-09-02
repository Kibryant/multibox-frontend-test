export const formatCurrency = (amount: number, locale = 'pt-PT', currency = 'EUR') =>
  new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount)

