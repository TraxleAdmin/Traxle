import CookiePolicyContent from '@/components/legal/CookiePolicyContent';
import LegalShell from '@/components/legal/LegalShell';

export default function CookiePolicyPage() {
  return (
    <LegalShell eyebrow="Yasal ve çerezler" title="Çerez politikası">
      <CookiePolicyContent />
    </LegalShell>
  );
}
