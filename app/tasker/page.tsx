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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">
                Lead Management
              </h1>
              <p className="text-base text-slate-600">
                Track and manage your customer pipeline
              </p>
            </div>
            <Link
              href="/tasker/add-lead"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 active:bg-slate-950 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span>New Lead</span>
            </Link>
          </div>
        </div>

        {/* Stats Bar */}
        {leads && leads.length > 0 && (
          <div className="mb-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-slate-100 rounded-xl">
                <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Total Leads</p>
                <p className="text-2xl font-bold text-slate-900">{leads.length}</p>
              </div>
            </div>
          </div>
        )}

        {/* Leads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leads && leads.length > 0 ? (
            leads.map((lead) => (
              <div
                key={lead.id}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition-all duration-300 overflow-hidden hover:shadow-lg"
              >
                {/* Card Header */}
                <div className="p-6 pb-5 border-b border-slate-100">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-slate-900 truncate mb-1">
                        {lead.name}
                      </h3>
                      <a
                        href={`tel:${lead.phone_number}`}
                        className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {lead.phone_number}
                      </a>
                    </div>
                    {lead.pet_type && (
                      <span className="ml-2 px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 rounded-lg uppercase tracking-wide">
                        {lead.pet_type}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 pt-5 space-y-3">
                  {lead.pet_name && (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex-shrink-0 w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Pet Name</p>
                        <p className="text-sm font-semibold text-slate-900 truncate">{lead.pet_name}</p>
                      </div>
                    </div>
                  )}

                  {lead.pet_breed && (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex-shrink-0 w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Breed</p>
                        <p className="text-sm font-semibold text-slate-900 truncate">{lead.pet_breed}</p>
                      </div>
                    </div>
                  )}

                  {lead.area_name && (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex-shrink-0 w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Location</p>
                        <p className="text-sm font-semibold text-slate-900 truncate">{lead.area_name}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500">
                      Added {new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-12 lg:p-16 text-center">
                <div className="max-w-sm mx-auto">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">No leads yet</h3>
                  <p className="text-base text-slate-600 mb-8">
                    Start building your customer pipeline by adding your first lead
                  </p>
                  <Link
                    href="/tasker/add-lead"
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 active:bg-slate-950 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add Your First Lead</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}