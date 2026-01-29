<script setup>
import { toast } from 'vue-sonner'

const user = useStrapiUser()
const { update } = useStrapi()


const name = ref('')
const id = ref('')
const firstName = ref('')
const address = ref('')
const zipCode = ref('')
const city = ref('')
const country = ref('')

watchEffect(() => {
    if (user.value?.userProfile) {
        name.value = user.value.userProfile.name
        firstName.value = user.value.userProfile.firstname
        id.value = user.value.userProfile.documentId || user.value.userProfile.id
        address.value = user.value.userProfile.adress?.street_address || ''
        zipCode.value = user.value.userProfile.adress?.zip_code || ''
        city.value = user.value.userProfile.adress?.city || ''
        country.value = user.value.userProfile.adress?.country || ''
    }
})

const isChanged = ref(false)

const isOnChange = () => {
    isChanged.value = !isChanged.value
}

const SaveInfo = async () => {
    try {
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
    } catch (e) {
        console.error(e)
        toast.error('Erreur: ' + (e.error?.message || e.message || e))
    }
}
</script>

<template>
    <div class="mb-10">
        <h1 class="text-xl font-bold mb-8">Mes Informations</h1>
        <div class="flex justify-center">

            <Card class="w-full max-w-lg p-6 shadow-lg">
                <div class="space-y-4">

                    <div class="flex items-center">
                        <Label class="w-32 font-semibold">Nom :</Label>
                        <Input v-if="isChanged" v-model="name" class="grow" />
                        <p v-else class="grow">{{ name }}</p>
                    </div>

                    <div class="flex items-center">
                        <Label class="w-32 font-semibold">Prénom :</Label>
                        <Input v-if="isChanged" v-model="firstName" class="grow" />
                        <p v-else class="grow">{{ firstName }}</p>
                    </div>

                    <hr class="my-4 border-gray-200">

                    <div class="flex items-center">
                        <Label class="w-32 font-semibold">Adresse :</Label>
                        <Input v-if="isChanged" v-model="address" class="grow" />
                        <p v-else class="grow">{{ address }}</p>
                    </div>

                    <div class="flex items-center">
                        <Label class="w-32 font-semibold">Code Postal :</Label>
                        <Input v-if="isChanged" v-model="zipCode" class="grow" />
                        <p v-else class="grow">{{ zipCode }}</p>
                    </div>

                    <div class="flex items-center">
                        <Label class="w-32 font-semibold">Ville :</Label>
                        <Input v-if="isChanged" v-model="city" class="grow" />
                        <p v-else class="grow">{{ city }}</p>
                    </div>

                    <div class="flex items-center">
                        <Label class="w-32 font-semibold">Pays :</Label>
                        <Input v-if="isChanged" v-model="country" class="grow" />
                        <p v-else class="grow">{{ country }}</p>
                    </div>
                </div>

                <div class="flex gap-4 justify-center mt-6 pt-4 border-t border-gray-100">
                    <Button variant="outline" @click="isOnChange">
                        {{ isChanged ? 'Annuler' : 'Modifier' }}
                    </Button>
                    <Button v-if="isChanged" variant="default" @click="SaveInfo">
                        Enregistrer
                    </Button>
                </div>
            </Card>
        </div>
    </div>
</template>
