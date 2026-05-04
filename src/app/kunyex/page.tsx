import { redirect } from 'next/navigation';
import { withLocale } from '@/lib/i18n';

export default function KunyexLegacyPage() {
  redirect(withLocale('tr', '/projects/kunyex'));
}
