import { createServerSupabaseClient } from '@/lib/supabase/server';
import TaskerAccessForm from '@/components/admin/TaskerAccessForm';
import { User } from '@/lib/types/database.types';

export default async function AdminTaskersPage() {
  const supabase = await createServerSupabaseClient();

  const { data: taskers } = await supabase
    .from('users')
    .select('*')
    .eq('role', 'tasker')
    .order('created_at', { ascending: false })
    .returns<User[]>();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Taskers</h1>
        <p className="text-gray-600 mt-2">Add new taskers and view existing ones</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <TaskerAccessForm />
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Active Taskers</h2>
            <div className="space-y-4">
              {taskers && taskers.length > 0 ? (
                taskers.map((tasker) => (
                  <div
                    key={tasker.id}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{tasker.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{tasker.phone_number}</p>
                        {tasker.assigned_area && (
                          <p className="text-sm text-gray-600">Area: {tasker.assigned_area}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-2">
                          Added: {new Date(tasker.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded">
                        Active
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <p className="mt-4 text-sm text-gray-500">No taskers found</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Use the form to add your first tasker
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}