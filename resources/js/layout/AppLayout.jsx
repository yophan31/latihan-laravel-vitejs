import React from "react";
import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";

export default function AppLayout({ children }) {
    const onLogout = () => {
        router.get("/auth/logout");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            <nav className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white shadow-lg sticky top-0 z-40 backdrop-blur-lg">
                <div className="container mx-auto px-4">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center space-x-8">
                            <Link href="/" className="text-xl font-bold hover:text-blue-100 transition flex items-center gap-2">
                                <span className="text-2xl">🎯</span>
                                <span>DelTodos</span>
                            </Link>
                            <Link 
                                href="/todos" 
                                className="hover:text-blue-100 transition font-medium px-4 py-2 rounded-lg hover:bg-white/10"
                            >
                                📝 Todos
                            </Link>
                        </div>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={onLogout} 
                            className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white backdrop-blur-sm"
                        >
                            🚪 Logout
                        </Button>
                    </div>
                </div>
            </nav>

            <main>{children}</main>

            <footer className="border-t bg-gradient-to-r from-slate-50 to-blue-50 py-8 mt-12">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-slate-600 font-medium">
                        D. Yophanci P.Sihombing <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-bold"></span>
                    </p>
                    <p className="text-slate-500 text-sm mt-1">&copy; 2025 All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}