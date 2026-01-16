<script setup>
import { CircleMinusIcon, CirclePlusIcon, TrashIcon } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

definePageMeta({
    middleware: 'auth'
})

const isChanged = ref(false)

const isOnChange = () => {
    isChanged.value = !isChanged.value
}


const address = ref('')
const zipCode = ref('')
const city = ref('')
const country = ref('')
const firstName = ref('')
const name = ref('')
const id = ref('')
const user = useStrapiUser()
const { create, update } = useStrapi()
const cartStore = useCartStore()

watchEffect(() => {
    if (user.value?.userProfile) {
        name.value = user.value.userProfile.name || ''
        firstName.value = user.value.userProfile.firstname || ''
        id.value = user.value.userProfile.documentId || user.value.userProfile.id
        address.value = user.value.userProfile.adress?.street_address || ''
        zipCode.value = user.value.userProfile.adress?.zip_code || ''
        city.value = user.value.userProfile.adress?.city || ''
        country.value = user.value.userProfile.adress?.country || ''
    } else if (user.value) {
        isChanged.value = true
    }
})

const SaveInfo = async () => {
    try {
        if (!user.value?.userProfile) {
            await create('user-profiles', {
                name: name.value,
                firstname: firstName.value,
                adress: {
                    street_address: address.value,
                    zip_code: zipCode.value,
                    city: city.value,
                    country: country.value
                },
                users_permissions_user: user.value.id
            })
            isChanged.value = false
            toast.success('Mise à jour réussie !')
        } else {
            await update('user-profiles', id.value, {
                name: name.value,
                firstname: firstName.value,
                adress: {
                    street_address: address.value,
                    zip_code: zipCode.value,
                    city: city.value,
                    country: country.value
                }
            })
            isChanged.value = false
            toast.success('Mise à jour réussie !')
        }
    } catch (e) {
        console.error(e)
        toast.error('Erreur: ' + (e.error?.message || e.message || e))
    }
}

</script>

<template>
    <div class="max-w-7xl mx-auto p-4 md:p-8 mt-24">
        <h1 class="text-4xl font-extrabold text-center mb-10 text-gray-800">Finalisation de la Commande</h1>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">

            <div class="lg:col-span-1">
                <h2 class="text-2xl font-bold mb-4 border-b pb-2 text-gray-700">Mes Informations :</h2>

                <Card class="p-6 shadow-xl lg:sticky lg:top-24">
                    <div class="space-y-4">
                        <div class="flex items-center">
                            <Label class="w-24 font-semibold">Nom :</Label>
                            <Input v-if="isChanged" v-model="name" class="grow" placeholder="Votre nom" />
                            <p v-else class="grow font-medium">{{ name || 'Non renseigné' }}</p>
                        </div>
                        <div class="flex items-center">
                            <Label class="w-24 font-semibold">Prénom :</Label>
                            <Input v-if="isChanged" v-model="firstName" class="grow" placeholder="Votre prénom" />
                            <p v-else class="grow font-medium">{{ firstName || 'Non renseigné' }}</p>
                        </div>

                        <hr class="my-4 border-gray-200">

                        <div class="flex items-center">
                            <Label class="w-24 font-semibold">Adresse :</Label>
                            <Input v-if="isChanged" v-model="address" class="grow" placeholder="28 upstreet roard" />
                            <p v-else class="grow font-medium">{{ address || 'Non renseignée' }}</p>
                        </div>
                        <div class="flex items-center">
                            <Label class="w-24 font-semibold">Code Postal :</Label>
                            <Input v-if="isChanged" v-model="zipCode" class="grow" placeholder="80250" />
                            <p v-else class="grow font-medium">{{ zipCode || 'Non renseigné' }}</p>
                        </div>
                        <div class="flex items-center">
                            <Label class="w-24 font-semibold">Ville :</Label>
                            <Input v-if="isChanged" v-model="city" class="grow" placeholder="throy" />
                            <p v-else class="grow font-medium">{{ city || 'Non renseignée' }}</p>
                        </div>
                        <div class="flex items-center">
                            <Label class="w-24 font-semibold">Pays :</Label>
                            <Input v-if="isChanged" v-model="country" class="grow" placeholder="France" />
                            <p v-else class="grow font-medium">{{ country || 'Non renseigné' }}</p>
                        </div>
                    </div>

                    <div class="flex gap-4 justify-end mt-6 pt-4 border-t border-gray-100">
                        <Button variant="outline" @click="isOnChange">
                            {{ isChanged ? 'Annuler' : 'Modifier' }}
                        </Button>
                        <Button v-if="isChanged" variant="default" @click="SaveInfo">
                            Enregistrer
                        </Button>
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
                                    <Button size="icon" variant="outline" class="w-7 h-7" :disabled="item.quantity <= 1"
                                        @click="cartStore.decrement(item)">
                                        <CircleMinusIcon class="w-4 h-4" />
                                    </Button>
                                    <span class="font-bold text-base w-4 text-center">{{ item.quantity }}</span>
                                    <Button size="icon" variant="outline" class="w-7 h-7"
                                        @click="cartStore.increment(item)">
                                        <CirclePlusIcon class="w-4 h-4" />
                                    </Button>
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
                        <span>Total de la commande :</span>
                        <span class="text-3xl text-amber-500">{{ cartStore.totalPrice.toFixed(2) }} €</span>
                    </div>

                    <div class="flex justify-center lg:justify-end lg:mx-12 mt-4">
                        <Button class="text-lg px-8 py-6" :disabled="cartStore.totalPrice <= 0 || isChanged">
                            <RouterLink to="/panier/commande/paiement">
                                Payer et Valider la Commande
                            </RouterLink>
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    </div>
</template>