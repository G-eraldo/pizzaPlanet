<!-- Composant retourné pas la page de paiement -->

<script setup>
import { loadStripe } from '@stripe/stripe-js'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
const user = useStrapiUser()
const { create } = useStrapi()
const cartStore = useCartStore()
const router = useRouter()

const stripePromise = loadStripe('pk_test_51RX0QU3kcBQCvQV6CkN4pndIDYDjezNjOsnQieIBb28pCwklUiltxAQvm7RMg4IswdYuSBC5Rsp0YuCYZnrPpOu8005X4Hay99')

const cardNumber = ref(null)
const cardExpiry = ref(null)
const cardCvc = ref(null)
const isLoading = ref(false)


onBeforeMount(async () => {
    const stripe = await stripePromise

    const elements = stripe.elements()

    const style = {
        base: {
            color: '#32325d',
            fontFamily: '"Poppins", sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4'
            }
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
        }
    };

    cardNumber.value = elements.create('cardNumber', { style });
    cardExpiry.value = elements.create('cardExpiry', { style });
    cardCvc.value = elements.create('cardCvc', { style });

    cardNumber.value.mount('#card-number')
    cardExpiry.value.mount('#card-expiry')
    cardCvc.value.mount('#card-cvc')
})

const handlePayment = async () => {
    try {
        const stripe = await stripePromise

        const { token } = await stripe.createToken(cardNumber.value, {
            address_city: user.value.userProfile.adress?.city,
            address_line1: user.value.userProfile.adress?.street_address,
            address_zip: user.value.userProfile.adress?.zip_code,
            address_country: user.value.userProfile.adress?.country,
            name: user.value.userProfile.firstname,
            email: user.value.email,
        })
        const stripeToken = token.id
        isLoading.value = true
        const response = await create('commandes', {
            token: stripeToken,
            amount: cartStore.totalPriceInCents,
            user_profile: user.value.userProfile.id,
            content: cartStore.items,
        })

        if (response.data.status === 'succeeded') {
            router.push('/panier/commande/recap')
        }

    } catch (error) {
        console.log(error);
    }
}



</script>

<template>
    <div class="max-w-5xl mx-auto p-4 md:p-8 mt-24">
        <div class="lg:col-span-2">
            <h2 class="text-2xl font-bold mb-4 border-b pb-2 text-gray-700">
                Votre Commande ({{ cartStore.items.length }} articles) :
            </h2>

            <div class="space-y-4">
                <Card v-for="item in cartStore.items" :key="`${item.id}-${item.taille}-${item.pate}`" class="p-4 flex flex-row items-start hover:shadow-amber-500 hover:scale-105 
                transition-transform duration-300 ease-in-out">

                    <div class="w-24 h-24 shrink-0 mr-4 mb-3 sm:mb-0">
                        <NuxtImg :src="item.image" :alt="item.title" class="w-full h-full object-cover rounded-md" />
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

            <Card class="mt-8 overflow-hidden">
                <div class="bg-amber-500/10 p-4 border-b border-amber-500/20">
                    <h3 class="text-lg font-bold text-amber-900 flex items-center gap-2">
                        <CreditCardIcon class="w-5 h-5 text-amber-600" />
                        Paiement sécurisé par Stripe
                    </h3>
                </div>

                <div class="p-6 space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="md:col-span-2">
                            <label for="card-number" class="block text-sm font-semibold text-gray-600 mb-2">
                                Numéro de carte
                            </label>
                            <div id="card-number"
                                class="p-4 border rounded-xl bg-white shadow-sm ring-offset-background focus-within:ring-2 focus-within:ring-amber-500 focus-within:ring-offset-2 transition-all duration-200">
                                <!-- Stripe Element will be mounted here -->
                            </div>
                        </div>
                        <div>
                            <label for="card-expiry" class="block text-sm font-semibold text-gray-600 mb-2">
                                Date d'expiration
                            </label>
                            <div id="card-expiry"
                                class="p-4 border rounded-xl bg-white shadow-sm ring-offset-background focus:outline-2 focus:outline-amber-500 focus:outline-offset-2 transition-all duration-200">
                                <!-- Stripe Element will be mounted here -->
                            </div>
                        </div>
                        <div>
                            <label for="card-cvc" class="block text-sm font-semibold text-gray-600 mb-2">
                                Code CVC
                            </label>
                            <div id="card-cvc"
                                class="p-4 border rounded-xl bg-white shadow-sm ring-offset-background focus:outline-2 focus:outline-amber-500 focus:outline-offset-2 transition-all duration-200">
                                <!-- Stripe Element will be mounted here -->
                            </div>
                        </div>
                    </div>

                    <div
                        class="flex flex-col gap-4 justify-around lg:flex-row lg:justify-between lg:mx-12 items-center text-xl font-bold">
                        <span>Total de la commande :</span>
                        <span class="text-3xl text-amber-500">{{ cartStore.totalPrice.toFixed(2) }} €</span>
                    </div>

                    <div class="flex justify-center lg:mx-12 mt-4">
                        <Button v-if="!isLoading"
                            class="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-amber-500/20"
                            :disabled="cartStore.totalPrice <= 0" @click="handlePayment">
                            <CreditCardIcon class="w-5 h-5 mr-2" />
                            Payer et Valider la Commande
                        </Button>
                        <Button v-else class="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-amber-500/20"
                            :disabled="true">
                            <CreditCardIcon class="w-5 h-5 mr-2" />
                            En cours de paiement ...
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    </div>
</template>