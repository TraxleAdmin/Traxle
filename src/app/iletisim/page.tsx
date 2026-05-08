import { redirect } from 'next/navigation';
import { withLocale } from '@/lib/i18n';

export default function IletisimRedirect() {
  redirect(withLocale('tr', '/contact'));
}
