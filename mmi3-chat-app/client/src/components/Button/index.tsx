import type { ReactEventHandler } from "react"

type ButtonProps = {
    onClick: ReactEventHandler<HTMLButtonElement>,
    children?: React.ReactNode
}

function Button({ children, onClick }: ButtonProps) {
    return (
        <button className="btn btn-neutral" onClick={onClick}>
            { children }
        </button>
    )
}

export {
    Button
}