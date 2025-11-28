<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import Button from '~/components/ui/button/Button.vue'
import Input from '~/components/ui/input/Input.vue'

const email = ref('')
const { forgotPassword } = useStrapiAuth()
const router = useRouter()

const onSubmit = async () => {
    try {
        await forgotPassword({ email: email.value })

        router.push('/se-connecter')
        toast.success("Si cet email correspond à un compte existant, un lien de réinitialisation vous a été envoyé")
    } catch (e) {
        console.log(e)
        toast.error("Email incorrect ou inconnu.")
    }
}
</script>

<template>
    <form class="p-6 max-w-md mx-auto space-y-4 container pt-40" @submit.prevent="onSubmit">
        <h1 class="text-xl font-semibold">Retrouver votre mot de passe</h1>
        <Input v-model="email" type="email" placeholder="Entrez votre email" required
            class="w-full p-2 border rounded" />
        <Button type="submit">Envoyer</Button>
    </form>

</template>

<style scoped></style>