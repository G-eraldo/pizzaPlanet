<script setup lang="ts">
import { CircleMinusIcon, CirclePlusIcon, TrashIcon } from 'lucide-vue-next'
import Button from '~/components/ui/button/Button.vue'
import Card from '~/components/ui/card/Card.vue'
import CardContent from '~/components/ui/card/CardContent.vue'
import CardTitle from '~/components/ui/card/CardTitle.vue'


const cartStore = useCartStore()

</script>

<template>
    <div class="max-w-5xl mx-auto p-4 md:p-6 mt-24 flex flex-col mb-12">
        <h1 class="text-3xl font-bold text-center my-8">Ma Commande</h1>


        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card v-for="item in cartStore.items" :key="`${item.id}-${item.taille}-${item.pate}`">
                <CardTitle class="ml-6 flex justify-between items-center">{{ item.title }}
                    <Button class="bg-red-500 hover:bg-red-600 cursor-pointer mr-5" @click="
                        cartStore.deleteItem(item)">
                        <TrashIcon />
                    </Button>
                </CardTitle>
                <CardContent>Taille: {{ item.taille }}</CardContent>
                <CardContent>Pâte: {{ item.pate }}</CardContent>

                <CardContent>
                    Quantité:
                    <Button variant="outline" class="mx-2" :disabled="item.quantity === 0"
                        @click="cartStore.decrement(item)">
                        <CircleMinusIcon />
                    </Button>
                    {{ item.quantity }}
                    <Button variant="outline" class="mx-2" @click="cartStore.increment(item)">
                        <CirclePlusIcon />
                    </Button>
                </CardContent>

                <CardContent>
                    <NuxtImg :src="item.image" :alt="item.title" class="w-full h-48 object-cover rounded-lg" />
                </CardContent>

                <CardFooter>
                    Prix: {{ item.unitPrice * item.quantity }} €
                </CardFooter>
            </Card>
        </div>


        <div class="flex justify-center mt-6">
            <Button v-if="cartStore.totalPrice > 0" variant="outline">
                Commander pour {{ cartStore.totalPrice }} €
            </Button>

            <Button v-else class="hidden">
                cache
            </Button>

            <Button as-child variant="outline" class="ml-4">
                <NuxtLink to="/">Retour</NuxtLink>
            </Button>
        </div>
    </div>
</template>

<style scoped></style>
