import { fetchAPI } from "@/app/[lang]/utils/fetch-api";



export default async function LayoutRoute({
	children,
}: {
	children: React.ReactNode;
	params: {
		slug: string;
		category: string;
	};
}) {

	return (
		<section className="container p-8 mx-auto space-y-6 sm:space-y-12">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-4">
				<div className="col-span-2">{children}</div>
				<aside>
					{/* Apply Now */}
				</aside>
			</div>
		</section>
	);
}

export async function generateStaticParams() {
	const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
	const path = `/careers`;
	const options = { headers: { Authorization: `Bearer ${token}` } };
	const articleResponse = await fetchAPI(
		path,
		{},
		options
	);

	return articleResponse.data.map(
		(article: {
			attributes: {
				slug: string;

			};
		}) => ({ slug: article.attributes.slug })
	);
}
