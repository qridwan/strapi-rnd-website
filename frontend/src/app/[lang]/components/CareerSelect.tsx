import Link from "next/link";



interface Article {
	id: number;
	attributes: {
		Title: string;
		slug: string;
	};
}



export default function CareerSelect({
	articles,
	params,
}: {
	articles: Article[];
	params: {
		slug: string;
		category: string;
	};
}) {

	return (
		<div className="p-4 rounded-lg dark:bg-gray-900 min-h-[365px] relative">


			<div>


				<div className="space-y-2">
					<h4 className="text-lg font-semibold">Other Jobs You May Like</h4>
					<ul className="ml-4 space-y-1 list-disc">
						{articles.map((article: Article) => {
							return (
								<li>
									<Link
										rel="noopener noreferrer"
										href={`/career/${article.attributes.slug}`}
										className={`${params.slug === article.attributes.slug &&
											"text-violet-400"
											}  hover:underline hover:text-violet-400 transition-colors duration-200`}
									>
										{article.attributes.Title}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
}
