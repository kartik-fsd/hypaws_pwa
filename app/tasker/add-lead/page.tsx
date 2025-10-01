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
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add New Lead</h1>
        <p className="text-gray-600 mt-2">Enter customer and pet information</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Customer Information</h2>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter customer name"
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="phoneNumber"
              type="tel"
              required
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+1234567890"
            />
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Pet Information</h2>

          <div>
            <label htmlFor="petType" className="block text-sm font-medium text-gray-700 mb-2">
              Pet Type <span className="text-red-500">*</span>
            </label>
            <select
              id="petType"
              required
              value={formData.petType}
              onChange={(e) => setFormData({ ...formData, petType: e.target.value as PetType })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="petName" className="block text-sm font-medium text-gray-700 mb-2">
                Pet Name
              </label>
              <input
                id="petName"
                type="text"
                value={formData.petName}
                onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter pet name"
              />
            </div>

            <div>
              <label htmlFor="petDob" className="block text-sm font-medium text-gray-700 mb-2">
                Pet Date of Birth
              </label>
              <input
                id="petDob"
                type="date"
                value={formData.petDob}
                onChange={(e) => setFormData({ ...formData, petDob: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="petBreed" className="block text-sm font-medium text-gray-700 mb-2">
              Pet Breed
            </label>
            <input
              id="petBreed"
              type="text"
              value={formData.petBreed}
              onChange={(e) => setFormData({ ...formData, petBreed: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter pet breed"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="petFood" className="block text-sm font-medium text-gray-700 mb-2">
                Pet Food
              </label>
              <input
                id="petFood"
                type="text"
                value={formData.petFood}
                onChange={(e) => setFormData({ ...formData, petFood: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter pet food"
              />
            </div>

            <div>
              <label htmlFor="petTreat" className="block text-sm font-medium text-gray-700 mb-2">
                Pet Treat
              </label>
              <input
                id="petTreat"
                type="text"
                value={formData.petTreat}
                onChange={(e) => setFormData({ ...formData, petTreat: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter pet treat"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Location Information</h2>

          <div>
            <label htmlFor="areaName" className="block text-sm font-medium text-gray-700 mb-2">
              Area Name
            </label>
            <input
              id="areaName"
              type="text"
              value={formData.areaName}
              onChange={(e) => setFormData({ ...formData, areaName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter area name"
            />
          </div>

          <div>
            <label htmlFor="nearbyLandmark" className="block text-sm font-medium text-gray-700 mb-2">
              Nearby Landmark
            </label>
            <input
              id="nearbyLandmark"
              type="text"
              value={formData.nearbyLandmark}
              onChange={(e) => setFormData({ ...formData, nearbyLandmark: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter nearby landmark"
            />
          </div>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div className="flex gap-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Save Lead'}
          </button>
        </div>
      </form>
    </div>
  );
}