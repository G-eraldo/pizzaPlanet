<script setup lang="ts">

import { ref } from 'vue';
import { toast } from 'vue-sonner';
import Button from '~/components/ui/button/Button.vue';
import Input from '~/components/ui/input/Input.vue';
import Label from '~/components/ui/label/Label.vue';

const name = ref('')
const email = ref('')
const phone = ref('')
const textarea = ref('')

async function submitForm() {
    try {
        const response = await $fetch('/api/send', {
            method: 'POST',
            body: ({
                name: name.value,
                email: email.value,
                phone: phone.value,
                textarea: textarea.value
            })
        })
        if (response.success) {
            name.value = ''
            email.value = ''
            phone.value = ''
            textarea.value = ''
            toast.success('Votre message a bien été envoyé !')
        }
    } catch (e) {
        console.log(e)
        toast.error('Une erreur est survenue !')
    }
}

</script>

<template>
    <div class="pt-32 pb-20 bg-slate-50 min-h-screen">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12 max-w-3xl mx-auto">
                <h1 class="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
                    Contactez
                    <span class="text-amber-500">Pizza Planet</span>
                </h1>
                <p class="text-xl text-slate-600">
                    Remplissez ce formulaire si vous avez une question !
                </p>
            </div>

            <div class="max-w-2xl mx-auto">
                <div class="bg-white p-8 rounded shadow-xl border border-slate-100">
                    <h3 class="text-2xl font-bold text-slate-800 mb-6">
                        Formulaire de contact
                    </h3>
                    <form class="space-y-4" @submit.prevent="submitForm">
                        <div>
                            <Label html-for="name" class="block text-sm font-medium text-slate-700 mb-1">
                                Votre Nom
                            </Label>
                            <Input v-model="name" type="text" name="name" required
                                class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 transition duration-150"
                                placeholder="Ex: Nicolas Dubois" />
                        </div>
                        <div>
                            <Label html-for="email" class="block text-sm font-medium text-slate-700 mb-1">
                                Votre Email
                            </Label>
                            <Input v-model="email" type="email" name="email" required
                                class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 transition duration-150"
                                placeholder="me@mail.fr" />
                        </div>
                        <div>
                            <Label html-for="phone" class="block text-sm font-medium text-slate-700 mb-1">
                                Votre numéro de téléphone
                            </Label>
                            <Input v-model="phone" type="tel" name="phone"
                                class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 transition duration-150"
                                placeholder="Ex: 07 67 26 53 66" pattern="0[1-9]([ .-]?[0-9]{2}){4}" />
                        </div>
                        <div>
                            <Label html-for="message" class="block text-sm font-medium text-slate-700 mb-1">
                                Ecrivez votre message
                            </Label>
                            <textarea v-model="textarea" name="message" rows="4" required class="w-full px-4 py-2 border
                                border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 transition
                                duration-150 " placeholder="Posez votre question ici" />

                        </div>
                        <Button class="w-full mt-6">Envoyer</Button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>