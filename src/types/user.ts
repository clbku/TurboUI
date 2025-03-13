export type UserProfile = {
    username: string
    email: string
    profile: [{
        email: string
        firstName: string
        lastName: string
        provider: string
    }]
    sub: string
    given_name: string
    family_name: string
    name: string
    nickname: string
    picture: string
    updated_at: string
}
