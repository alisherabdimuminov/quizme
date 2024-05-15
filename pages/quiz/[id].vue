<template>
    <div class="bg-blue-300/10 h-full p-5 md:px-20">
        <div v-if="data.loading" class="loader"></div>
        <p class="text-center text-xl">{{ data.quiz.name }}</p> <br>
        <div v-for="(question, index) in data.quiz.questions" :key="index">
            <div class="bg-white flex p-2 md:p-5 rounded-md border">
                <p class="bg-blue-300/10 h-fit rounded-full px-2 mr-2">{{ index + 1 }}</p>
                <p>{{ question.question }}</p>
            </div>
            <div id="answers" class="grid grid-cols-1 md:grid-cols-2">
                <div>
                    <input :name="'q_' + question.id" :id="'q_' + question.id + '_answer_a'" type="radio" :value="'a'" v-model="data.answers[question.id]">
                    <label :for="'q_' + question.id + '_answer_a'" class="m-2 bg-white m-1 p-1 rounded-md border block text-center">{{ question.answer_a }}</label>
                </div>
                <div>
                    <input :name="'q_' + question.id" :id="'q_' + question.id + '_answer_b'" type="radio" :value="'b'" v-model="data.answers[question.id]">
                    <label :for="'q_' + question.id + '_answer_b'" class="m-2 bg-white m-1 p-1 rounded-md border block text-center">{{ question.answer_b }}</label>
                </div>
                <div>
                    <input :name="'q_' + question.id" :id="'q_' + question.id + '_answer_c'" type="radio" :value="'c'" v-model="data.answers[question.id]">
                    <label :for="'q_' + question.id + '_answer_c'" class="m-2 bg-white m-1 p-1 rounded-md border block text-center">{{ question.answer_c }}</label>
                </div>
                <div>
                    <input :name="'q_' + question.id" :id="'q_' + question.id + '_answer_d'" type="radio" :value="'d'" v-model="data.answers[question.id]">
                    <label :for="'q_' + question.id + '_answer_d'" class="m-2 bg-white m-1 p-1 rounded-md border block text-center">{{ question.answer_d }}</label>
                </div>
            </div>
        </div>
    </div>
    <div class="fixed bottom-0 border-t w-full text-right py-3 bg-white">
        <button @click="() => {router.push('/')}" class="mr-5 border rounded px-3 py-1 bg-indigo-500 text-white font-bold">Ortga</button>
        <button @click="send" class="mr-5 border rounded px-3 py-1 bg-green-500 text-white font-bold">Yuborish</button>
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
    title: `Quiz ${route.params.id}`
});


const data = reactive({
    quiz: {},
    loading: false,
    answers: {}
})

onMounted(async () => {
    data.loading = true
    try {
        let response: [] = await $fetch(`https://quizmenuxt.pythonanywhere.com/quizzes/quiz/${route.params.id}/`, {
            headers: {
                'Authorization': `Token ${getUser.value.user?.token}`
            }
        });
        data.loading = false;
        data.quiz = response;
    }
    catch {
        data.loading = false;
        router.push('/404')
    }
});

const send = async () => {
    try {
        data.loading = true;
        let response: [] = await $fetch(`https://quizmenuxt.pythonanywhere.com/quizzes/quiz/${route.params.id}/check/`, {
            headers: {
                'Authorization': `Token ${getUser.value.user?.token}`
            },
            method: "POST",
            body: JSON.stringify({
                answers: data.answers
            })
        });
        data.loading = false;
        router.push({ path: "/result", query: {score: response.score} })
    } catch {
        data.loading = false;   
    }
};
</script>

<style>

input[type=radio] {
    display: none;
}

input[type=radio]:checked + label {
    @apply bg-indigo-500 text-white;
}

</style>
