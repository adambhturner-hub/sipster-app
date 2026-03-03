'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminRoute({ children }: { children: React.ReactNode }) {
    const { user, loading, isAdmin, docLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !docLoading && isAdmin === false) {
            // Kick them out if explicitly NOT an admin (after load)
            router.replace('/menu');
        }
    }, [loading, isAdmin, router, docLoading]);

    // Show nothing while evaluating (null means it hasn't resolved either way yet)
    if (loading || docLoading || isAdmin === null || isAdmin === false) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
            </div>
        );
    }

    return <>{children}</>;
}
