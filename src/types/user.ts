export type UserProfile = {
    username: string
    email: string
    profile: [{
        email: string
        firstName: string
        lastName: string
        provider: string
    }]
}
