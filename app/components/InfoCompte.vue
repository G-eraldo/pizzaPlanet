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
    <div>
        <h1>Mes Informations :</h1>
        <div class="grid grid-row-1 md:grid-row-2 gap-4">
            <div class="grid w-full items-center gap-2">
                <Card>
                    <div class="flex gap-2 items-center">
                        <div class="flex gap-2 items-center">
                            <Label class="w-24">Nom : </Label>
                            <Input v-if="isChanged" v-model="firstName" />
                            <p v-else>{{ firstName }}</p>
                        </div>

                    </div>
                    <div class="flex gap-2 items-center">
                        <Label>Prénom : </Label>
                        <Input v-if="isChanged" v-model="name" />
                        <p v-else>{{ name }}</p>
                    </div>

                    <div class="flex gap-2 items-center">
                        <Label>Adresse : </Label>
                        <Input v-model="address" />
                    </div>
                    <div class="flex gap-2 items-center">
                        <Label>Code Postal : </Label>
                        <Input v-model="zipCode" />
                    </div>
                    <div class="flex gap-2 items-center">
                        <Label>Ville : </Label>
                        <Input v-model="city" />
                    </div>
                    <div class="flex gap-2 items-center">
                        <Label>Pays : </Label>
                        <Input v-model="country" />
                    </div>
                    <div class="flex gap-2 justify-center">
                        <Button v-if="!isChanged" @click="isOnChange">Modifier</Button>
                        <Button v-else @click="isOnChange">Annuler</Button>
                        <Button v-if="isChanged" @click="SaveInfo">Enregistrer</Button>
                    </div>
                </Card>


            </div>
        </div>
    </div>

</template>
