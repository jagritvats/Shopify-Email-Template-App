import { Button } from '@shopify/polaris';
import React, { useRef } from 'react';

import EmailEditor from 'react-email-editor';
import sample from '../sample.json';

const Template = (props) => {
	const emailEditorRef = useRef(null);

	const saveDesign = () => {
		emailEditorRef.current.editor.saveDesign((design) => {
			console.log('saveDesign', design);
			localStorage.setItem('saved', JSON.stringify(design));

			alert('Design JSON has been logged in your developer console.');
		});
	};

	const exportHtml = () => {
		emailEditorRef.current.editor.exportHtml((data) => {
			const { design, html } = data;
			console.log('exportHtml', html);
			alert('Output HTML has been logged in your developer console.');
		});
	};

	const onDesignLoad = (data) => {
		console.log('onDesignLoad', data);
	};

	const onLoad = () => {
		console.log('onLoad');

		// emailEditorRef.current.editor.addEventListener(
		//   "design:loaded",
		//   onDesignLoad
		// );
		console.log(sample);
		let dt = localStorage.getItem('saved');
		dt = JSON.parse(dt);
		if (dt != null) {
			emailEditorRef.current.editor.loadDesign(dt);
		} else {
			emailEditorRef.current.editor.loadDesign(sample);
		}
	};

	const onReady = () => {
		console.log('onReady');
	};

	return (
		<div>
			<div>
				<h1>Edit Your Email Template</h1>

				<Button onClick={saveDesign}>Save Design</Button>
				<Button onClick={exportHtml}>Export HTML</Button>
			</div>

			<React.StrictMode>
				<EmailEditor
					ref={emailEditorRef}
					onLoad={onLoad}
					onReady={onReady}
				/>
			</React.StrictMode>
		</div>
	);
};

export default Template;
