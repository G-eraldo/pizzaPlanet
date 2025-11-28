<script setup>
import PizzaCard from '~/components/PizzaCard.vue';
import PizzaOfMoments from '~/components/PizzaOfMoments.vue';


const { find } = useStrapi()

// L'appel API est toujours le même
const offers = await find("pizzas", { populate: "*" })
</script>

<template>
    <main>
        <div class="px-4 lg:px-0">
            <PizzaOfMoments />
            <h1 class="text-3xl font-bold text-center my-8 lg:my-16">Nos Pizzas</h1>

            <div class="grid grid-cols-1 lg:grid-cols-3">
                <PizzaCard v-for="pizza in offers.data" :key="pizza.id" :pizzas="pizza" />
            </div>

        </div>
    </main>
</template>