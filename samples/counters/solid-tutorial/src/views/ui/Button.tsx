export type ButtonProps = {
    onClick?: () => void
    children: string
}

function Button(props: ButtonProps) {
    const {children, onClick} = props

    console.log('Button::render')

    return (
        <button type="button" onclick={onClick}>
            {children}
        </button>
    )
}

export default Button
