import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia, formatDate } from "../utils/api-helpers";

interface Article {
	id: number;
	attributes: {
		title: string;
		description: string;
		slug: string;
		createdAt: string;
		updatedAt: string;
		publishedAt: string;
		ApplicationEnd: string;
		cover: {
			data: {
				attributes: {
					url: string;
				};
			}
		};
	};
}

export default function PostList({
	data: articles,
	children,
}: {
	data: Article[];
	children?: React.ReactNode;
}) {
	console.log({ articles });
	return (
		<section className="container p-6 mx-auto space-y-6 sm:space-y-12">
			<div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{articles.map((article) => {
					const imageUrl = getStrapiMedia(
						article.attributes?.cover?.data?.attributes.url
					);

					return (
						<Link
							href={`/career/${article.attributes.slug}`}
							key={article.id}
							className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-900 lg:w-[300px] xl:min-w-[375px] rounded-2xl overflow-hidden shadow-lg"
						>
							{imageUrl && (
								<Image
									alt="presentation"
									width="240"
									height="240"
									className="object-cover w-full h-44 "
									src={imageUrl}
								/>
							)}
							<div className="p-6 space-y-2 relative">


								<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
									{article.attributes.title}
								</h3>

								<div className="flex justify-between items-center">
									<span className="text-xs dark:text-gray-400">
										Start: {formatDate(article.attributes.publishedAt)}
										End: {formatDate(article.attributes.ApplicationEnd)}
									</span>

								</div>
								{/* <p className="py-4">{article.attributes.description}</p> */}
							</div>
						</Link>
					);
				})}
			</div>
			{children && children}
		</section>
	);
}
