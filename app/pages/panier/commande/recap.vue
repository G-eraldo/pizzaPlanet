<script setup>
const user = useStrapiUser()
const cartStore = useCartStore()
const address = ref(user.value.userProfile.adress?.street_address)
const zipCode = ref(user.value.userProfile.adress?.zip_code)
const city = ref(user.value.userProfile.adress?.city)
const country = ref(user.value.userProfile.adress?.country)
const firstName = ref(user.value?.userProfile.firstname)
const name = ref(user.value?.userProfile.name)
definePageMeta({
    middleware: 'auth'
})
</script>

<template>
    <div class="max-w-7xl mx-auto p-4 md:p-8 mt-24">
        <h1 class="text-4xl font-extrabold text-center mb-10 text-gray-800">Récapitulatif de ta Commande</h1>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">

            <div class="lg:col-span-1">
                <h2 class="text-2xl font-bold mb-4 border-b pb-2 text-gray-700">Mes Informations :</h2>

                <Card class="p-6 shadow-xl lg:sticky lg:top-24">
                    <div class="space-y-4">
                        <div class="flex items-center">
                            <p class="w-24 font-semibold">Nom :</p>
                            <p class="grow font-medium">{{ name }}</p>
                        </div>
                        <div class="flex items-center">
                            <p class="w-24 font-semibold">Prénom :</p>
                            <p class="grow font-medium">{{ firstName }}</p>
                        </div>

                        <hr class="my-4 border-gray-200">

                        <div class="flex items-center">
                            <p class="w-24 font-semibold">Adresse :</p>
                            <p class="grow font-medium">{{ address }}</p>
                        </div>
                        <div class="flex items-center">
                            <p class="w-24 font-semibold">Code Postal :</p>
                            <p class="grow font-medium">{{ zipCode }}</p>
                        </div>
                        <div class="flex items-center">
                            <p class="w-24 font-semibold">Ville :</p>
                            <p class="grow font-medium">{{ city }}</p>
                        </div>
                        <div class="flex items-center">
                            <p class="w-24 font-semibold">Pays :</p>
                            <p class="grow font-medium">{{ country }}</p>
                        </div>
                    </div>


                </Card>
            </div>

            <div class="lg:col-span-2">
                <h2 class="text-2xl font-bold mb-4 border-b pb-2 text-gray-700">
                    Votre Commande ({{ cartStore.items.length }} articles) :
                </h2>

                <div class="space-y-4">
                    <Card v-for="item in cartStore.items" :key="`${item.id}-${item.taille}-${item.pate}`" class="p-4 flex flex-row items-start hover:shadow-amber-500 hover:scale-105 
                transition-transform duration-300 ease-in-out">

                        <div class="w-24 h-24 shrink-0 mr-4 mb-3 sm:mb-0">
                            <NuxtImg :src="item.image" :alt="item.title"
                                class="w-full h-full object-cover rounded-md" />
                        </div>

                        <div class="grow flex flex-col justify-between w-full">

                            <div class="grow">
                                <CardTitle class="text-lg font-bold">{{ item.title }}</CardTitle>
                                <p class="text-sm text-gray-500 font-medium">
                                    {{ item.taille }} / {{ item.pate }}
                                </p>
                                <p class="text-xs text-gray-400 mt-1">
                                    ({{ item.unitPrice.toFixed(2) }} €/u)
                                </p>
                            </div>

                            <div
                                class="flex items-center justify-between sm:justify-end sm:space-x-4 pt-3 sm:pt-0 mt-3 sm:mt-0 border-t sm:border-t-0 border-gray-100 w-full sm:w-auto">

                                <div class="flex items-center space-x-2">

                                    <span class="font-bold text-base w-4 text-center">{{ item.quantity }}</span>

                                </div>

                                <div class="flex items-center space-x-4 ml-6 relative">
                                    <p class="text-xl font-extrabold text-amber-500 w-20 text-right">
                                        {{ (item.unitPrice * item.quantity).toFixed(2) }} €
                                    </p>

                                    <Button size="icon" variant="ghost" class="
                                        absolute -top-28 right-1 lg:static
                                        text-red-500 hover:text-red-700 lg:w-8 lg:h-8 lg:p-1"
                                        @click="cartStore.deleteItem(item)">
                                        <TrashIcon class="w-5 h-5" />
                                    </Button>
                                </div>

                            </div>
                        </div>
                    </Card>
                </div>

                <Card class="mt-8 p-6">
                    <div
                        class="flex flex-col gap-4 justify-around lg:flex-row lg:justify-between lg:mx-12 items-center text-xl font-bold    ">
                        <span>Statut de la commande :</span>
                        <span class="text-3xl text-amber-500">En cours de préparation</span>
                    </div>
                    <div
                        class="flex flex-col gap-4 justify-around lg:flex-row lg:justify-between lg:mx-12 items-center text-xl font-bold">
                        <span>Total de la commande :</span>
                        <span class="text-3xl text-amber-500">{{ cartStore.totalPrice.toFixed(2) }} €</span>
                    </div>

                    <div class="flex justify-center lg:mx-12 mt-4">
                        <Button @click="cartStore.clearCart()" class="text-lg px-8 py-6">
                            <RouterLink to="/mon-compte">
                                Retour à mon compte
                            </RouterLink>
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    </div>
</template>