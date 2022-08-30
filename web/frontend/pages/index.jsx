import {
	Card,
	Page,
	Layout,
	TextContainer,
	Image,
	Stack,
	Link,
	Heading,
	EmptyState,
	Frame,
	Spinner,
} from '@shopify/polaris';
import { useContext, useEffect } from 'react';

import EmailEditor from 'react-email-editor';
import { useQueryClient } from 'react-query';

import { trophyImage } from '../assets';

//

//  EMAIL SENDER (REACT LIBRARY)

//

export default function HomePage() {
	const client = useQueryClient();
	const queryParams = new URLSearchParams(window.location.search);
	sessionStorage.setItem('params', queryParams);
	console.log(queryParams.toString());
	useEffect(() => {
		// try {
		// 	client.fetchQuery();
		// 	client.fetchQuery(queryKey, queryFn);
		// } catch (error) {
		// 	console.log(error);
		// }

		console.log(queryParams);
	}, []);
	return (
		<Page fullWidth>
			<Layout>
				<Layout.Section>
					<Card sectioned>
						<Stack
							wrap={false}
							spacing="extraTight"
							distribution="trailing"
							alignment="center"
						>
							<Stack.Item fill>
								<TextContainer spacing="loose">
									<Heading>
										Welcome to Email Template Application🎉
									</Heading>

									<p>
										{' '}
										<Link
											url={
												`/template/?` +
												queryParams.toString()
											}
										>
											Create New Templates{' '}
										</Link>{' '}
									</p>

									<p>or</p>

									<p>
										{' '}
										<Link
											url={
												`/templates/?` +
												queryParams.toString()
											}
										>
											Edit your existing templates{' '}
										</Link>{' '}
									</p>
									<p>-</p>
									<p>
										Hope you have fun with this application
									</p>
								</TextContainer>
							</Stack.Item>
						</Stack>
					</Card>
				</Layout.Section>
			</Layout>
		</Page>
	);
}
