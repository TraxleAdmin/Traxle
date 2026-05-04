import { redirect } from 'next/navigation';
import { withLocale } from '@/lib/i18n';

export default function BarkodXLegacyPage() {
  redirect(withLocale('tr', '/projects/barkodx'));
}
