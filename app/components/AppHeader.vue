<script setup lang="ts">
import { LogOut, MenuIcon, UserIcon } from 'lucide-vue-next';
import { ref } from 'vue';
import Button from './ui/button/Button.vue';

const { logout } = useStrapiAuth()
const router = useRouter()

const onClick = () => {
    logout()
    router.push('/')
}
const user = useStrapiUser()
const isConnected = computed(() => user.value)

const isOpen = ref(false)

const toggle = () => {
    isOpen.value = !isOpen.value
}

</script>

<template>
    <header class="bg-slate-900 text-white p-6 flex justify-between items-center font-mono">
        <div class="flex items-center gap-4">
            <NuxtLink to="/">
                <NuxtImg src="/logo.jpg" alt="logo" width="46" height="46" />
            </NuxtLink>

            <h1 class="text-2xl font-bold ">
                <NuxtLink to="/">Pizza Planet</NuxtLink>
            </h1>
        </div>

        <nav class="gap-4 flex items-center">
            <NuxtLink to="/">Accueil</NuxtLink>
            <NuxtLink to="/offres">Nos offres</NuxtLink>
            <NuxtLink to="/">Contact</NuxtLink>
            <!-- Si connecté, afficher un bouton avec l'icône du menu -->
            <Button v-if="isConnected" variant="secondary" size="icon" class="relative" @click="toggle">
                <MenuIcon />
                <ul v-if="isOpen"
                    class="bg-white absolute right-0 top-10 w-[200px] shadow-lg rounded-md p-2 flex flex-col justify-start items-start">
                    <li class="my-2 flex gap-4 items-center">
                        <UserIcon />
                        <NuxtLink to="/">Mon compte</NuxtLink>
                    </li>
                    <li class="my-2">
                        <p class="flex gap-4 items-center cursor-pointer" @click="onClick">
                            <LogOut /> Se déconnecter
                        </p>
                    </li>

                </ul>

            </Button>
            <!-- Sinon, afficher le bouton de connexion -->
            <Button v-else as-child variant="secondary">
                <NuxtLink to="/se-connecter">Connexion</NuxtLink>
            </Button>
        </nav>

    </header>
</template>