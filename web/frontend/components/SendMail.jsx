import {
	Button,
	Form,
	FormLayout,
	Page,
	Stack,
	TextField,
	Toast,
	VisuallyHidden,
} from '@shopify/polaris';
import React, { useCallback, useState } from 'react';
import emailjs from '@emailjs/browser';

const SendMailComponent = ({ html }) => {
	const [sub, setSub] = useState('');
	const [sactive, setSactive] = useState(false);
	const [email, setEmail] = useState('');
	const subHandler = (newVal) => setSub(newVal);
	const emailHandler = (newVal) => setEmail(newVal);

	const toggleSactive = useCallback(
		() => setSactive((active) => !active),
		[]
	);
	// todo add toast
	const stoastMarkup = sactive ? (
		<Toast content="Mail Sent !" onDismiss={toggleSactive} />
	) : null;
	// todo unique checks for name
	const sendEmail = (e) => {
		emailjs
			.sendForm(
				'supassisttaskmail',
				'template_dstgrdn',
				e.target,
				'UlfiEQL7frjWvI2K2'
			)
			.then(
				(result) => {
					toggleSactive();
				},
				(error) => {
					console.log(error.text);
				}
			);
	};
	return (
		<Page>
			<Form preventDefault onSubmit={sendEmail}>
				<FormLayout>
					<Stack>
						<TextField
							label="Subject"
							name="subject"
							id="subject"
							value={sub}
							onChange={subHandler}
							autoComplete="off"
							requiredIndicator
						/>
						<TextField
							label="Email To"
							value={email}
							name="to"
							id="to"
							onChange={emailHandler}
							autoComplete="off"
							requiredIndicator
						/>
					</Stack>

					<VisuallyHidden>
						<input
							type="text"
							name="my_html"
							id="my_html"
							value={html}
						></input>
					</VisuallyHidden>

					<textarea
						name="disp"
						id="disp"
						cols="120"
						rows="20"
						disabled
						value={html}
						required
					></textarea>

					<Button submit>Submit</Button>
				</FormLayout>
				{stoastMarkup}
			</Form>
		</Page>
	);
};

export default SendMailComponent;
