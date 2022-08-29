import {
	Card,
	Page,
	Layout,
	TextContainer,
	Image,
	Stack,
	Link,
	Heading,
} from '@shopify/polaris';
import { useEffect } from 'react';

import EmailEditor from 'react-email-editor';

import { trophyImage } from '../assets';

export default function HomePage() {
	useEffect(() => {
		// try {
		//   const data = await queryClient.fetchQuery(queryKey, queryFn)
		// } catch (error) {
		//   console.log(error)
		// }
	}, []);
	return (
		<Page narrowWidth>
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
										Nice work on building a Shopify app 🎉
									</Heading>
									<p>
										Your app is ready to explore! It
										contains everything you need to get
										started including the{' '}
										<Link
											url="https://polaris.shopify.com/"
											external
										>
											Polaris design system
										</Link>
										,{' '}
										<Link
											url="https://shopify.dev/api/admin-graphql"
											external
										>
											Shopify Admin API
										</Link>
										, and{' '}
										<Link
											url="https://shopify.dev/apps/tools/app-bridge"
											external
										>
											App Bridge
										</Link>{' '}
										UI library and components.
									</p>
									<p>
										Ready to go? Start populating your app
										with some sample products to view and
										test in your store.{' '}
									</p>
									<p>
										Learn more about building out your app
										in{' '}
										<Link
											url="https://shopify.dev/apps/getting-started/add-functionality"
											external
										>
											this Shopify tutorial
										</Link>{' '}
										📚{' '}
									</p>
									<p>
										{' '}
										<Link to="/template">Here </Link> Or you
										could just continue here?
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
