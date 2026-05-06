import { redirect } from 'next/navigation';
import { getBarkodXPrivacyPath } from '@/lib/i18n';

export default function LegacyBarkodXEnglishPrivacyRedirect() {
  redirect(getBarkodXPrivacyPath('en'));
}
