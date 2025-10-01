'use client';

import { useEffect } from 'react';
import { LocationService } from '@/lib/services/location-service';

interface LocationTrackerProps {
  taskerId: string;
}

export default function LocationTracker({ taskerId }: LocationTrackerProps) {
  useEffect(() => {
    const locationService = new LocationService();

    const initTracking = async () => {
      try {
        await locationService.startTracking(taskerId);
        console.log('Location tracking started in background');
      } catch (err) {
        console.error('Failed to start location tracking:', err);
      }
    };

    initTracking();

    return () => {
      locationService.stopTracking();
    };
  }, [taskerId]);

  // Return null - no UI, just background tracking
  return null;
}