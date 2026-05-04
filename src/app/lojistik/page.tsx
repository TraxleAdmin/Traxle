import { redirect } from 'next/navigation';
import { withLocale } from '@/lib/i18n';

export default function LojistikLegacyPage() {
  redirect(withLocale('tr', '/projects/lojistik'));
}
