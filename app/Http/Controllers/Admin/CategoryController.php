<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CategoryRequest;
use App\Http\Resources\Admin\CategoryResource;
use App\Models\Category;
use App\Traits\HasFile;
use Illuminate\Http\Request;
use Inertia\Response;
use Throwable;

class CategoryController extends Controller
{
    use HasFile;

    public function index(): Response
    {
        $categories = Category::query()
            ->select(['id', 'name', 'slug', 'cover', 'created_at'])
            ->get();

        return inertia('Admin/Categories/Index', [
            'categories' => CategoryResource::collection($categories),
            'page_settings' => [
                'title' => 'Kategori',
                'subtitle' => 'Menampilkan semua data kategori yang tersedia di platform ini',
            ],
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
}
