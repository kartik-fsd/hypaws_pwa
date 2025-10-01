'use client';

import dynamic from 'next/dynamic';
import { TaskerWithLocationHistory } from '@/lib/types/database.types';

const LocationMap = dynamic(() => import('@/components/admin/LocationMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
});

interface MapPageClientProps {
  taskers: TaskerWithLocationHistory[];
}

export default function MapPageClient({ taskers }: MapPageClientProps) {
  return (
    <div className="p-8 h-screen flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Live Location Map</h1>
        <p className="text-gray-600 mt-2">
          Track tasker locations in real-time (refreshes every 30 minutes)
        </p>
      </div>

      <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <LocationMap taskers={taskers} />
      </div>

      <div className="mt-4 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Taskers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {taskers && taskers.length > 0 ? (
            taskers.map((tasker) => {
              const latestLocation = tasker.locations.length > 0
                ? tasker.locations.reduce((latest, loc) =>
                    new Date(loc.timestamp) > new Date(latest.timestamp) ? loc : latest
                  )
                : null;

              return (
                <div
                  key={tasker.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <h3 className="font-semibold text-gray-900">{tasker.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{tasker.phone_number}</p>
                  <p className="text-sm text-gray-600">Area: {tasker.assigned_area || 'N/A'}</p>
                  <p className="text-sm text-gray-600">Leads: {tasker.lead_count}</p>
                  <p className="text-sm font-medium text-blue-600 mt-2">
                    Trail Points: {tasker.locations.length}
                  </p>
                  {latestLocation ? (
                    <p className="text-xs text-gray-500 mt-2">
                      Last update: {new Date(latestLocation.timestamp).toLocaleString()}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500 mt-2">No location data</p>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 col-span-3">No taskers with location data</p>
          )}
        </div>
      </div>
    </div>
  );
}