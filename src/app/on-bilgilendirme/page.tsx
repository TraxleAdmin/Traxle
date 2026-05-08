import PreInfoFormContent from '@/components/legal/PreInfoFormContent';
import LegalShell from '@/components/legal/LegalShell';

export default function PreInfoFormPage() {
  return (
    <LegalShell eyebrow="Yasal ve bilgilendirme" title="Ön bilgilendirme formu">
      <PreInfoFormContent />
    </LegalShell>
  );
}
