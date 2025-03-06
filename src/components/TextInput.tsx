import React, { FC, ReactNode } from "react";
import './styles/TextInput.css'

interface TextInputProps {
	onChange: (text: string) => void
	icon?: ReactNode
}

const TextInput: FC<TextInputProps> = ({...props}) => {

	const {
		onChange,
		icon
	} = props

	return (
		<div className="container">
			<input
				type='text'
				className="inputBox"
				onChange={(event) => onChange(event.target.value)}
			/>
			{
				icon ?? null
			}
		</div>
	)
}

export default TextInput