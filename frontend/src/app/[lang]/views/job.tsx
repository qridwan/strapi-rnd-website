import { formatDate, getStrapiMedia } from '@/app/[lang]/utils/api-helpers';
import { postRenderer } from '@/app/[lang]/utils/post-renderer';
import Image from 'next/image';

interface Article {
	id: number;
	attributes: {
		title: string;
		description: string;
		slug: string;
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
	const { title, description, publishedAt, cover } = data.attributes;

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
				<p>{publishedAt}</p>

			</div>

			<div className="dark:text-gray-100">
				<p>{description}</p>

				{/* {data.attributes.blocks.map((section: any, index: number) => postRenderer(section, index))} */}
			</div>
		</article>
	);
}
