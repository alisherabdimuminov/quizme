<template>
    <div class="h-full flex items-center justify-center">
        <div>
            <p class="text-5xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {{ route.query.score }} %
            </p> <br>
            <NuxtLink to="/" class="text-blue-800 hover:underline hover:underline-offset-4">
                Bosh sahifaga qaytish
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/compossables/useAuth';

const { getUser } = useAuth();
const route = useRoute();
const router = useRouter();

if (getUser.value.user === undefined) {
    router.push("/auth/login")
}

useHead({
    title: "Natija"
});

onMounted(() => {
    let confettiCode = document.createElement("script");
    confettiCode.innerHTML = `confetti({
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
});`;
    document.documentElement.appendChild(confettiCode);
})
</script>
