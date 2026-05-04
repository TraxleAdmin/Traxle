import { redirect } from 'next/navigation';
import { withLocale } from '@/lib/i18n';

export default async function ProjectRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(withLocale('tr', `/projects/${slug}`));
}
