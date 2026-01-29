<script setup>



const { find } = useStrapi()

const commande = await find("commandes", {
    populate: "*"
})
const user = useStrapiUser()

console.log(commande.data)




</script>
<template>
    <div>
        <h1 class="text-xl font-bold">Mes Commandes</h1>
        <div class="flex justify-center mt-9" v-if="commande.data.length === 0">
            <Card class="w-full max-w-lg p-6 shadow-lg">
                <p>Aucune commande</p>
            </Card>
        </div>
        <div v-for="items in commande.data" :key="items.id" class="flex flex-col items-center mt-9">

            <Card class="w-full max-w-lg cursor-pointer hover:shadow-md transition-shadow duration-300 p-4">

                <div class="flex justify-between items-center mb-2 border-b pb-2">
                    <p class="text-sm font-semibold text-gray-500">
                        Date de commande :
                        <span class="text-gray-800">{{ new Date(items.createdAt).toLocaleDateString('fr-FR') }}</span>
                    </p>
                    <span class="text-xl bg-green-100 text-green-800 px-2 py-0.5 rounded-full">{{ items.status
                        }}</span>
                </div>
                <div v-for="content in items.content" :key="content.id" class="text-lg font-medium">
                    {{ content.title }}
                    {{ content.quantity }}
                    <NuxtImg :src="content.image" :alt="content.title" class="w-16 h-16 object-cover rounded-md" />
                </div>
                <div class="text-lg font-medium">
                    {{ items.amount / 100 }} €
                </div>

                <div class="mt-2 text-right">
                    <Button variant="ghost" size="sm">
                        Voir les détails →
                    </Button>
                </div>

            </Card>

        </div>
    </div>

</template>
<style scoped></style>