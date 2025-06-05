'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Sidebar from '@/components/layout/Sidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        } else if (session?.user?.role !== 'ADMIN') {
            router.push('/');
        }
    }, [session, status, router]);

    if (status === 'loading') {
        return <div className="flex justify-center items-center min-h-screen">Chargement...</div>;
    }

    if (!session || session.user?.role !== 'ADMIN') {
        return null;
    }

    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <main className="flex-1 md:ml-56 mt-24 md:mt-16 p-4 md:p-8 w-full overflow-x-hidden">
                {children}
            </main>
        </div>
    );
} 