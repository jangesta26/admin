'use server'

import { get } from "./fetch"

export default async function getMe() {
    return get('users/me')
}