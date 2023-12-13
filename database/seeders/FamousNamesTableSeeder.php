<?php

namespace Database\Seeders;

use App\Models\FamousName;
use Illuminate\Database\Seeder;

class FamousNamesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // clean up the table before seeding
        FamousName::truncate();

        // get json data from the file

        $famousNamesJson = file_get_contents(storage_path('seed/famous-names.json'));

        // convert to array
        $famousNames = json_decode($famousNamesJson, true);

        // insert data into the table
        foreach ($famousNames['famousNames'] as $famousNameData) {
            FamousName::create([
                'id' => $famousNameData['id'],
                'name' => $famousNameData['name'],
                'lat' => $famousNameData['location']['lat'],
                'lng' => $famousNameData['location']['lng'],
            ]);
        }
    }
}
