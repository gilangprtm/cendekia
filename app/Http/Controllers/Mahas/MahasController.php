<?php

namespace App\Http\Controllers\Mahas;

use App\Http\Controllers\Controller;
use App\Traits\HasFile;
use App\Enums\MessageType;
use Illuminate\Http\Request;
use Inertia\Response;
use Throwable;

abstract class MahasController extends Controller
{
    use HasFile;

    protected $model;
    protected $resource;
    protected $request;
    protected $pagePrefix;
    protected $routePrefix;
    protected $pageSettings;
    protected $selectFields = [];
    protected $entityName;
    protected $fileColumns = [];
    protected $filters = [];
    protected $state = [];

    public function index(): Response
    {
        $datas = $this->model::query()
            ->select($this->selectFields)
            ->filter(request()->only($this->filters))
            ->sorting(request()->only(['field', 'direction']))
            ->paginate(request()->load ?? 10)
            ->appends(request()->query());;

        return inertia($this->pagePrefix . '/Index', [
            'datas' => $this->resource::collection($datas)->additional([
                'meta' => [
                    'has_pages' => $datas->hasPages(),
                ],
            ]),
            'page_settings' => $this->pageSettings,
            'state' => array_merge(
                [
                    'page' => request()->page ?? 1,
                    'load' => request()->load ?? 10,
                ],
                $this->state,
                request()->only(array_keys($this->state))
            ),
            'initial_state' => [
                'page' => 1,
                'load' => 10,
                ...$this->state,
            ],
        ]);
    }

    public function create(): Response
    {
        return inertia($this->pagePrefix . '/Create', [
            'page_settings' => array_merge($this->pageSettings, [
                'method' => 'POST',
                'action' => route($this->routePrefix . '.store'),
            ])
        ]);
    }

    public function store(Request $request)
    {
        try {
            $this->model::create($this->postData($request));
            flashMessage(MessageType::CREATED->message($this->entityName));
            return to_route($this->routePrefix . '.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');
            return back();
        }
    }

    public function edit($id): Response
    {
        $data = $this->model::findOrFail($id);
        return inertia($this->pagePrefix . '/Edit', [
            'data' => $data,
            'page_settings' => array_merge($this->pageSettings, [
                'method' => 'PUT',
                'action' => route($this->routePrefix . '.update', $data),
            ])
        ]);
    }

    public function update(Request $request, $data)
    {
        try {
            $data = $this->model::findOrFail($data);
            $data->update($this->putData($request, $data));
            flashMessage(MessageType::UPDATE->message($this->entityName));
            return to_route($this->routePrefix . '.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');
            return back();
        }
    }

    public function destroy($data)
    {
        try {
            $data = $this->model::findOrFail($data);
            foreach ($this->fileColumns as $fileColumn) {
                $this->delete_file($data, $fileColumn);
            }
            $data->delete();
            flashMessage(MessageType::DELETED->message($this->entityName));
            return to_route($this->routePrefix . '.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');
            return back();
        }
    }

    protected function postData(Request $request)
    {
        return $request->validated();
    }

    protected function putData(Request $request, $data = null)
    {
        return $request->validated();
    }
}
