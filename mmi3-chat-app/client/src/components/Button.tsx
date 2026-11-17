type ButtonProps = {
    onClickButton: (test: string, test2: number) => void,
    children?: React.ReactNode
}

function Button({
    ...otherProps
}: ButtonProps) {
    return (
        <button className="btn btn-neutral" onClick={() => {
            otherProps.onClickButton('hello', 3)
        }}>
            { otherProps.children }
        </button>
    )
}

export {
    Button
}