import { createServerSupabaseClient } from '@/lib/supabase/server';
import MapPageClient from '@/components/admin/MapPageClient';
import { TaskerWithLocationHistory } from '@/lib/types/database.types';

export default async function AdminMapPage() {
  const supabase = await createServerSupabaseClient();

  // Get all taskers
  const { data: taskers } = await supabase
    .from('users')
    .select('*')
    .eq('role', 'tasker')
    .order('name', { ascending: true });

  // Get all locations for each tasker
  const taskersWithHistory: TaskerWithLocationHistory[] = await Promise.all(
    (taskers || []).map(async (tasker) => {
      const { data: locations } = await supabase
        .from('locations')
        .select('*')
        .eq('tasker_id', tasker.id)
        .order('timestamp', { ascending: true });

      const { count: leadCount } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .eq('tasker_id', tasker.id);

      return {
        ...tasker,
        locations: locations || [],
        lead_count: leadCount || 0,
      };
    })
  );

  // Filter out taskers with no location history
  const taskersWithLocations = taskersWithHistory.filter(
    (tasker) => tasker.locations.length > 0
  );

  return <MapPageClient taskers={taskersWithLocations} />;
}