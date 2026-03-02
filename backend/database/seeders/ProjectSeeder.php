<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\User;
use App\Models\Milestone;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::where('is_admin', false)->get();

        foreach ($users as $user) {

            for ($i = 0; $i < 2; $i++) {

                $statusOptions = ['draft', 'active', 'on_hold', 'completed'];
                $status = $statusOptions[rand(0, 3)];

                $startDate = now()->subDays(rand(5, 30));
                $dueDate   = now()->addDays(rand(10, 60));

                $isShowcase = $status === 'completed'
                    ? (bool) rand(0, 1)
                    : false;

                $project = Project::create([
                    'user_id' => $user->id,
                    'name' => 'Project ' . rand(100, 999),
                    'address' => 'Manila, Philippines',
                    'status' => $status,
                    'start_date' => $startDate,
                    'due_date' => $dueDate,
                    'completed_date' => $status === 'completed' ? now() : null,
                    'budget' => rand(50000, 200000),
                    'progress' => 0, // calculate after milestones
                    'description' => 'Sample project description for testing.',
                    'showcase' => $isShowcase,
                ]);

                // 🔥 Seed 2–3 milestones
                $milestoneCount = rand(2, 3);

                $statuses = ['todo', 'doing', 'done'];

                $doneCount = 0;

                for ($m = 0; $m < $milestoneCount; $m++) {

                    // If project completed → all milestones done
                    if ($status === 'completed') {
                        $milestoneStatus = 'done';
                        $doneCount++;
                    } else {
                        $milestoneStatus = $statuses[rand(0, 2)];
                        if ($milestoneStatus === 'done') {
                            $doneCount++;
                        }
                    }

                    Milestone::create([
                        'project_id' => $project->id,
                        'title' => 'Milestone ' . ($m + 1),
                        'due' => $startDate->copy()->addDays(rand(3, 20)),
                        'status' => $milestoneStatus,
                    ]);
                }

                // 🔥 Update project progress based on milestones
                $progress = round(($doneCount / $milestoneCount) * 100);

                $project->update([
                    'progress' => $status === 'completed' ? 100 : $progress,
                ]);
            }
        }
    }
}
