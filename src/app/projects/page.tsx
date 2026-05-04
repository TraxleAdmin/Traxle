import { redirect } from 'next/navigation';
import { withLocale } from '@/lib/i18n';

export default function ProjectsRedirect() {
  redirect(withLocale('tr', '/projects'));
}
