import { createClient } from '@/lib/supabase/client';

export class LocationService {
  private supabase = createClient();
  private intervalId: NodeJS.Timeout | null = null;
  private readonly TRACKING_INTERVAL = 30 * 60 * 1000; // 30 minutes in milliseconds

  async getCurrentPosition(): Promise<{
    latitude: number;
    longitude: number;
    accuracy: number;
  } | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        console.error('Geolocation is not supported by this browser');
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  }

  async sendLocation(taskerId: string): Promise<{ success: boolean; error: string | null }> {
    try {
      const position = await this.getCurrentPosition();

      if (!position) {
        return { success: false, error: 'Unable to get current location' };
      }

      const { error } = await this.supabase.from('locations').insert({
        tasker_id: taskerId,
        latitude: position.latitude,
        longitude: position.longitude,
        accuracy: position.accuracy,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      console.log('Location sent successfully:', position);
      return { success: true, error: null };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Unknown error occurred',
      };
    }
  }

  async startTracking(taskerId: string): Promise<void> {
    if (this.intervalId) {
      console.log('Location tracking is already running');
      return;
    }

    await this.sendLocation(taskerId);

    this.intervalId = setInterval(async () => {
      await this.sendLocation(taskerId);
    }, this.TRACKING_INTERVAL);

    console.log('Location tracking started (30-minute intervals)');
  }

  stopTracking(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('Location tracking stopped');
    }
  }

  isTracking(): boolean {
    return this.intervalId !== null;
  }
}