<script setup>
import { toast } from 'vue-sonner'

definePageMeta({
    middleware: 'auth'
})

const address = ref('')
const zipCode = ref('')
const city = ref('')
const country = ref('')
const firstName = ref('')
const name = ref('')

const user = useStrapiUser()
const { create } = useStrapi()


const SaveInfo = async () => {
    try {
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
        toast.success('Mise à jour réussie !')
    } catch (e) {
        console.error(e)
        toast.error('Erreur: ' + (e.error?.message || e.message || e))
    }
}


</script>

<template>
    <div class="mt-32">
        <h1>Mes Informations :</h1>
        <div class="grid grid-row-1 md:grid-row-2 gap-4">
            <div class="grid w-full items-center gap-2">
                <Card>
                    <div class="flex gap-2 items-center">
                        <div class="flex gap-2 items-center">
                            <Label class="w-24">Nom : </Label>
                            <Input v-model="firstName" />
                        </div>
                        <div class="flex gap-2 items-center">
                            <Label class="w-24">Prénom : </Label>
                            <Input v-model="name" />
                        </div>

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
                        <Button @click="SaveInfo">Enregistrer</Button>
                    </div>
                </Card>


            </div>
        </div>
    </div>
</template>