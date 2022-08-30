import {
	Card,
	Frame,
	Heading,
	Page,
	PageActions,
	Spinner,
	Stack,
	Toast,
} from '@shopify/polaris';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import EmailEditor from 'react-email-editor';
import { useNavigate, useParams } from 'react-router-dom';
import SendMailComponent from '../../components/SendMail';

const Template = () => {
	const queryParams = new URLSearchParams(window.location.search);
	const params = useParams();

	console.log('param id ', params.id);
	const sample = {};
	const emailEditorRef = useRef(null);

	// useEffect(); // load data from backend which id, which will query mongodb
	const [template, setTemplate] = useState({});
	const [loading, setLoading] = useState(true);
	const [html, setHtml] = useState('');

	useEffect(async () => {
		setLoading(true);
		const resp = await axios.get(
			`/api/template/${params.id}?` + queryParams.toString()
		);
		console.log(resp.data[0]);
		setTemplate(resp.data[0].template);
		setLoading(false);
	}, []);

	const saveDesign = () => {
		emailEditorRef.current.editor.saveDesign(async (design) => {
			// console.log('saveDesign', design);
			setTemplate(design);
			const data = await axios.patch(
				'/api/template?' + queryParams.toString(),
				{ name: params.id, template: design }
			);
			// console.log('axios data ', data);

			toggleActive();
		});
	};

	const exportHtml = () => {
		emailEditorRef.current.editor.exportHtml((data) => {
			const { design, html } = data;
			// console.log('exportHtml', html);
			setHtml(html);
			alert('Output HTML is now present in the textbox below.');
		});
	};

	const deleteDesign = async () => {
		const res = await axios.delete(
			`/api/template/${params.id}?` + queryParams.toString()
		);
		toggleActiveDel();
	};

	const onLoad = () => {
		console.log('onLoad');
	};

	if (!loading) {
		emailEditorRef.current.editor.loadDesign(template);
	}

	const onReady = () => {
		console.log('onReady');
	};

	// toast

	const [active, setActive] = useState(false);
	const [activeDel, setActiveDel] = useState(false);

	const toggleActive = useCallback(() => setActive((active) => !active), []);
	const toggleActiveDel = useCallback(() => {
		setActiveDel((activedel) => !activedel);
		// navigate('/?' + queryParams.toString());
	}, []);

	const toastMarkup = active ? (
		<Toast content="Design Saved" onDismiss={toggleActive} />
	) : null;

	const toastMarkupDel = activeDel ? (
		<Toast content="Design Deleted" onDismiss={toggleActiveDel} />
	) : null;

	return (
		<Frame>
			<Page fullWidth>
				<Stack vertical>
					<Stack vertical>
						<Heading> Email Template : {params.id} </Heading>
					</Stack>

					<Card>
						{loading ? <Spinner /> : ''}
						<React.StrictMode>
							<EmailEditor
								ref={emailEditorRef}
								onLoad={onLoad}
								onReady={onReady}
							/>
						</React.StrictMode>
					</Card>
					{toastMarkup}
					{toastMarkupDel}
				</Stack>

				<PageActions
					primaryAction={{
						content: 'Save',
						onAction: saveDesign,
					}}
					secondaryActions={[
						{
							content: 'Show HTML',
							onAction: exportHtml,
						},
						{
							content: 'Delete',
							onAction: deleteDesign,
							destructive: true,
						},
					]}
				/>
			</Page>

			<SendMailComponent html={html} />
		</Frame>
	);
};

export default Template;
