import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import Link from 'next/link';
import LocationTracker from '@/components/tasker/LocationTracker';
import { User } from '@/lib/types/database.types';

async function TaskerNavbar({ userName }: { userName: string }) {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hypaws</h1>
          <p className="text-sm text-gray-600">Welcome, {userName}</p>
        </div>
        <Link
          href="/login"
          className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
        >
          Logout
        </Link>
      </div>
    </nav>
  );
}

export default async function TaskerLayout({
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

  if (!user || user.role !== 'tasker') {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TaskerNavbar userName={user.name} />
      <main>{children}</main>
      <LocationTracker taskerId={authUser.id} />
    </div>
  );
}