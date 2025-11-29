<script setup lang="ts">
import { BadgePercentIcon, HomeIcon, LogOut, MenuIcon, PhoneIcon, UserIcon, XIcon } from 'lucide-vue-next';
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
    <header class="fixed w-full z-50 bg-slate-900 text-white p-6 flex justify-between items-center font-mono top-0
    transition-all duration-300 backdrop-blur-md shadow-md py-3">
        <div class="flex items-center gap-4">
            <NuxtLink to="/">
                <NuxtImg src="/logo.jpg" alt="logo" width="46" height="46" />
            </NuxtLink>

            <h1 class="text-2xl font-bold ">
                <NuxtLink to="/">Pizza Planet</NuxtLink>
            </h1>
        </div>

        <!-- Desktop Menu -->
        <nav class="hidden lg:flex items-center gap-4  ">
            <NuxtLink class="font-medium hover:text-amber-500 transition-colors" to="/">Accueil</NuxtLink>
            <NuxtLink class="font-medium hover:text-amber-500 transition-colors" to="/offres">Nos offres</NuxtLink>
            <NuxtLink class="font-medium hover:text-amber-500 transition-colors" to="/contact">Contact</NuxtLink>
            <!-- Si connecté, afficher un bouton avec l'icône du menu -->
            <Button v-if="isConnected" variant="secondary" size="icon" class="relative" @click="toggle">
                <MenuIcon />
                <ul v-if="isOpen"
                    class="bg-white absolute right-0 top-10 w-[200px] shadow-lg rounded-md p-2 flex flex-col justify-start items-start">
                    <li class="my-2 flex gap-4 items-center text-sm font-medium hover:text-amber-500 transition-colors">
                        <UserIcon />
                        <NuxtLink to="/">Mon compte</NuxtLink>
                    </li>
                    <li class="my-2">
                        <p class="my-2 flex gap-4 items-center text-sm font-medium hover:text-amber-500 transition-colorscursor-pointer"
                            @click="onClick">
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


        <!-- Mobile menu  -->
        <nav class="lg:hidden">
            <Button variant="secondary" size="icon" class="relative" @click="toggle">
                <div v-if="isOpen">
                    <XIcon />

                </div>
                <div v-else>
                    <MenuIcon />
                </div>
                <ul v-if="isOpen && !isConnected"
                    class="bg-white absolute right-0 top-10 w-[170px] shadow-lg rounded-md p-2 flex flex-col justify-start items-start opacity-90">
                    <li class="my-2 flex gap-4 items-center text-sm font-medium hover:text-amber-500 transition-colors">
                        <HomeIcon />
                        <NuxtLink to="/">Accueil</NuxtLink>
                    </li>
                    <li class="my-2 flex gap-4 items-center text-sm font-medium hover:text-amber-500 transition-colors">
                        <UserIcon />
                        <NuxtLink to="/se-connecter">Se connecter</NuxtLink>
                    </li>
                    <li class="my-2 flex gap-4 items-center text-sm font-medium hover:text-amber-500 transition-colors">
                        <BadgePercentIcon />
                        <NuxtLink to="/offres">Nos offres</NuxtLink>
                    </li>
                    <li class="my-2 flex gap-4 items-center text-sm font-medium hover:text-amber-500 transition-colors">
                        <PhoneIcon />
                        <NuxtLink to="/contact">Contact</NuxtLink>
                    </li>


                </ul>
                <ul v-if="isOpen && isConnected"
                    class="bg-white absolute right-0 top-10 w-[170px] shadow-lg rounded-md p-2 flex flex-col justify-start items-start opacity-90">
                    <li class="my-2 flex gap-4 items-center text-sm font-medium hover:text-amber-500 transition-colors">
                        <HomeIcon />
                        <NuxtLink to="/">Accueil</NuxtLink>
                    </li>

                    <li class="my-2 flex gap-4 items-center text-sm font-medium hover:text-amber-500 transition-colors">
                        <BadgePercentIcon />
                        <NuxtLink to="/offres">Nos offres</NuxtLink>
                    </li>
                    <li class="my-2 flex gap-4 items-center text-sm font-medium hover:text-amber-500 transition-colors">
                        <PhoneIcon />
                        <NuxtLink to="/contact">Contact</NuxtLink>
                    </li>
                    <li>
                        <p class="my-2 flex gap-4 items-center text-sm font-medium hover:text-amber-500
                            transition-colors" @click="onClick">
                            <LogOut /> Se déconnecter
                        </p>
                    </li>
                </ul>

            </Button>
        </nav>

    </header>
</template>
