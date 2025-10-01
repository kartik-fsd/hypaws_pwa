import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { User } from '@/lib/types/database.types';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();

  const { data: { user: authUser } } = await supabase.auth.getUser();

  if (!authUser) {
    redirect('/login');
  }

  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('id', authUser.id)
    .single<User>();

  if (!user || user.role !== 'admin') {
    redirect('/login');
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar userName={user.name} />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}