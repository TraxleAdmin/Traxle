import { redirect } from 'next/navigation';
import { withLocale } from '@/lib/i18n';

export default function HakkimizdaRedirect() {
  redirect(withLocale('tr', '/about'));
}
