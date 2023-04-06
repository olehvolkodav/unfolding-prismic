import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import { Title, Caption, Text } from "components/atoms/Typography";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Client } from "utils/prismicHelpers";
import Prismic from "@prismicio/client";

const Testimonial = ({ slice }) => {
  const [initialLoading, setInitialLoading] = useState(true);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    afterChange: () => {
      setInitialLoading(false);
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1
        }
      },
    ]
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const client = Client();
      const data = await client.query(
        Prismic.Predicates.at("document.type", "testimonials")
      );
      setData(data.results);
    })();
  }, []);

  return (
    <Container bgColor={slice.primary.background_color} initialLoading={initialLoading} isMobileHide = {slice.primary.hide_on_mobile}>
      <Title size="2.5" weight="800" height="120" id="headline">
        {RichText.asText(slice.primary.headline)}
      </Title>
      <Slider {...settings}>
        {data.map((item, index) => (
          <Feedback key={index}>
            <div>
              <div>
                <Title>{RichText.asText(item.data.name)}</Title>
                <Caption>{RichText.asText(item.data.title)}</Caption>
              </div>
            </div>
            <Text>{RichText.asText(item.data.content)}</Text>
          </Feedback>
        ))}
      </Slider>
    </Container>
  );
};

export default Testimonial;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 40px 80px;

  #headline {
    margin-bottom: 60px;
  }
  .slick-track {
    transform: ${({ initialLoading }) => !initialLoading ? "" : "translate3d(0px, 0px, 0px) !important;"};
  }
  @media (max-width: 576px) {
    display: ${({ isMobileHide }) => isMobileHide ? "none" : "flex"};
  }
  @media (max-width: 768px) {
    #headline {
      font-size: 1.5rem;
    }
  }

  @media (min-width: 1025px) {
    padding: 80px 85px 80px;

    .slick-slide {
      div {
        padding-left: 100px;
      }
    }

    #headline {
      padding: 0 24%;
    }
  }
`;
const Feedback = styled.div`
  width: auto !important;
  display: flex;
  flex-direction: column;
  border-left: 3px solid #31ade3;
  padding: 0 30px !important;
  min-height: 150px;
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 !important;
    margin-bottom: 20px;
    img {
      width: 80px;
      height: 80px;
    }
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 0px;
      h3 {
        margin: 0;
        text-align: left;
        width: 100%;
        font-size: 1.5rem;
      }
      h5 {
        margin: 10px 0 0;
        text-align: left;
        font-size: 1rem;
        font-weight: 100;
        color: #949393;
      }
    }
  }
  span {
    line-height: 160%;
    font-size: 1rem;
    font-weight: 100;
    color: #949393;
  }
`;
