<script setup>

const { logout } = useStrapiAuth()
const onClick = () => {
    logout()
    router.push('/')
}
const router = useRouter()
const user = useStrapiUser()

definePageMeta({
    middleware: 'auth'
})
</script>

<template>
    <Card class="max-w-2xl mx-auto p-4 md:p-6 mt-32 mb-12">

        <CardTitle class="text-xl md:text-2xl font-bold mb-4">
            Mon compte
        </CardTitle>
        <CardDescription class="mb-4 md:mb-6 ">
            Bienvenue, {{ user.username }}!
        </CardDescription>
        <CardDescription>Mes commandes :</CardDescription>

        <div class="grid grid-row-1 md:grid-row-2 gap-4">
            <div class="grid w-full items-center gap-2">
                <Card>
                    <CardDescription class="ml-4 md:ml-6">
                        16/05/2025
                    </CardDescription>
                    <CardContent>Pizza Pepperoni</CardContent>
                </Card>
                <Card>
                    <CardDescription class="ml-4 md:ml-6">
                        16/06/2025
                    </CardDescription>
                    <CardContent>Pizza 4 fromages</CardContent>
                </Card>
                <Card>
                    <CardDescription class="ml-4 md:ml-6">
                        16/02/2025
                    </CardDescription>
                    <CardContent>Pizza Reine</CardContent>
                </Card>
            </div>
        </div>

        <CardFooter class="flex justify-center">
            <Button variant="outline" @click="onClick">
                Se déconnecter
            </Button>
        </CardFooter>
    </Card>
</template>

<style scoped></style>