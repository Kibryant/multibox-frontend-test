export const formatDate = (iso: string, locale = 'pt-PT') =>
  new Date(iso).toLocaleDateString(locale)
