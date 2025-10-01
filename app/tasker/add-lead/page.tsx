'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { PetType } from '@/lib/types/database.types';

export default function AddLeadPage() {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    petType: 'Dog' as PetType,
    petName: '',
    petDob: '',
    petBreed: '',
    petFood: '',
    petTreat: '',
    areaName: '',
    nearbyLandmark: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setError('You must be logged in to add a lead');
        setLoading(false);
        return;
      }

      const { error: insertError } = await supabase.from('leads').insert({
        name: formData.name,
        phone_number: formData.phoneNumber,
        pet_type: formData.petType,
        pet_name: formData.petName || null,
        pet_dob: formData.petDob || null,
        pet_breed: formData.petBreed || null,
        pet_food: formData.petFood || null,
        pet_treat: formData.petTreat || null,
        area_name: formData.areaName || null,
        nearby_landmark: formData.nearbyLandmark || null,
        tasker_id: user.id,
      });

      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }

      router.push('/tasker');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900">Create New Lead</h1>
              <p className="text-base text-slate-600 mt-2">Add customer and pet details to your pipeline</p>
            </div>
          </div>
        </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Customer Information Section */}
        <div className="p-8 space-y-6 border-b border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-slate-100 rounded-xl">
              <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900">Customer Information</h2>
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3.5 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-semibold text-slate-700 mb-2">
                Phone Number <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <input
                  id="phoneNumber"
                  type="tel"
                  required
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pet Information Section */}
        <div className="p-8 space-y-6 border-b border-slate-200 bg-slate-50/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-white rounded-xl border border-slate-200">
              <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900">Pet Information</h2>
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="petType" className="block text-sm font-semibold text-slate-700 mb-2">
                Pet Type <span className="text-red-600">*</span>
              </label>
              <select
                id="petType"
                required
                value={formData.petType}
                onChange={(e) => setFormData({ ...formData, petType: e.target.value as PetType })}
                className="w-full px-4 py-3.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
              >
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="petName" className="block text-sm font-semibold text-slate-700 mb-2">
                  Pet Name
                </label>
                <input
                  id="petName"
                  type="text"
                  value={formData.petName}
                  onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                  placeholder="e.g., Max"
                />
              </div>

              <div>
                <label htmlFor="petDob" className="block text-sm font-semibold text-slate-700 mb-2">
                  Date of Birth
                </label>
                <input
                  id="petDob"
                  type="date"
                  value={formData.petDob}
                  onChange={(e) => setFormData({ ...formData, petDob: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="petBreed" className="block text-sm font-semibold text-slate-700 mb-2">
                Breed
              </label>
              <input
                id="petBreed"
                type="text"
                value={formData.petBreed}
                onChange={(e) => setFormData({ ...formData, petBreed: e.target.value })}
                className="w-full px-4 py-3.5 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                placeholder="e.g., Golden Retriever"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="petFood" className="block text-sm font-semibold text-slate-700 mb-2">
                  Preferred Food
                </label>
                <input
                  id="petFood"
                  type="text"
                  value={formData.petFood}
                  onChange={(e) => setFormData({ ...formData, petFood: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                  placeholder="e.g., Royal Canin"
                />
              </div>

              <div>
                <label htmlFor="petTreat" className="block text-sm font-semibold text-slate-700 mb-2">
                  Favorite Treat
                </label>
                <input
                  id="petTreat"
                  type="text"
                  value={formData.petTreat}
                  onChange={(e) => setFormData({ ...formData, petTreat: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                  placeholder="e.g., Chicken strips"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Location Information Section */}
        <div className="p-8 space-y-6 border-b border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-slate-100 rounded-xl">
              <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900">Location Details</h2>
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="areaName" className="block text-sm font-semibold text-slate-700 mb-2">
                Area / Neighborhood
              </label>
              <input
                id="areaName"
                type="text"
                value={formData.areaName}
                onChange={(e) => setFormData({ ...formData, areaName: e.target.value })}
                className="w-full px-4 py-3.5 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                placeholder="e.g., Downtown, Suburb Area"
              />
            </div>

            <div>
              <label htmlFor="nearbyLandmark" className="block text-sm font-semibold text-slate-700 mb-2">
                Nearby Landmark
              </label>
              <input
                id="nearbyLandmark"
                type="text"
                value={formData.nearbyLandmark}
                onChange={(e) => setFormData({ ...formData, nearbyLandmark: e.target.value })}
                className="w-full px-4 py-3.5 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                placeholder="e.g., Near Central Park"
              />
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-8 mt-6 rounded-xl bg-red-50 border border-red-200 p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="p-8 bg-slate-50/50">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 py-3.5 px-6 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-white hover:border-slate-400 active:bg-slate-50 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3.5 px-6 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 active:bg-slate-950 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving Lead...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Lead
                </span>
              )}
            </button>
          </div>
        </div>
      </form>
      </div>
    </div>
  );
}