<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // =========================
        // ADMINS
        // =========================

        User::updateOrCreate(
            ['email' => 'admin1@cliberduche.com'],
            [
                'name' => 'Admin One',
                'password' => 'password',
                'is_admin' => true,
            ]
        );

        User::updateOrCreate(
            ['email' => 'admin2@cliberduche.com'],
            [
                'name' => 'Admin Two',
                'password' => 'password',
                'is_admin' => true,
            ]
        );

        // =========================
        // NORMAL USERS
        // =========================

        $users = [
            ['name' => 'Kent', 'email' => 'tallaferkent775@gmail.com'],
            ['name' => 'Warly', 'email' => 'jaculanwarlyfrance52@gmail.com'],
            ['name' => 'Jash', 'email' => 'jash@cliberduche.com'],
            ['name' => 'Jenny', 'email' => 'jenny@cliberduche.com'],
            ['name' => 'Matthew', 'email' => 'matthew@cliberduche.com'],
        ];

        foreach ($users as $user) {
            User::updateOrCreate(
                ['email' => $user['email']],
                [
                    'name' => $user['name'],
                    'password' => 'password',
                    'is_admin' => false,
                ]
            );
        }
    }
}
