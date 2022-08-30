import { Card, Link, Page, Spinner, Stack } from '@shopify/polaris';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

function Templates() {
	const queryParams = new URLSearchParams(window.location.search);
	const navigate = useNavigate();

	const [templates, setTemplates] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(async () => {
		setLoading(true);
		const resp = await axios.get(
			'/api/templates?' + queryParams.toString()
		);
		console.log(resp.data);
		setTemplates(resp.data);
		setLoading(false);
	}, []); // get all templates for that user from backend(which will qu,ery mongodb)

	return (
		<Page>
			<Card
				sectioned
				title="Your Email Templates"
				actions={[
					{
						content: 'New Template',
						onAction: () => {
							navigate('/template?' + queryParams.toString());
						},
					},
				]}
			>
				{loading ? (
					<Stack>
						<Spinner />
					</Stack>
				) : (
					<ul>
						{templates.length == 0 ? <p>No Saved Templates</p> : ''}
						{templates.map((template) => {
							return (
								<li>
									<Link
										url={
											`/template/${template.name}?` +
											queryParams.toString()
										}
									>
										{template.name}
									</Link>
								</li>
							);
						})}
					</ul>
				)}
			</Card>
		</Page>
	);
}

export default Templates;
