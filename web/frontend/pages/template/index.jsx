import {
	Button,
	Card,
	Frame,
	Heading,
	Page,
	Stack,
	TextField,
	Toast,
} from '@shopify/polaris';
import React, { useCallback, useRef, useState } from 'react';

import EmailEditor from 'react-email-editor';
import axios from 'axios';
import SendMailComponent from '../../components/SendMail';

const Template = () => {
	const emailEditorRef = useRef(null);
	const [name, setName] = useState('');
	const [html, setHtml] = useState('');
	const queryParams = new URLSearchParams(window.location.search);

	const saveDesign = async () => {
		if (!name) {
			return alert('Provide a valid name');
		}
		let nm = name;
		nm = nm.trim();
		nm = nm.replace(/ /g, '-');

		emailEditorRef.current.editor.saveDesign(async (design) => {
			const existing = await axios.post(
				'/api/templates/dup?' + queryParams.toString(),
				{
					name: nm,
				}
			);
			// console.log(existing);
			if (existing.data.length != 0) {
				return alert('Duplicate Names not allowed');
			}
			// console.log('saveDesign', design);
			const data = await axios.post(
				'/api/template?' + queryParams.toString(),
				{ name: nm, template: design }
			);
			// console.log('axios data ', data);
			// localStorage.setItem('saved', JSON.stringify(design));

			toggleActive();
		});
	};

	const exportHtml = () => {
		emailEditorRef.current.editor.exportHtml((data) => {
			const { design, html } = data;
			setHtml(html);
		});
	};

	const onLoad = () => {
		console.log('onLoad');
	};

	const onReady = () => {
		console.log('onReady');
	};

	// toast

	const [active, setActive] = useState(false);

	const nameChandler = useCallback((newValue) => setName(newValue), []);

	const toggleActive = useCallback(() => setActive((active) => !active), []);

	const toastMarkup = active ? (
		<Toast content="Design Saved" onDismiss={toggleActive} />
	) : null;

	return (
		<Frame>
			<Page fullWidth>
				<Stack vertical>
					<Heading> Email Template </Heading>

					<TextField
						label="Template name"
						value={name}
						onChange={nameChandler}
						// autoComplete="off"
					/>
					<Stack>
						<Button onClick={saveDesign}>Save Design</Button>
						<Button onClick={exportHtml}>Export HTML</Button>
					</Stack>
				</Stack>

				<Card>
					<React.StrictMode>
						<EmailEditor
							ref={emailEditorRef}
							onLoad={onLoad}
							onReady={onReady}
						/>
					</React.StrictMode>
				</Card>
				{toastMarkup}

				<Card>
					{/* <div dangerouslySetInnerHTML={{ __html: html }}></div> */}
					<SendMailComponent html={html} />
				</Card>
			</Page>
		</Frame>
	);
};

export default Template;
