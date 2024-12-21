import {memo} from 'react'

export type ButtonProps = {
    onClick?: () => void
    children: string
}

function Button(props: ButtonProps) {
    const {children, onClick} = props

    return (
        <button type="button" onClick={onClick}>
            {children}
        </button>
    )
}

export default memo(Button)
