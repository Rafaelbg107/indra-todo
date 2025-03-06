import React, { CSSProperties, FC, ReactNode } from "react";
import './styles/TextInput.css'

interface TextInputProps {
	onChange: (text: string) => void
	icon?: ReactNode
	style?: CSSProperties
	placeholder?: string
}

const TextInput: FC<TextInputProps> = ({...props}) => {

	const {
		onChange,
		icon,
		style,
		placeholder
	} = props

	return (
		<div className="container" style={{...style}}>
			<input
				type='text'
				className="inputBox"
				onChange={(event) => onChange(event.target.value)}
				placeholder={placeholder}
			/>
			{
				icon ?? null
			}
		</div>
	)
}

export default TextInput