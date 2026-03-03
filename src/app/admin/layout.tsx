'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AdminRoute from '@/components/AdminRoute';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <AdminRoute>
            <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)] w-full">
                {/* Admin Sidebar Navigation */}
                <aside className="w-full md:w-64 bg-black/40 border-r border-white/10 p-6 flex flex-col gap-2 shrink-0">
                    <h2 className="text-xl font-bold tracking-widest uppercase text-gray-400 mb-6">Sipster Admin</h2>

                    <Link
                        href="/admin"
                        className={`px-4 py-3 rounded-xl font-bold transition-all flex items-center gap-3 ${pathname === '/admin' ? 'bg-[var(--primary)] text-white shadow-[0_0_15px_var(--primary-glow)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <span>📊</span> Dashboard
                    </Link>

                    <Link
                        href="/admin/catalog"
                        className={`px-4 py-3 rounded-xl font-bold transition-all flex items-center gap-3 ${pathname === '/admin/catalog' || pathname.startsWith('/admin/catalog/') ? 'bg-[var(--primary)] text-white shadow-[0_0_15px_var(--primary-glow)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <span>📚</span> Master Catalog
                    </Link>

                    <Link
                        href="/admin/community"
                        className={`px-4 py-3 rounded-xl font-bold transition-all flex items-center gap-3 ${pathname.includes('/admin/community') ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <span>🌍</span> Community Drinks
                    </Link>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 p-6 md:p-10">
                    {children}
                </main>
            </div>
        </AdminRoute>
    );
}
