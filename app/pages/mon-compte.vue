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
            Bienvenue <span class="font-bold text-amber-500"> {{ user.username }}!</span>
        </CardTitle>

        <InfoCompte />
        <CommandeCompte />

        <CardFooter class="flex justify-center">
            <Button variant="outline" @click="onClick">
                Se déconnecter
            </Button>
        </CardFooter>
    </Card>
</template>

<style scoped></style>