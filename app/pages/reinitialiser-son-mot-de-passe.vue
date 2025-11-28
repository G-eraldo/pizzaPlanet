<script setup lang="ts">
import { ref } from 'vue';
import { toast } from 'vue-sonner';
import Button from '~/components/ui/button/Button.vue';
import Input from '~/components/ui/input/Input.vue';

const route = useRoute()
const password = ref('')
const passwordConfirmation = ref('')
const { resetPassword } = useStrapiAuth()
// 2. On stocke le code reçu dans l'URL (ex: ?code=12345...)
// On s'assure qu'il n'y a aucun espace parasite
const code = decodeURIComponent(route.query.code as string)

const router = useRouter()


const onSubmit = async () => {
    try {
        await resetPassword({ code: code, password: password.value, passwordConfirmation: passwordConfirmation.value })

        router.push('/se-connecter')
        toast.success("Mot de passe modifié avec succès.")
    } catch (e) {
        console.log(e)
        toast.error("Mot de passe similaire.")
        console.log(code)
    }
}
</script>

<template>
    <form class="p-6 max-w-md mx-auto space-y-4 container" @submit.prevent="onSubmit">
        <h1 className="text-xl font-semibold">
            Réinitialiser votre mot de passe
        </h1>

        <Input v-model="password" type="password" placeholder="Entrez votre nouveau mot de passe" required
            class="w-full p-2 border" />
        <Input v-model="passwordConfirmation" type="password" placeholder="Confirmer votre nouveau mot de passe"
            required class="w-full p-2 border" />
        <Button>Réinitialiser le mot de passe</Button>
    </form>
</template>

<style scoped></style>