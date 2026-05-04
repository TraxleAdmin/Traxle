import { redirect } from 'next/navigation';
import { getMolatikPrivacyPath } from '@/lib/i18n';

export default function LegacyMolatikPrivacyRedirect() {
  redirect(getMolatikPrivacyPath('tr'));
}
