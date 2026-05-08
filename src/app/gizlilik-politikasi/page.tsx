import PrivacyPolicyContent from '@/components/legal/PrivacyPolicyContent';
import LegalShell from '@/components/legal/LegalShell';

export default function PrivacyPolicyPage() {
  return (
    <LegalShell eyebrow="Yasal ve güvenlik" title="Gizlilik ve veri güvenliği">
      <PrivacyPolicyContent />
    </LegalShell>
  );
}
