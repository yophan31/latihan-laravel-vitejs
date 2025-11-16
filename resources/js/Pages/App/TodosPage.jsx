import React, { useState, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Trash2, Edit, CheckCircle, XCircle, Image, GripVertical } from "lucide-react";
import Swal from "sweetalert2";
import Chart from "react-apexcharts";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableTodoCard({ todo, onToggle, onEdit, onDelete, onUpdateCover }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: todo.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style}>
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                {todo.cover && (
                    <div className="relative overflow-hidden">
                        <img
                            src={`/storage/${todo.cover}`}
                            alt={todo.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2">
                            <Badge className={todo.is_finished ? "bg-gradient-to-r from-emerald-500 to-teal-500" : "bg-gradient-to-r from-amber-500 to-orange-500"}>
                                {todo.is_finished ? "✓ Selesai" : "⏳ Proses"}
                            </Badge>
                        </div>
                    </div>
                )}
                <CardContent className="pt-6">
                    <div className="flex items-start gap-3 mb-3">
                        <div
                            {...attributes}
                            {...listeners}
                            className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-blue-500 transition mt-1"
                        >
                            <GripVertical className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-lg text-slate-800 mb-1">{todo.title}</h3>
                            {!todo.cover && (
                                <Badge className={todo.is_finished ? "bg-gradient-to-r from-emerald-500 to-teal-500 mb-2" : "bg-gradient-to-r from-amber-500 to-orange-500 mb-2"}>
                                    {todo.is_finished ? "✓ Selesai" : "⏳ Proses"}
                                </Badge>
                            )}
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {todo.description || "Tidak ada deskripsi"}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                        <Button
                            size="sm"
                            onClick={() => onToggle(todo.id)}
                            className={`flex-1 ${todo.is_finished 
                                ? "bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700" 
                                : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"}`}
                        >
                            {todo.is_finished ? <XCircle className="w-4 h-4 mr-1" /> : <CheckCircle className="w-4 h-4 mr-1" />}
                            {todo.is_finished ? "Batal" : "Selesai"}
                        </Button>
                        <Button
                            size="sm"
                            onClick={() => onEdit(todo)}
                            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                        >
                            <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                            size="sm" 
                            onClick={() => document.getElementById(`cover-${todo.id}`).click()}
                            className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600"
                        >
                            <Image className="w-4 h-4" />
                        </Button>
                        <input
                            id={`cover-${todo.id}`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => onUpdateCover(todo.id, e.target.files[0])}
                        />
                        <Button 
                            size="sm" 
                            onClick={() => onDelete(todo.id)}
                            className="bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default function TodosPage() {
    const { auth, todos, stats, filters, flash } = usePage().props;
    const [searchQuery, setSearchQuery] = useState(filters.search || "");
    const [filterStatus, setFilterStatus] = useState(filters.filter || "all");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(null);
    const [formData, setFormData] = useState({ title: "", description: "", cover: null });
    const [todoItems, setTodoItems] = useState(todos.data || []);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        setTodoItems(todos.data || []);
    }, [todos.data]);

    useEffect(() => {
        if (flash?.success) {
            Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: flash.success,
                confirmButtonColor: "#3b82f6",
                timer: 2500,
                timerProgressBar: true,
            });
        }
    }, [flash]);

    const chartOptions = {
        chart: { 
            type: "donut", 
            toolbar: { show: false },
            fontFamily: 'inherit',
        },
        labels: ["Selesai", "Belum Selesai"],
        colors: ["#10b981", "#3b82f6"],
        legend: { 
            position: "bottom",
            fontSize: '14px',
            fontWeight: 500,
        },
        plotOptions: {
            pie: {
                donut: {
                    size: "70%",
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: "Total Todos",
                            fontSize: '16px',
                            fontWeight: 600,
                            color: '#1e293b',
                            formatter: () => stats.total,
                        },
                    },
                },
            },
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '14px',
                fontWeight: 600,
            },
        },
    };

    const chartSeries = [stats.finished, stats.unfinished];

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setTodoItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleSearch = () => {
        router.get("/todos", { search: searchQuery, filter: filterStatus }, { preserveState: true });
    };

    const handleFilter = (status) => {
        setFilterStatus(status);
        router.get("/todos", { search: searchQuery, filter: status }, { preserveState: true });
    };

    const handleAddTodo = () => {
        if (!formData.title) {
            Swal.fire({ icon: "error", title: "Gagal!", text: "Judul harus diisi!", confirmButtonColor: "#ef4444" });
            return;
        }

        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        if (formData.cover) data.append("cover", formData.cover);

        router.post("/todos", data, {
            onSuccess: () => {
                setShowAddModal(false);
                setFormData({ title: "", description: "", cover: null });
            },
        });
    };

    const handleEditTodo = () => {
        if (!formData.title) {
            Swal.fire({ icon: "error", title: "Gagal!", text: "Judul harus diisi!", confirmButtonColor: "#ef4444" });
            return;
        }

        router.put(`/todos/${currentTodo.id}`, formData, {
            onSuccess: () => {
                setShowEditModal(false);
                setCurrentTodo(null);
                setFormData({ title: "", description: "", cover: null });
            },
        });
    };

    const handleDeleteTodo = (id) => {
        Swal.fire({
            title: "Hapus Todo?",
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/todos/${id}`);
            }
        });
    };

    const handleToggleFinish = (id) => {
        router.patch(`/todos/${id}/toggle`);
    };

    const handleUpdateCover = (id, file) => {
        const data = new FormData();
        data.append("cover", file);
        router.post(`/todos/${id}/cover`, data);
    };

    return (
        <AppLayout>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100 py-8">
                <div className="container mx-auto px-4">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                            📝 Todos Saya
                        </h1>
                        <p className="text-slate-600 mt-2">Kelola aktivitas Anda dengan mudah, {auth.name}!</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card className="border-0 bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl hover:shadow-2xl transition-all">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium opacity-90">Total Todos</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-5xl font-bold">{stats.total}</div>
                            </CardContent>
                        </Card>
                        <Card className="border-0 bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl hover:shadow-2xl transition-all">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium opacity-90">Selesai</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-5xl font-bold">{stats.finished}</div>
                            </CardContent>
                        </Card>
                        <Card className="border-0 bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-xl hover:shadow-2xl transition-all">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium opacity-90">Belum Selesai</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-5xl font-bold">{stats.unfinished}</div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mb-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                        <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-blue-50">
                            <CardTitle className="text-slate-800">📊 Statistik Todos</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <Chart options={chartOptions} series={chartSeries} type="donut" height={320} />
                        </CardContent>
                    </Card>

                    <Card className="mb-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                        <CardContent className="pt-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 flex gap-2">
                                    <Input
                                        placeholder="🔍 Cari todos..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                                        className="border-slate-300 focus:border-blue-500"
                                    />
                                    <Button onClick={handleSearch} className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                                        <Search className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant={filterStatus === "all" ? "default" : "outline"}
                                        onClick={() => handleFilter("all")}
                                        className={filterStatus === "all" ? "bg-gradient-to-r from-blue-500 to-indigo-600" : ""}
                                    >
                                        Semua
                                    </Button>
                                    <Button
                                        variant={filterStatus === "finished" ? "default" : "outline"}
                                        onClick={() => handleFilter("finished")}
                                        className={filterStatus === "finished" ? "bg-gradient-to-r from-emerald-500 to-teal-600" : ""}
                                    >
                                        Selesai
                                    </Button>
                                    <Button
                                        variant={filterStatus === "unfinished" ? "default" : "outline"}
                                        onClick={() => handleFilter("unfinished")}
                                        className={filterStatus === "unfinished" ? "bg-gradient-to-r from-amber-500 to-orange-600" : ""}
                                    >
                                        Belum
                                    </Button>
                                </div>
                                <Button onClick={() => setShowAddModal(true)} className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
                                    <Plus className="w-4 h-4 mr-2" /> Tambah Todo
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={todoItems.map(t => t.id)} strategy={verticalListSortingStrategy}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {todoItems.map((todo) => (
                                    <SortableTodoCard
                                        key={todo.id}
                                        todo={todo}
                                        onToggle={handleToggleFinish}
                                        onEdit={(todo) => {
                                            setCurrentTodo(todo);
                                            setFormData({ title: todo.title, description: todo.description, cover: null });
                                            setShowEditModal(true);
                                        }}
                                        onDelete={handleDeleteTodo}
                                        onUpdateCover={handleUpdateCover}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>

                    {todos.links && (
                        <div className="flex justify-center gap-2 mt-8">
                            {todos.links.map((link, index) => (
                                <Button
                                    key={index}
                                    variant={link.active ? "default" : "outline"}
                                    size="sm"
                                    disabled={!link.url}
                                    onClick={() => link.url && router.get(link.url)}
                                    className={link.active ? "bg-gradient-to-r from-blue-500 to-indigo-600" : ""}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {showAddModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <Card className="w-full max-w-md shadow-2xl border-0">
                        <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-t-lg">
                            <CardTitle>➕ Tambah Todo Baru</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                <Input
                                    placeholder="Judul todo..."
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="border-slate-300"
                                />
                                <textarea
                                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    rows="4"
                                    placeholder="Deskripsi (opsional)..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                                <Input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, cover: e.target.files[0] })} />
                                <div className="flex gap-2">
                                    <Button onClick={handleAddTodo} className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
                                        Simpan
                                    </Button>
                                    <Button onClick={() => setShowAddModal(false)} variant="outline" className="flex-1">
                                        Batal
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {showEditModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <Card className="w-full max-w-md shadow-2xl border-0">
                        <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
                            <CardTitle>✏️ Edit Todo</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                <Input
                                    placeholder="Judul todo..."
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="border-slate-300"
                                />
                                <textarea
                                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    rows="4"
                                    placeholder="Deskripsi (opsional)..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                                <div className="flex gap-2">
                                    <Button onClick={handleEditTodo} className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                                        Update
                                    </Button>
                                    <Button onClick={() => setShowEditModal(false)} variant="outline" className="flex-1">
                                        Batal
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </AppLayout>
    );
}