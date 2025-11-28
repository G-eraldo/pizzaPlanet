<script setup lang="ts">
import Button from './ui/button/Button.vue';

</script>

<template>
    <section>
        <Card class="max-w-3xl mx-auto mt-12">
            <div class="flex flex-col lg:flex-row justify-center items-center mx-auto">
                <div class=" lg:w-[50%] space-y-4 flex flex-col justify-around items-center h-full">
                    <h2 class="text-2xl font-bold">En exclusivité ce mois-ci !</h2>
                    <h3 class="text-2xl font bold text-amber-500">La montagnarde</h3>
                    <p class="px-3">Une délicieuse pizza aux saveurs montagnardes, garnie de fromage
                        fondant, de
                        jambon et de
                        champignons.</p>
                    <Button variant="default" class="">
                        Commander
                    </Button>
                </div>
                <div class="p-4 space-y-4">
                    <NuxtImg
                        src="https://res.cloudinary.com/dlnbsf2ed/image/upload/v1764010200/pizzaDeNovembre_qgqzat.jpg"
                        alt="La montagnarde" width="400" height="300" class="rounded-lg" />
                </div>
            </div>
        </Card>
    </section>
</template>