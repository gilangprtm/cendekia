<?php

namespace Database\Seeders;

use App\Models\Publishers;
use Illuminate\Database\Seeder;

class PublisherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Publishers::factory()->count(25)->create();
    }
}
