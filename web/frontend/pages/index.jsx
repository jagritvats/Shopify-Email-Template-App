import {
	Card,
	Page,
	Layout,
	TextContainer,
	Stack,
	Link,
	Heading,
} from '@shopify/polaris';
import { useQueryClient } from 'react-query';

export default function HomePage() {
	const client = useQueryClient();
	const queryParams = new URLSearchParams(window.location.search);
	sessionStorage.setItem('params', queryParams);
	console.log(queryParams.toString());

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
