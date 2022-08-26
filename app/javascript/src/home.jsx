import React from "react";
import { Container } from "semantic-ui-react";
import ImageCarousel from "@components/home/ImageCarousel";
import FrontPageGrid from "@components/home/FrontPageGrid";
import Footer from "@components/home/Footer";

import "pure-react-carousel/dist/react-carousel.es.css";
//remember to keep the above css. It is for the carousel

const Home = () => {
  return (
    <>
      <Container style={{ marginTop: 20 }}>
        <ImageCarousel />
        <FrontPageGrid />
        <Footer />
      </Container>
    </>
  );
};

export default Home;
