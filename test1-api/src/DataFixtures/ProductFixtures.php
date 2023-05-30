<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use App\Entity\Product;

class ProductFixtures extends Fixture
{
    public function load(ObjectManager $manager)
{
    $faker = Factory::create();

    // Create and persist fake products
    for ($i = 1; $i <= 30; $i++) {
        $product = new Product();
        $product->setTitle($faker->realText(30));
        $product->setCountry($faker->countryISOAlpha3());
        $product->setYear($faker->year);
        $product->setDescription($faker->realText(200));
        $product->setGenre($faker->randomElement(['Action', 'Comedy', 'Drama', 'Thriller']));
        $product->setRanking($faker->randomFloat(1, 0, 10));
        $product->setPrice($faker->randomFloat(2, 0, 100));
        $product->setProductType($faker->randomElement(['Physical', 'Digital', 'AudioB']));

        if ($product->getCountry() !== 'FRA') {
            $product->setOriginalTitle($faker->realText(30));
        }

        $manager->persist($product);
    }

    // Flush the changes to the database
    $manager->flush();
}

}
