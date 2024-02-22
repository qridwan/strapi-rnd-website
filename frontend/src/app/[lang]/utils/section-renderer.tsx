import Hero from "../components/Hero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import Email from "../components/Email";
import RichText from "../components/RichText";
import Marquee from "../components/Marquee";
import ImageSlider from "../components/ImageSlider";

export function sectionRenderer(section: any, index: number) {
	console.log('===> section: ==> ', section)
	switch (section.__component) {
		case "sections.marquees":
			return <Marquee key={index} data={section} />;
		// case "shared.slider":
		// 	return <ImageSlider key={index} data={section} />;
		case "sections.hero":
			return <Hero key={index} data={section} />;
		case "sections.features":
			return <Features key={index} data={section} />;
		case "sections.testimonials-group":
			return <Testimonials key={index} data={section} />;
		case "sections.pricing":
			return <Pricing key={index} data={section} />;
		case "sections.lead-form":
			return <Email key={index} data={section} />;
		case "sections.rich-text":
			return <div className="container flex flex-col justify-center p-6 mx-auto lg:flex-row lg:justify-between">
				<RichText key={index} data={{ body: section.content }} />
			</div>
		default:
			return null;
	}
}
