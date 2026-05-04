import { redirect } from 'next/navigation';
import { withLocale } from '@/lib/i18n';

export default function MolatikLegacyPage() {
  redirect(withLocale('tr', '/projects/molatik'));
}
