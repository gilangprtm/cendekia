<?php

namespace App\Http\Controllers\Admin;

use App\Traits\HasFile;
use App\Enums\MessageType;
use App\Models\Publishers;
use App\Http\Resources\Admin\PublisherResource;
use App\Http\Requests\Admin\PublisherRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Throwable;

class PublisherController extends Controller
{
    use HasFile;

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
        return inertia('Admin/Publishers/Create', [
            'page_settings' => [
                'title' => 'Tambah Penerbit',
                'subtitle' => 'Menambahkan penerbit baru',
                'method' => 'POST',
                'action' => route('admin.publishers.store'),
            ]
        ]);
    }

    public function store(PublisherRequest $request)
    {
        try {
            Publishers::create([
                'name' => $name = $request->name,
                'slug' => str()->lower(str()->slug($name)) . str()->random(4),
                'address' => $request->address,
                'email' => $request->email,
                'phone' => $request->phone,
                'logo' => $this->upload_file($request, 'logo', 'publishers'),
            ]);
            flashMessage(MessageType::CREATED->message('Penerbit'));
            return to_route('admin.publishers.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');
            return back();
        }
    }

    public function edit(Publishers $publisher): Response
    {
        return inertia('Admin/Publishers/Edit', [
            'data' => $publisher,
            'page_settings' => [
                'title' => 'Edit Penerbit',
                'subtitle' => 'Mengedit penerbit yang telah tersedia di platform ini',
                'method' => 'PUT',
                'action' => route('admin.publishers.update', $publisher),
            ]
        ]);
    }

    public function update(PublisherRequest $request, Publishers $publisher)
    {
        try {
            $publisher->update([
                'name' => $name = $request->name,
                'slug' => $name !== $publisher->name ? str()->lower(str()->slug($name)) . str()->random(4) : $publisher->slug,
                'address' => $request->address,
                'email' => $request->email,
                'phone' => $request->phone,
                'logo' => $this->upload_file($request, $publisher, 'logo', 'publishers'),
            ]);
            flashMessage(MessageType::UPDATE->message('Penerbit'));
            return to_route('admin.publishers.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');
            return back();
        }
    }
 
    public function destroy(Publishers $publisher)
    {
        try {
            $this->delete_file($publisher, 'logo');
            $publisher->delete();
            flashMessage(MessageType::DELETED->message('Penerbit'));
            return to_route('admin.publishers.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');
            return back();
        }
    }       
}
