<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Mahas\MahasController;
use App\Models\Publishers;
use Illuminate\Http\Request;
use App\Http\Resources\Admin\PublisherResource;
use App\Http\Requests\Admin\PublisherRequest;

class PublisherController extends MahasController
{
    protected $model = Publishers::class;
    protected $resource = PublisherResource::class;
    protected $request = PublisherRequest::class;
    protected $pagePrefix = 'Admin/Publishers';
    protected $routePrefix = 'admin.publishers';
    protected $pageSettings = [
        'title' => 'Penerbit',
        'subtitle' => 'Menampilkan semua data penerbit yang tersedia di platform ini',
    ];
    protected $filters = ['search', 'name', 'slug', 'created_at'];
    protected $state = [
        'search' => '',
        'name' => '',
        'slug' => '',
        'created_at' => '',
    ];
    protected $selectFields = ['id', 'name', 'slug', 'address', 'email', 'phone', 'logo', 'created_at'];
    protected $entityName = 'Penerbit';

    // Tambahkan kolom file yang ingin dihapus
    protected $fileColumns = ['logo'];

    protected function postData(Request $request)
    {
        $name = $request->name;
        return [
            'name' => $name,
            'slug' => str()->lower(str()->slug($name)) . str()->random(4),
            'address' => $request->address,
            'email' => $request->email,
            'phone' => $request->phone,
            'logo' => $this->upload_file($request, 'logo', 'publishers'),
        ];
    }

    protected function putData(Request $request, $data = null)
    {
        $name = $request->name;
        return [
            'name' => $name,
            'slug' => $name !== $data->name ? str()->lower(str()->slug($name)) . str()->random(4) : $data->slug,
            'address' => $request->address,
            'email' => $request->email,
            'phone' => $request->phone,
            'logo' => $this->update_file($request, $data, 'logo', 'publishers'),
        ];
    }
}
