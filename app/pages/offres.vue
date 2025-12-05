<script setup>
const offres = [{
    id: 1,
    titre: "Solo",
    description: [
        "1 pizza médium", "1 dessert", "1 boisson 33cl"
    ],
    price: 11,
    url: "https://res.cloudinary.com/dlnbsf2ed/image/upload/v1764957462/Copilot_20251205_185713_qsiidp.png"
},
{
    id: 2,
    titre: "Duo",
    description: [
        "1 pizza large", "2 dessert", "2 boisson 33cl"
    ],
    price: 15,
    url: "https://res.cloudinary.com/dlnbsf2ed/image/upload/v1764956080/Copilot_20251205_183207_ffricn.png"
},
{
    id: 3,
    titre: "Family",
    description: [
        "1 pizza extra-large", "4 dessert", "1 boisson 1.5L"
    ],
    price: 24,
    url: "https://res.cloudinary.com/dlnbsf2ed/image/upload/v1764956093/Copilot_20251205_183409_ngwcde.png"
},
{
    id: 4,
    titre: "Gourmand",
    description: ["2 pizzas extra-large", "1 boisson 1.5L"],
    price: 34.90,
    url: "https://res.cloudinary.com/dlnbsf2ed/image/upload/v1764956312/Copilot_20251205_183816_zwnkgv.png"
},
{
    id: 5,
    titre: "Enfant",
    description: ["1 pizza junior", "1 jus d'orange", "1 pom'potes"],
    price: 10,
    url: "https://res.cloudinary.com/dlnbsf2ed/image/upload/v1764957039/Copilot_20251205_185025_gjqzt1.png"
}]

console.log(offres)
</script>


<template>
    <div>
        <h1 class="text-3xl font-bold text-center my-8 lg:mt-32">Nos offres du moments</h1>
        <div class="grid grid-cols-1 lg:grid-cols-3">
            <Card v-for="offers in offres" :key="offers.id"
                class="max-w-5xl mb-12 mx-10 p-4 lg:p-6 lg:mt-16 hover:shadow-amber-500 hover:scale-105 transition-transform duration-300 ease-in-out">

                <CardTitle class="font-mono text-2xl text-center">Menu <span class="text-amber-500">{{ offers.titre
                }}</span>
                </CardTitle>
                <CardContent class=" flex justify-center">
                    <NuxtImg :src="offers.url" :alt="offers.titre" class="w-48 h-48 object-contain rounded-lg " />
                </CardContent>

                <CardContent class="flex flex-col items-start gap-y-3">
                    <div v-for="option in offers.description" :key="option">
                        <ol>
                            <li>{{ option }}</li>
                        </ol>
                    </div>
                </CardContent>
                <CardFooter class="flex justify-center font-bold">{{ offers.price }} euros</CardFooter>

            </Card>
        </div>
    </div>
</template>
