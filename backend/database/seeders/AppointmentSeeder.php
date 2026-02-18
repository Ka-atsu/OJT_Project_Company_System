<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Appointment;
use App\Models\User;

class AppointmentSeeder extends Seeder
{
    public function run(): void
    {
        // Get all normal users (not admins)
        $users = User::where('is_admin', false)->get();

        foreach ($users as $user) {

            // Create 3 appointments per user
            for ($i = 0; $i < 3; $i++) {
                Appointment::create([
                    'user_id' => $user->id,
                    'phone' => '09123456789',
                    'scheduled_at' => now()->addDays(rand(1, 15)),
                    'project' => 'Website Project',
                    'purpose' => 'Consultation',
                    'details' => 'Initial discussion about project requirements.',
                    'mode' => rand(0, 1) ? 'online' : 'f2f',
                    'approval_status' => ['pending', 'accepted', 'declined'][rand(0, 2)],
                    'meeting_link' => null,
                    'location' => null,
                ]);
            }
        }
    }
}
