<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ref } from "vue"
import { toast } from "vue-sonner"

const mail = ref('')
const password = ref('')

const { login } = useStrapiAuth()
const router = useRouter()

const onSubmit = async () => {
    try {
        await login({ identifier: mail.value, password: password.value })
        router.push('/')
    } catch (e) {
        console.log(e)
        toast.error("Email ou mot de passe incorrect.")
    }
}


</script>

<template>
    <div class="flex flex-col gap-6">
        <Card class="overflow-hidden p-0">
            <CardContent class="grid p-0 md:grid-cols-2">
                <form class="p-6 md:p-8" @submit.prevent="onSubmit">
                    <FieldGroup>
                        <div class="flex flex-col items-center gap-2 text-center">
                            <h1 class="text-2xl font-bold">
                                Se connecter à Pizza planet
                            </h1>
                            <p class="text-muted-foreground text-balance">
                                Bon retour ! Connectez-vous pour continuer
                            </p>
                        </div>
                        <Field>
                            <FieldLabel for="email">
                                Email
                            </FieldLabel>
                            <Input id="email" v-model="mail" type="email" placeholder="m@example.com" required />
                        </Field>
                        <Field>
                            <div class="flex items-center">
                                <FieldLabel for="password">
                                    mot de passe
                                </FieldLabel>
                                <!-- //////////////////////////////////////// -->
                                <NuxtLink to="/mot-de-passe-oublie"
                                    class="ml-auto text-sm underline-offset-2 hover:underline">
                                    Mot de passe oublié?
                                </NuxtLink>
                            </div>
                            <Input id="password" v-model="password" type="password" required />
                        </Field>
                        <Field>
                            <Button type="submit">
                                Se connecter
                            </Button>
                        </Field>

                        <FieldDescription class="text-center">
                            <div class="bg-muted rounded-lg border p-3">
                                <p class="text-accent-foreground text-center text-sm">
                                    Pas encore decompte ?
                                    <Button as-child variant="link" class="px-2">
                                        <NuxtLink to="/creer-son-compte">S'enregistrer</NuxtLink>
                                    </Button>
                                </p>
                            </div>
                        </FieldDescription>
                    </FieldGroup>
                </form>
                <div class="bg-muted relative hidden md:block">
                    <NuxtImg src="/logo.jpg" alt="Image"
                        class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
                </div>
            </CardContent>
        </Card>
        <!-- //// -->
        <FieldDescription class="px-6 text-center pt-6">
            En cliquant sur "Continuer", vous acceptez nos <NuxtLink to="#">Conditions d'utilisation</NuxtLink> et
            notre <NuxtLink to="#">Politique de confidentialité</NuxtLink>.
        </FieldDescription>
    </div>
</template>
