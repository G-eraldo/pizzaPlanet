<script setup lang="ts">

import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ref } from "vue";
import { toast } from "vue-sonner";

const name = ref('')
const email = ref('')
const password = ref('')




const { register } = useStrapiAuth()
const router = useRouter()

const onSubmit = async () => {
    try {
        await register({ username: name.value, email: email.value, password: password.value })

        router.push('/')
        toast.success("Compte créé avec succès.")
    } catch (e) {
        console.log(e)
        toast.error("Problème lors de la création du compte.")
    }
}

</script>

<template>
    <form class="flex flex-col gap-6" @submit.prevent="onSubmit">
        <FieldGroup>
            <div class="flex flex-col items-center gap-1 text-center">
                <h1 class="text-2xl font-bold">
                    Crée ton compte Pizza planet
                </h1>
                <p class="text-muted-foreground text-xs text-balance">
                    Remplis le formulaire ci-dessous pour créer ton compte
                </p>
            </div>
            <Field>
                <FieldLabel for="name">
                    Pseudo
                </FieldLabel>
                <Input id="name" v-model="name" type="text" placeholder="John Doe" required />
            </Field>
            <Field>
                <FieldLabel for="email">
                    Email
                </FieldLabel>
                <Input id="email" v-model="email" type="email" placeholder="m@example.com" required />
                <FieldDescription class="text-xs">
                    Nous l'utiliserons pour te contacter. ton adresse e-mail ne sera partagée avec personne.
                </FieldDescription>
            </Field>
            <Field>
                <FieldLabel for="password">
                    Mot de passe
                </FieldLabel>
                <Input id="password" v-model="password" type="password" required />
                <FieldDescription class="text-xs">
                    Doit comporter un minimum de 6 caractères.
                </FieldDescription>
            </Field>
            <Field>
                <Button>
                    Crée ton compte
                </Button>
            </Field>
            <Field>

                <FieldDescription class="px-6 text-center">
                    Déjà un compte ?<NuxtLink to="/se-connecter">Se connecter</NuxtLink>
                </FieldDescription>
            </Field>
        </FieldGroup>
    </form>
</template>
