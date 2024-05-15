export function useAuth() {
    interface User {
        token: string
    }
    const userCookie = useCookie<User | undefined>(
        'user',
        {
            watch: "shallow",
            default: undefined,
            maxAge: 2592000
        }
    )

    const getUser = computed(() => ({
        user: userCookie.value
    }))

    const setUser = (token: string) => {
        userCookie.value = {
            token: token
        }
    }

    const delUser = () => {
        userCookie.value = undefined
        window.location.reload()
    }

    return {
        userCookie,
        getUser,
        setUser,
        delUser
    }
}