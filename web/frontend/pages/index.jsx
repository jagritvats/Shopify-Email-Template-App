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
						<EmptyState />
						{/* <Spinner /> */}
						<Stack
							wrap={false}
							spacing="extraTight"
							distribution="trailing"
							alignment="center"
						>
							<Stack.Item fill>
								<TextContainer spacing="loose">
									<Heading>
										Nice work on building a Shopify app 🎉
									</Heading>

									<p>
										{' '}
										<Link
											url={
												`/template/?` +
												queryParams.toString()
											}
										>
											Here{' '}
										</Link>{' '}
										Or you could just continue here?
									</p>

									<EmailEditor />
								</TextContainer>
							</Stack.Item>
						</Stack>
					</Card>
				</Layout.Section>
			</Layout>
		</Page>
	);
}
