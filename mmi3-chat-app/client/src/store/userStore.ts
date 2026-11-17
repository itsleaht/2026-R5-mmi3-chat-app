import { create } from "zustand"
import { type User } from "../../../types/events"
type UserState = {
    users: User[]
}

type UserActions = {
    setUsers: (users: User[]) => void,
}

export const useUserStore = create<UserState & UserActions>((set) => ({
    users: [],
    setUsers: (newUsers) => set(() => ({
        users: newUsers
    }))
}))