import { createServerSupabaseClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function TaskerDashboardPage() {
  const supabase = await createServerSupabaseClient();

  const { data: { user: authUser } } = await supabase.auth.getUser();

  if (!authUser) {
    return null;
  }

  const { data: leads } = await supabase
    .from('leads')
    .select('*')
    .eq('tasker_id', authUser.id)
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Leads</h1>
          <p className="text-gray-600 mt-2">Manage your customer leads</p>
        </div>
        <Link
          href="/tasker/add-lead"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add New Lead
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leads && leads.length > 0 ? (
          leads.map((lead) => (
            <div
              key={lead.id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{lead.name}</h3>
                  <p className="text-sm text-gray-600">{lead.phone_number}</p>
                </div>
                {lead.pet_type && (
                  <span className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded">
                    {lead.pet_type}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                {lead.pet_name && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      />
                    </svg>
                    <span>Pet: {lead.pet_name}</span>
                  </div>
                )}
                {lead.area_name && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>Area: {lead.area_name}</span>
                  </div>
                )}
                {lead.pet_breed && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium">Breed:</span>
                    <span>{lead.pet_breed}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Added: {new Date(lead.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3">
            <div className="bg-white p-12 rounded-lg shadow-sm border border-gray-200 text-center">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No leads yet</h3>
              <p className="mt-2 text-sm text-gray-500">
                Get started by adding your first lead
              </p>
              <Link
                href="/tasker/add-lead"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Your First Lead
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}