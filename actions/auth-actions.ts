"use server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { HOME_ROUTE, ROOT_ROUTE, SESSION_COOKIE_NAME } from "@/constants"

//create a session
export async function createSession(uid:string) {
    cookies().set(SESSION_COOKIE_NAME, uid, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 12,
        path: '/',
    });
    redirect(HOME_ROUTE);
}

//remove a session
export async function removeSession() {
    cookies().delete(SESSION_COOKIE_NAME);
    redirect(ROOT_ROUTE);
}
