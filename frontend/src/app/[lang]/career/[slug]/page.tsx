import { fetchAPI } from '@/app/[lang]/utils/fetch-api';
import Post from '@/app/[lang]/views/post';
import type { Metadata } from 'next';
import Job from '../../views/job';

async function getPostBySlug(slug: string) {
	const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
	const path = `/careers`;
	const urlParamsObject = {
		filters: { slug },
		populate: {
			cover: { fields: ['url'] },
			blocks: {
				populate: {
					'__component': '*',
					'cover': '*',
					'body': '*',
					'title': '*',
					'description': '*',
				}
			},
		},
	};
	const options = { headers: { Authorization: `Bearer ${token}` } };
	const response = await fetchAPI(path, urlParamsObject, options);
	return response;
}

async function getMetaData(slug: string) {
	const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
	const path = `/careers`;
	const urlParamsObject = {
		filters: { slug },
		populate: { seo: { populate: '*' } },
	};
	const options = { headers: { Authorization: `Bearer ${token}` } };
	const response = await fetchAPI(path, urlParamsObject, options);
	return response.data;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
	const meta = await getMetaData(params.slug);
	const metadata = meta[0].attributes.seo;

	return {
		title: metadata.metaTitle,
		description: metadata.metaDescription,
	};
}

export default async function PostRoute({ params }: { params: { slug: string } }) {
	const { slug } = params;
	const data = await getPostBySlug(slug);
	console.log('data: ', data);
	if (data.data.length === 0) return <h2>no job found</h2>;
	return <Job data={data.data[0]} />;
}

export async function generateStaticParams() {
	const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
	const path = `/careers`;
	const options = { headers: { Authorization: `Bearer ${token}` } };
	const articleResponse = await fetchAPI(
		path,
		{
			url: ['cover'],
		},
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
