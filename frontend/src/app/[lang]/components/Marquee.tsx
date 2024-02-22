'use client'
import React from 'react';

const Marquee = (props: any) => {

	console.log('props: ', props.data);

	const { feature } = props.data || {};

	return (
		<div className="container m-auto relative flex overflow-x-hidden mb-4 bg-slate-50">
			<div className="absolute left-0 z-40 bg-primary p-2 text-white text-sm md:text-lg">Headline</div>
			<div className="z-30 cursor-pointer animate-marquee hover:animate-none whitespace-nowrap text-accent py-2">
				{feature?.map((item: { id: number, text: string }) => <span key={item.id} className="text-xs md:text-xl mx-2 md:mx-4">{item.text}</span>)}
			</div>
		</div>
	);
};

export default Marquee;