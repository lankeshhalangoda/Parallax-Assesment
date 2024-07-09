import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-4 sm:p-6 lg:p-8">
            <div className="w-full sm:max-w-md bg-white shadow-md overflow-hidden sm:rounded-lg flex flex-col items-center p-6">


                <div className="w-full mt-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
