<script setup>

</script>

<template>
    <div>
        <h1 class="text-xl font-bold mb-3">Mes commandes</h1>

        <div class="flex flex-col items-center gap-4">

            <Card class="w-full max-w-lg cursor-pointer hover:shadow-md transition-shadow duration-300 p-4">
                <div class="flex justify-between items-center mb-2 border-b pb-2">
                    <p class="text-sm font-semibold text-gray-500">
                        Date de commande :
                        <span class="text-gray-800">16/05/2025</span>
                    </p>
                    <span class="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Livrée</span>
                </div>

                <div class="text-lg font-medium">
                    Pizza Pepperoni
                </div>

                <div class="mt-2 text-right">
                    <Button variant="ghost" size="sm">
                        Voir les détails →
                    </Button>
                </div>
            </Card>
            <Card class="w-full max-w-lg cursor-pointer hover:shadow-md transition-shadow duration-300 p-4">
                <div class="flex justify-between items-center mb-2 border-b pb-2">
                    <p class="text-sm font-semibold text-gray-500">
                        Date de commande :
                        <span class="text-gray-800">16/06/2025</span>
                    </p>
                    <span class="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Livrée</span>
                </div>

                <div class="text-lg font-medium">
                    Pizza Pepperoni
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