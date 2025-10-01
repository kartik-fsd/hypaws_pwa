'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AuthService } from '@/lib/auth/auth-service';

interface AdminSidebarProps {
  userName: string;
}

export default function AdminSidebar({ userName }: AdminSidebarProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const authService = new AuthService();

  const handleLogout = async () => {
    await authService.signOut();
    router.push('/login');
  };

  const isActive = (path: string) => pathname === path;

  return (
    <div
      className={`${
        isMinimized ? 'w-20' : 'w-64'
      } bg-white border-r border-gray-200 flex flex-col transition-all duration-300`}
    >
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isMinimized && <h1 className="text-2xl font-bold text-gray-900">Hypaws</h1>}
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="p-2 hover:bg-gray-100 rounded-lg"
          aria-label={isMinimized ? 'Expand sidebar' : 'Minimize sidebar'}
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMinimized ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            )}
          </svg>
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link
          href="/admin"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive('/admin')
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          {!isMinimized && <span>Dashboard</span>}
        </Link>

        <Link
          href="/admin/leads"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive('/admin/leads')
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          {!isMinimized && <span>Leads</span>}
        </Link>

        <Link
          href="/admin/map"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive('/admin/map')
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          {!isMinimized && <span>Location Map</span>}
        </Link>

        <Link
          href="/admin/taskers"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive('/admin/taskers')
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          {!isMinimized && <span>Manage Taskers</span>}
        </Link>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className={`mb-3 ${isMinimized ? 'text-center' : ''}`}>
          {!isMinimized && (
            <>
              <p className="text-xs text-gray-500">Logged in as</p>
              <p className="text-sm font-medium text-gray-900">{userName}</p>
            </>
          )}
          {isMinimized && (
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-sm font-medium text-blue-700">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          {!isMinimized && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}