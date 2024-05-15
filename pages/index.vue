<template>
    <div class="h-full p-5 md:p-20">
        <div v-if="data.loading" class="loader"></div>
        <div>
            <input type="text" class="w-full block border border-slate-900/10 rounded-md py-1 px-3 outline-none" placeholder="Search">
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 mt-10 gap-5">
            <NuxtLink 
                v-for="(quiz, index) in data.quizzes" :key="index" 
                :to="{name: 'quiz-id', params: {id: quiz.id}}"
                class="w-full border rounded-md p-2"
            >
                <p class="text-2xl">{{ quiz.name }}</p>
                <span>Fan: </span><span class="bg-green-500/10 text-green-500 px-2 rounded-md">{{ quiz.subject.name }}</span>
                <p>Savollar soni: <span>{{ quiz.count_questions }}</span></p>
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
    title: "Bosh sahifa"
});


const data = reactive({
    quizzes: [],
    loading: false
})

onMounted(async () => {
    data.loading = true
    let response: [] = await $fetch("https://quizmenuxt.pythonanywhere.com/quizzes/", {
        headers: {
            'Authorization': `Token ${getUser.value.user?.token}`
        }
    });
    data.loading = false
    data.quizzes = response
});
</script>
