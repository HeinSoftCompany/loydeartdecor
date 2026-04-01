const ALLOWED_HOSTS = ['checkout.exemplo-yampi.com.br', 'exemplo-yampi.com.br'];

export function isAllowedExternalUrl(url) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === 'https:' && ALLOWED_HOSTS.includes(parsedUrl.hostname);
  } catch {
    return false;
  }
}
