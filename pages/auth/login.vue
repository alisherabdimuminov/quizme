<template>
    <div class="grid grid-cols-1 md:grid-cols-2 p-5 h-full">
        <div class="hidden md:block bg-blue-300/10 h-full rounded-md">

        </div>
        <div class="p-5 mt-20 items-center justify-center">
            <p class="font-bold text-2xl">Login your account</p> <br>
            <p class="text-red-500">{{ data.error }}</p>
            <label for="username">Username</label>
            <input v-model="data.username" type="text" id="username" class="w-full block py-1 px-3 border border-slate-900/10 rounded-md outline-none focus:ring-1 focus:ring-blue-800"> <br>
            
            <label for="password">Password</label>
            <input v-model="data.password" type="password" id="password" class="w-full block py-1 px-3 border border-slate-900/10 rounded-md outline-none focus:ring-1 focus:ring-blue-800"> <br>
        
            <button @click="login" class="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 rounded-md text-xl">Login</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/compossables/useAuth';

const { setUser } = useAuth();
const router = useRouter();

useHead({
    title: "Login"
});

const data = reactive({
    username: "",
    password: "",
    error: ""
});

const login = async () => {
    try {
        let response: object = await $fetch("http://quizmenuxt.pythonanywhere.com/quizzes/login/", {
            method: "POST",
            body: JSON.stringify({
                username: data.username,
                password: data.password
            })
        });
        if (response.error === null) {
            setUser(response.token);
            router.push('/')

        } else {
            data.error = response.error;
        }

    } catch {

    }

}
</script>
