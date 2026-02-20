<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\User;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        // Get all normal users (clients)
        $users = User::where('is_admin', false)->get();

        foreach ($users as $user) {

            // Create 2 projects per user
            for ($i = 0; $i < 2; $i++) {

                $statusOptions = ['draft', 'active', 'on_hold', 'completed'];
                $status = $statusOptions[rand(0, 3)];

                $startDate = now()->subDays(rand(5, 30));
                $dueDate   = now()->addDays(rand(10, 60));

                Project::create([
                    'user_id' => $user->id,
                    'name' => 'Project ' . rand(100, 999),
                    'address' => 'Manila, Philippines',
                    'status' => $status,
                    'start_date' => $startDate,
                    'due_date' => $dueDate,
                    'completed_date' => $status === 'completed' ? now() : null,
                    'budget' => rand(50000, 200000),
                    'progress' => 0,
                    'description' => 'Sample project description for testing.',
                ]);
            }
        }
    }
}
