import React from "react";
import AppLayout from "@/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { usePage, router } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    CheckSquare,
    List,
    TrendingUp,
    Zap,
    Sparkles,
    Target,
} from "lucide-react";

export default function HomePage() {
    const { auth } = usePage().props;

    return (
        <AppLayout>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50">
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom duration-700">
                            <div className="inline-block mb-6">
                                <div className="text-6xl mb-4 animate-bounce">
                                    👋
                                </div>
                            </div>
                            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                                Selamat Datang, {auth.name}!
                            </h1>
                            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                                Kelola semua aktivitas Anda dengan mudah dan
                                efisien. Mulai produktivitas Anda hari ini! ✨
                            </p>
                            <Button
                                onClick={() => router.get("/todos")}
                                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:via-indigo-700 hover:to-violet-700 text-white text-lg px-10 py-7 rounded-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105"
                            >
                                <CheckSquare className="w-6 h-6 mr-3" />
                                Kelola Todos Saya
                            </Button>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white hover:scale-105 transition-all duration-300 group">
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition">
                                            <List className="w-8 h-8" />
                                        </div>
                                        <CardTitle className="text-xl">
                                            Mudah Digunakan
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-blue-50 leading-relaxed">
                                        Interface yang intuitif membuat
                                        pengelolaan todos menjadi menyenangkan
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white hover:scale-105 transition-all duration-300 group">
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition">
                                            <TrendingUp className="w-8 h-8" />
                                        </div>
                                        <CardTitle className="text-xl">
                                            Statistik Real-time
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-indigo-50 leading-relaxed">
                                        Pantau progress aktivitas Anda dengan
                                        visualisasi data yang menarik
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white hover:scale-105 transition-all duration-300 group">
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition">
                                            <Zap className="w-8 h-8" />
                                        </div>
                                        <CardTitle className="text-xl">
                                            Cepat & Responsif
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-violet-50 leading-relaxed">
                                        Performa tinggi dengan teknologi modern
                                        Laravel + React
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="shadow-2xl border-0 overflow-hidden">
                            <CardHeader className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white p-8">
                                <div className="flex items-center gap-3">
                                    <Sparkles className="w-8 h-8" />
                                    <CardTitle className="text-3xl">
                                        Fitur Lengkap & Powerful
                                    </CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-8 bg-gradient-to-br from-white to-blue-50">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="flex items-start gap-4 group">
                                        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-xl group-hover:scale-110 transition shadow-lg">
                                            <CheckSquare className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-2 text-slate-800">
                                                CRUD Lengkap
                                            </h4>
                                            <p className="text-slate-600 leading-relaxed">
                                                Tambah, edit, hapus todos dengan
                                                mudah dan cepat
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 group">
                                        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl group-hover:scale-110 transition shadow-lg">
                                            <List className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-2 text-slate-800">
                                                Filter & Pencarian
                                            </h4>
                                            <p className="text-slate-600 leading-relaxed">
                                                Temukan todos dengan sistem
                                                pencarian yang canggih
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 group">
                                        <div className="bg-gradient-to-br from-violet-500 to-purple-600 p-3 rounded-xl group-hover:scale-110 transition shadow-lg">
                                            <TrendingUp className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-2 text-slate-800">
                                                Statistik Visual
                                            </h4>
                                            <p className="text-slate-600 leading-relaxed">
                                                Chart interaktif dengan
                                                ApexCharts yang indah
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 group">
                                        <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-xl group-hover:scale-110 transition shadow-lg">
                                            <Target className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-2 text-slate-800">
                                                Drag & Drop
                                            </h4>
                                            <p className="text-slate-600 leading-relaxed">
                                                Susun ulang todos dengan drag
                                                and drop yang smooth
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
