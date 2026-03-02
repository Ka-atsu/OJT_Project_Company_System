<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\ProjectResource;
use App\Models\Project;

class PublicProjectController extends Controller
{
    public function showcase()
    {
        return ProjectResource::collection(
            Project::where('showcase', true)
                ->where('status', 'completed')
                ->select([
                    'id',
                    'name',
                    'address',
                    'description',
                    'completed_date'
                ])
                ->with(['photos:id,project_id,path'])
                ->latest('completed_date')
                ->take(8) // limit for landing page
                ->get()
        );
    }
}
