'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { TaskerWithLocationHistory } from '@/lib/types/database.types';

interface LocationMapProps {
  taskers: TaskerWithLocationHistory[];
}

export default function LocationMap({ taskers }: LocationMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current).setView([28.6139, 77.2090], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;
    setIsLoading(false);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || isLoading) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

    const startIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const allPoints: L.LatLngExpression[] = [];

    taskers.forEach((tasker, index) => {
      if (!tasker.locations || tasker.locations.length === 0) return;

      const color = colors[index % colors.length];
      const sortedLocations = [...tasker.locations].sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );

      // Draw trail line
      const latLngs: L.LatLngExpression[] = sortedLocations.map((loc) => [
        loc.latitude,
        loc.longitude,
      ]);

      const polyline = L.polyline(latLngs, {
        color: color,
        weight: 3,
        opacity: 0.7,
      }).addTo(mapRef.current!);

      markersRef.current.push(polyline as never);
      allPoints.push(...latLngs);

      // Add markers for each point
      sortedLocations.forEach((location, locIndex) => {
        const isStart = locIndex === 0;
        const isEnd = locIndex === sortedLocations.length - 1;

        // Small circle markers for trail points
        const circleMarker = L.circleMarker([location.latitude, location.longitude], {
          radius: isEnd ? 8 : 5,
          fillColor: color,
          color: isEnd ? '#ffffff' : color,
          weight: isEnd ? 2 : 1,
          opacity: 1,
          fillOpacity: isEnd ? 1 : 0.6,
        }).addTo(mapRef.current!);

        const popupContent = `
          <div style="min-width: 200px;">
            <h3 style="font-weight: bold; margin-bottom: 8px; color: ${color};">${tasker.name}</h3>
            <p style="margin-bottom: 4px;"><strong>Point:</strong> ${locIndex + 1} of ${sortedLocations.length}</p>
            <p style="margin-bottom: 4px;"><strong>Time:</strong> ${new Date(location.timestamp).toLocaleString()}</p>
            ${isStart ? '<p style="color: green; font-weight: bold;">START</p>' : ''}
            ${isEnd ? '<p style="color: red; font-weight: bold;">LATEST</p>' : ''}
          </div>
        `;

        circleMarker.bindPopup(popupContent);
        markersRef.current.push(circleMarker as never);
      });

      // Add start marker (larger)
      if (sortedLocations.length > 0) {
        const firstLoc = sortedLocations[0];
        const startMarker = L.marker([firstLoc.latitude, firstLoc.longitude], {
          icon: startIcon,
        }).addTo(mapRef.current!);

        startMarker.bindPopup(`
          <div>
            <h3 style="font-weight: bold; color: ${color};">${tasker.name}</h3>
            <p style="color: green; font-weight: bold;">START POINT</p>
            <p style="margin-top: 4px;"><strong>Time:</strong> ${new Date(firstLoc.timestamp).toLocaleString()}</p>
            <p><strong>Total Points:</strong> ${sortedLocations.length}</p>
            <p><strong>Leads:</strong> ${tasker.lead_count}</p>
          </div>
        `);

        markersRef.current.push(startMarker);
      }
    });

    if (allPoints.length > 0) {
      const bounds = L.latLngBounds(allPoints);
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [taskers, isLoading]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full rounded-lg" />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-gray-500">Loading map...</div>
        </div>
      )}
    </div>
  );
}