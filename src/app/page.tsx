import { redirect } from 'next/navigation';
import { defaultLocale } from '@/dictionaries';

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
