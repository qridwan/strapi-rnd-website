import { formatDate, getStrapiMedia } from '@/app/[lang]/utils/api-helpers';
import { postRenderer } from '@/app/[lang]/utils/post-renderer';
import Image from 'next/image';
import RichText from '../components/RichText';

interface Article {
	id: number;
	attributes: {
		title: string;
		description: string;
		slug: string;
		ApplicationEnd: string;
		cover: {
			data: {
				attributes: {
					url: string;
				};
			};
		};

		blocks: any[];
		publishedAt: string;
	};
}

export default function Job({ data }: { data: Article }) {
	const { title, description, publishedAt, cover, ApplicationEnd } = data.attributes;

	const imageUrl = getStrapiMedia(cover?.data?.attributes.url);

	return (
		<article className="space-y-8 dark:bg-black dark:text-gray-50">
			{imageUrl && (
				<Image
					src={imageUrl}
					alt="article cover image"
					width={400}
					height={400}
					className="w-full h-96 object-cover rounded-lg"
				/>
			)}
			<div className="space-y-6">
				<h1 className="leading-tight text-5xl font-bold ">{title}</h1>
				<p>{formatDate(publishedAt)}</p>
				<p className='underline bold'>Application Ends in : {formatDate(ApplicationEnd)}</p>

			</div>

			<div className="dark:text-gray-100">
				{/* <p>{description}</p> */}
				<RichText data={{ body: description }} />
				{/* {data.attributes.blocks.map((section: any, index: number) => postRenderer(section, index))} */}
			</div>
		</article>
	);
}
