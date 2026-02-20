<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Database\Seeders\UserSeeder;
use Database\Seeders\AppointmentSeeder;
use Database\Seeders\ProjectSeeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            AppointmentSeeder::class,
            ProjectSeeder::class,
        ]);

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
