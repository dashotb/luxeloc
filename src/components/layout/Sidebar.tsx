'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Car, Settings, LogOut, LayoutDashboard, Calendar } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function Sidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path;
    };

    const menuItems = [
        { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { href: '/dashboard/vehicules', icon: Car, label: 'Véhicules' },
        { href: '/dashboard/reservations', icon: Calendar, label: 'Réservations' },
        { href: '/dashboard/parametres', icon: Settings, label: 'Paramètres' },
    ];

    return (
        <div className="hidden md:block h-screen w-56 bg-white border-r border-gray-200 flex flex-col fixed mt-16 z-[60]">
            <div className="p-4">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                            isActive(item.href)
                                ? 'bg-black text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                    </Link>
                ))}
            </div>

            <div className="p-4 border-t border-gray-200 mt-auto mb-16">
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Se déconnecter
                </button>
            </div>
        </div>
    );
} 