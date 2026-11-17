import type { User } from "../../../../types/events"

type UserListProps = {
    userList: User[]
}

function UserList({ userList }: UserListProps) {
    return (
        <div className="list">
            {userList.map((user) => (
                <li className="list-row" key={user.id}>
                    {user.avatar ? 
                        <div>
                            <img className="size-10 rounded-box" alt="" src={user.avatar}/>
                        </div>
                        : <div className="size-10"></div>
                    }
                    <div className="list-col-grow">
                        <div>{user.username}</div>
                        <div className="text-xs uppercase font-semibold opacity-60">{user.id}</div>
                    </div>
                </li>
            ))}
        </div>
    )
}


export {
    UserList
}