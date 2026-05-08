import TermsOfServiceContent from '@/components/legal/TermsOfServiceContent';
import LegalShell from '@/components/legal/LegalShell';

export default function TermsOfServicePage() {
  return (
    <LegalShell eyebrow="Yasal ve kurallar" title="Kullanım koşulları">
      <TermsOfServiceContent />
    </LegalShell>
  );
}
