<script setup>
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

watchEffect(() => {
    if (user.value?.userProfile) {
        name.value = user.value.userProfile.name || ''
        firstName.value = user.value.userProfile.firstname || ''
        id.value = user.value.userProfile.documentId || user.value.userProfile.id
        address.value = user.value.userProfile.adress?.street_address || ''
        zipCode.value = user.value.userProfile.adress?.zip_code || ''
        city.value = user.value.userProfile.adress?.city || ''
        country.value = user.value.userProfile.adress?.country || ''
    }
})

const userProfileOk = ref(false)

watchEffect(() => {
    if (user.value?.userProfile) {
        userProfileOk.value = true
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
            userProfileOk.value = true
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



// const cartStore = useCartStore()

</script>

<template>
    <div class="mt-32">
        <h1>Mes Informations :</h1>
        <div class="flex justify-center">

            <Card class="w-full max-w-lg p-6 shadow-lg">
                <div class="space-y-4">

                    <div class="flex items-center">
                        <Label class="w-32 font-semibold">Nom :</Label>
                        <Input v-if="!userProfileOk || isChanged" v-model="name" class="grow" />
                        <p v-else class="grow">{{ name }}</p>
                    </div>

                    <div class="flex items-center">
                        <Label class="w-32 font-semibold">Prénom :</Label>
                        <Input v-if="!userProfileOk || isChanged" v-model="firstName" class="grow" />
                        <p v-else class="grow">{{ firstName }}</p>
                    </div>

                    <hr class="my-4 border-gray-200">

                    <div class="flex items-center">
                        <Label class="w-32 font-semibold">Adresse :</Label>
                        <Input v-if="!userProfileOk || isChanged" v-model="address" class="grow" />
                        <p v-else class="grow">{{ address }}</p>
                    </div>

                    <div class="flex items-center">
                        <Label class="w-32 font-semibold">Code Postal :</Label>
                        <Input v-if="!userProfileOk || isChanged" v-model="zipCode" class="grow" />
                        <p v-else class="grow">{{ zipCode }}</p>
                    </div>

                    <div class="flex items-center">
                        <Label class="w-32 font-semibold">Ville :</Label>
                        <Input v-if="!userProfileOk || isChanged" v-model="city" class="grow" />
                        <p v-else class="grow">{{ city }}</p>
                    </div>

                    <div class="flex items-center">
                        <Label class="w-32 font-semibold">Pays :</Label>
                        <Input v-if="!userProfileOk || isChanged" v-model="country" class="grow" />
                        <p v-else class="grow">{{ country }}</p>
                    </div>
                </div>

                <div class="flex gap-4 justify-center mt-6 pt-4 border-t border-gray-100">
                    <Button v-if="userProfileOk" variant="outline" @click="isOnChange">
                        {{ isChanged ? 'Annuler' : 'Modifier' }}
                    </Button>
                    <Button v-if="!userProfileOk || isChanged" variant="default" @click="SaveInfo">
                        Enregistrer
                    </Button>
                </div>
            </Card>
        </div>
    </div>
</template>