export { auth as middleware } from "@/auth";

export const config = {
    matcher: ["/chat", "/chat/:id*", "/register"],
};
