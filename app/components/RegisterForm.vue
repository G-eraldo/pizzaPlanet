<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    FieldDescription
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Label from "./ui/label/Label.vue"

</script>

<template>
    <div class="flex flex-col gap-6">
        <Card class="overflow-hidden p-0">
            <CardContent class="grid p-0 md:grid-cols-2">
                <form class="p-6 md:p-8">
                    <div class="p-8 pb-6">
                        <div>
                            <h1 class="text-title mb-1 mt-4 text-xl font-semibold">
                                Créer votre compte Pizza planet
                            </h1>
                            <p class="text-sm">
                                Bienvenue ! Créez un compte pour commencer
                            </p>
                        </div>

                        <hr class="my-4 border-dashed">

                        <div class="space-y-5">
                            <div class="grid grid-cols-2 gap-3">
                                <div class="space-y-2">
                                    <Label html-for="firstname" class="block text-sm">
                                        Prénom
                                    </Label>
                                    <Input id="firstname" type="text" required name="firstname" />
                                </div>
                                <div class="space-y-2">
                                    <Label html-for="lastname" class="block text-sm">
                                        Nom
                                    </Label>
                                    <Input id="lastname" type="text" required name="lastname" />
                                </div>
                            </div>

                            <div class="space-y-2">
                                <Label html-for="email" class="block text-sm">
                                    Email
                                </Label>
                                <Input id="email" type="email" required name="email" />
                            </div>

                            <div class="space-y-2">
                                <Label html-for="pwd" class="text-title text-sm">
                                    Mot de passe
                                </Label>
                                <Input id="pwd" type="password" required name="pwd" class="input sz-md variant-mixed" />
                            </div>

                            <Button disabled={pending} class="w-full">
                                Continue
                            </Button>
                        </div>
                    </div>

                    <div class="bg-muted rounded-lg border p-3">
                        <p class="text-accent-foreground text-center text-sm">
                            Vous avez déjà un compte ?
                            <Button as-child variant="link" class="px-2">
                                <NuxtLink to="/se-connecter"> Se connecter</NuxtLink>
                            </Button>
                        </p>
                    </div>
                </form>
                <div class="bg-muted relative hidden md:block">
                    <NuxtImg src="/logo.jpg" alt="Image"
                        class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
                </div>
            </CardContent>
        </Card>
        <FieldDescription class="px-6 text-center pt-6">
            En cliquant sur "Continuer", vous acceptez nos <NuxtLink to="#">Conditions d'utilisation</NuxtLink> et
            notre <NuxtLink to="#">Politique de confidentialité</NuxtLink>.
        </FieldDescription>
    </div>
</template>
