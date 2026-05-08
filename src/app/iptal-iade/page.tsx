import RefundPolicyContent from '@/components/legal/RefundPolicyContent';
import LegalShell from '@/components/legal/LegalShell';

export default function IptalIadePage() {
  return (
    <LegalShell eyebrow="Yasal ve politika" title="İptal ve iade politikası">
      <RefundPolicyContent />
    </LegalShell>
  );
}
