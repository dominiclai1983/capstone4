import { CarouselProvider, Image, Slide, Slider } from 'pure-react-carousel';
import React from 'react';
import { Divider } from 'semantic-ui-react';

import CustomDotGroup from './CustomDotGroup';

const ImageCarousel = () => (
	<CarouselProvider
		naturalSlideWidth={2.16}
		naturalSlideHeight={1}
		totalSlides={1}
	>
		<Slider>
			<Slide tag='a' index={0}>
				<Image src='https://i.imgur.com/9mfqxL9.jpg' />
			</Slide>
		</Slider>

		<Divider />
		<CustomDotGroup slides={3} />
	</CarouselProvider>
);

export default ImageCarousel;
