<?php

namespace App\Http\Controllers\Admin;

use App\Models\Publishers;
use App\Http\Resources\Admin\PublisherResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;

class PublisherController extends Controller
{
    public function index(): Response
    {
        $datas = Publishers::query()
            ->select(['id', 'name', 'slug', 'address', 'email', 'phone', 'created_at'])
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->paginate(request()->load ?? 10)
            ->withQueryString();

        return inertia('Admin/Publishers/Index', [
            'datas' => PublisherResource::collection($datas)->additional([
                'meta' => [
                    'has_pages' => $datas->hasPages(),
                ],
            ]),
            'page_settings' => [
                'title' => 'Penerbit',
                'subtitle' => 'Menampilkan semua data penerbit yang tersedia di platform ini',
            ],
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => 10,
            ]
        ]);
    }

    public function create(): Response
    {
        return inertia('Admin/Categories/Create', [
            'page_settings' => [
                'title' => 'Tambah Kategori',
                'subtitle' => 'Menambahkan kategori baru',
                'method' => 'POST',
                'action' => route('admin.categories.store'),
            ]
        ]);
    }
/*
    public function store(CategoryRequest $request)
    {
        try {
            Category::create([
                'name' => $name = $request->name,
                'slug' => str()->lower(str()->slug($name)) . str()->random(4),
                'description' => $request->description,
                'cover' => $this->upload_file($request, 'cover', 'categories'),
            ]);
            flashMessage(MessageType::CREATED->message('Kategori'));
            return to_route('admin.categories.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');
            return back();
        }
    }

    public function edit(Category $category): Response
    {
        return inertia('Admin/Categories/Edit', [
            'category' => $category,
            'page_settings' => [
                'title' => 'Edit Kategori',
                'subtitle' => 'Mengedit kategori yang telah tersedia di platform ini',
                'method' => 'PUT',
                'action' => route('admin.categories.update', $category),
            ]
        ]);
    }

    public function update(CategoryRequest $request, Category $category)
    {
        try {
            $category->update([
                'name' => $name = $request->name,
                'slug' => $name !== $category->name ? str()->lower(str()->slug($name)) . str()->random(4) : $category->slug,
                'description' => $request->description,
                'cover' => $this->upload_file($request, $category, 'cover', 'categories'),
            ]);
            flashMessage(MessageType::UPDATE->message('Kategori'));
            return to_route('admin.categories.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');
            return back();
        }
    }

    public function destroy(Category $category)
    {
        try {
            $this->delete_file($category, 'cover');
            $category->delete();
            flashMessage(MessageType::DELETED->message('Kategori'));
            return to_route('admin.categories.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');
            return back();
        }
    }
        */
}
