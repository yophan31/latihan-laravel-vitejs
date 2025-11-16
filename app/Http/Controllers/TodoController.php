<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TodoController extends Controller
{
    public function index(Request $request)
    {
        $auth = Auth::user();
        $search = $request->input('search', '');
        $filter = $request->input('filter', 'all');

        $query = Todo::where('user_id', $auth->id);

        // Filter berdasarkan status
        if ($filter === 'finished') {
            $query->where('is_finished', true);
        } elseif ($filter === 'unfinished') {
            $query->where('is_finished', false);
        }

        // Pencarian
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'ILIKE', "%{$search}%")
                    ->orWhere('description', 'ILIKE', "%{$search}%");
            });
        }

        $todos = $query->orderBy('created_at', 'desc')->paginate(20);

        // Statistik
        $stats = [
            'total' => Todo::where('user_id', $auth->id)->count(),
            'finished' => Todo::where('user_id', $auth->id)->where('is_finished', true)->count(),
            'unfinished' => Todo::where('user_id', $auth->id)->where('is_finished', false)->count(),
        ];

        $data = [
            'auth' => $auth,
            'todos' => $todos,
            'stats' => $stats,
            'filters' => [
                'search' => $search,
                'filter' => $filter,
            ],
        ];

        return Inertia::render('App/TodosPage', $data);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $coverPath = null;
        if ($request->hasFile('cover')) {
            $coverPath = $request->file('cover')->store('covers', 'public');
        }

        Todo::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'description' => $request->description,
            'cover' => $coverPath,
            'is_finished' => false,
        ]);

        return redirect()->route('todos.index')->with('success', 'Todo berhasil ditambahkan!');
    }

    public function update(Request $request, $id)
    {
        $todo = Todo::where('user_id', Auth::id())->findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $todo->update([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return redirect()->route('todos.index')->with('success', 'Todo berhasil diperbarui!');
    }

    public function destroy($id)
    {
        $todo = Todo::where('user_id', Auth::id())->findOrFail($id);

        if ($todo->cover) {
            Storage::disk('public')->delete($todo->cover);
        }

        $todo->delete();

        return redirect()->route('todos.index')->with('success', 'Todo berhasil dihapus!');
    }

    public function toggleFinish($id)
    {
        $todo = Todo::where('user_id', Auth::id())->findOrFail($id);
        $todo->update(['is_finished' => !$todo->is_finished]);

        return redirect()->route('todos.index')->with('success', 'Status todo berhasil diubah!');
    }

    public function updateCover(Request $request, $id)
    {
        $todo = Todo::where('user_id', Auth::id())->findOrFail($id);

        $request->validate([
            'cover' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Hapus cover lama
        if ($todo->cover) {
            Storage::disk('public')->delete($todo->cover);
        }

        $coverPath = $request->file('cover')->store('covers', 'public');
        $todo->update(['cover' => $coverPath]);

        return redirect()->route('todos.index')->with('success', 'Cover berhasil diperbarui!');
    }
}