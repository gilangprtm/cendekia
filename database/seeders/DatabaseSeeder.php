<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'John Doe',
            'username' => 'johndoe',
            'email' => 'jhondoe@example.com',
        ]);

        $this->call([
            CategorySeeder::class,
            PublisherSeeder::class,
        ]);
    }
}
