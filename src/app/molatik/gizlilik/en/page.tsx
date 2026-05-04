import { redirect } from 'next/navigation';
import { getMolatikPrivacyPath } from '@/lib/i18n';

export default function LegacyMolatikEnglishPrivacyRedirect() {
  redirect(getMolatikPrivacyPath('en'));
}
