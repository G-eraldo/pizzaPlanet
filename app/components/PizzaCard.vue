<script setup>
import { ref } from 'vue';
import { useCartStore } from '~/stores/cart';
import Button from './ui/button/Button.vue';
import Card from './ui/card/Card.vue';
import CardContent from './ui/card/CardContent.vue';
import CardDescription from './ui/card/CardDescription.vue';
import CardFooter from './ui/card/CardFooter.vue';
import CardHeader from './ui/card/CardHeader.vue';
import CardTitle from './ui/card/CardTitle.vue';
import Select from './ui/select/Select.vue';
import SelectContent from './ui/select/SelectContent.vue';
import SelectItem from './ui/select/SelectItem.vue';
import SelectTrigger from './ui/select/SelectTrigger.vue';
import SelectValue from './ui/select/SelectValue.vue';

const props = defineProps({
    pizzas: {
        type: Object,
        required: true
    }
})

const taille = ref('Medium')
const pate = ref('Fine')
const numbers = ref('1')

const priceTaille = computed(() => taille.value === "L" ? props.pizzas.price + 2 : taille.value === "XL" ? props.pizzas.price + 5 : props.pizzas.price)

const finalPrice = computed(() => pate.value === "Pan" ? priceTaille.value + 2 : pate.value === "Chessy" ? priceTaille.value + 2 : priceTaille.value) // <-- Ajout de .value ici

const cartStore = useCartStore()

const addToCart = () => {
    cartStore.addItem({
        pizza: props.pizzas,  // <- ici: 'pizza' (singulier), comme dans le store
        taille: taille.value,
        pate: pate.value,
        quantity: Number(numbers.value),
        price: finalPrice.value,
        image: props.pizzas.pictures?.[0]?.formats?.small?.url,
    })
}

</script>


<template>

    <Card class="max-w-5xl mb-12 mx-10 p-4 lg:p-6 lg:mb-24">
        <CardHeader>
            <CardTitle>{{ pizzas.title }}</CardTitle>
            <CardDescription class="h-24">{{ pizzas.description }}</CardDescription>
        </CardHeader>
        <CardContent>
            <NuxtImg :src="pizzas.pictures?.[0]?.formats?.small?.url" :alt="pizzas.title"
                class="w-full h-48 object-cover rounded-lg" />


        </CardContent>
        <CardFooter class="flex flex-col items-start gap-y-3">
            <div>
                <p>{{ finalPrice }} euros</p>
            </div>
            <form class="w-full" @submit.prevent="addToCart">

                <div class="flex flex-col">
                    <div class="mb-3">
                        <Select v-model="taille" name="taille">
                            <SelectTrigger class="w-[180px]">
                                <SelectValue placeholder="Tailles" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Medium">Medium: 28 cm</SelectItem>
                                <SelectItem value="L">L: 33cm</SelectItem>
                                <SelectItem value="XL">XL: 40cm</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div class="mb-3">
                        <Select v-model="pate" name="pate">
                            <SelectTrigger class="w-[180px]">
                                <SelectValue placeholder="Pâtes" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Fine">Pâte fine</SelectItem>
                                <SelectItem value="Pan">Pan</SelectItem>
                                <SelectItem value="Chessy">Chessy</SelectItem>
                                <SelectItem value="Classique">Classique</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Select v-model="numbers" name="numbers">
                            <SelectTrigger class="w-[180px]">
                                <SelectValue placeholder="nombres" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div class="mt-5 flex justify-center">
                    <Button variant="outline" class="cursor-pointer" type="submit">
                        Ajouter au panier
                    </Button>
                </div>
            </form>
        </CardFooter>
    </Card>
</template>
