import React from "react";
import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import { Title, Caption } from "components/atoms/Typography";
import { Flex, Box } from "reflexbox";

// const Items = [
//   {
//     image: '/ufw-assets/images/region-page/icons/icon-anchor.svg',
//     title: 'Mobilize the Team',
//     description: 'Quidam officiis similique sea ei, vel tollit indoctum efficiendi tantas platonem.',
//   },
//   {
//     image: '/ufw-assets/images/region-page/icons/icon-meter.svg',
//     title: 'Create Training Resources',
//     description: 'Deseruisse definitionem his et, an has veri integre abhorreant, nam alii epicurei.',
//   },
//   {
//     image: '/ufw-assets/images/region-page/icons/icon-church.svg',
//     title: 'Equip the Local Church',
//     description: 'Ea eos essent ornatus percipit, mea an persecuti pertinacia partiendo eu ius.',
//   },
// ]

export default function RegionGoal({ slice }) {
  const primary = slice.primary;
  const Items = slice.items;

  return (
    <SectionWrapper>
      <SectionContentWrapper>
        <TitleWrapper>
          <TopTitle>{primary?.name[0]?.text}</TopTitle>
          <Title size="3">{primary?.headline[0]?.text}</Title>
          <SectionDescription>
            <Caption size="1.2" color="#000">
              {primary?.description[0]?.text}
            </Caption>
          </SectionDescription>
        </TitleWrapper>
        <CardsWrapper>
          <Flex flexWrap="wrap">
            {Items?.map((item, index) => (
              <Box
                width={[1, 1, 1 / 3]}
                pr={[0, 0, index % 3 !== 2 ? 24 : 0]}
                mb={24}
                key={index}
              >
                <Card>
                  <CardImage
                    src={item?.icon?.url}
                    dimensions={item?.icon?.dimensions}
                  />
                  <CardTitle>{item?.title[0]?.text}</CardTitle>
                  <Caption size="1" color="#8e8e8e">
                    {item?.description[0]?.text}
                  </Caption>
                </Card>
              </Box>
            ))}
          </Flex>
        </CardsWrapper>
      </SectionContentWrapper>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.div`
  background: #e2e2e2;
  z-index: 1;
`;

const SectionContentWrapper = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 40px;
`;

const TitleWrapper = styled.div`
  text-align: center;

  h5 {
    font-weight: 100;
  }
`;

const TopTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: #949494;
  margin-bottom: 30px;
`;

const SectionDescription = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const CardsWrapper = styled.div`
  margin-top: 50px;
`;

const Card = styled.div`
  background: #313131;
  border-radius: 6px;
  padding: 24px;

  h5 {
    text-align: left;
    font-weight: 100;
    margin-bottom: 0;
  }
`;

const CardImage = styled.img`
  width: ${({ dimensions }) => dimensions.width + "px"};
  height: ${({ dimensions }) => dimensions.height + "px"};
`;

const CardTitle = styled.div`
  font-weight: 600;
  font-size: 1.4rem;
  margin: 30px 0 10px;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;
