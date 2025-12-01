<script setup>
import { CircleMinusIcon, CirclePlusIcon, TrashIcon } from 'lucide-vue-next';
import Button from '~/components/ui/button/Button.vue';
import Card from '~/components/ui/card/Card.vue';
import CardContent from '~/components/ui/card/CardContent.vue';
import CardHeader from '~/components/ui/card/CardHeader.vue';
import CardTitle from '~/components/ui/card/CardTitle.vue';
import { useCartStore } from '~/stores/cart';

const cartStore = useCartStore()




</script>

<template>
    <Card class="max-w-5xl mx-auto p-4 md:p-6 mt-24 ">
        <h1>Ma Commande</h1>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

            <Card v-for="item in cartStore.items" :key="`${item.id}-${item.taille}-${item.pate}`">
                <CardHeader class="flex justify-end mr-5">
                    <Button class="bg-red-500 hover:bg-red-600 cursor-pointer" @click="cartStore.deleteItem(item)">
                        <TrashIcon />
                    </Button>
                </CardHeader>
                <CardTitle class="ml-6">{{ item.title }}</CardTitle>
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
        <div class="flex justify-center">
            <Button v-if="cartStore.totalPrice > 0" variant="outline">
                Payer {{ cartStore.totalPrice }} €
            </Button>
            <Button v-else class="hidden">cache</Button>
            <Button as-child="" variant="outline" class="ml-4">
                <NuxtLink to="/">Retour</NuxtLink>

            </Button>
        </div>

    </Card>
</template>

<style scoped></style>