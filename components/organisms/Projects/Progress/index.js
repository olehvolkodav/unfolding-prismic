import React from "react";
import styled from "styled-components";
import { Flex, Box } from "reflexbox";
import { Progress } from "react-sweet-progress";
import { Title, Caption } from "components/atoms/Typography";

export default function RegionUpdate({ slice }) {
  const primary = slice.primary;
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
            {slice.items?.map((item, index) => (
              <Box
                width={[1, 1 / 2, 1 / 4]}
                px={[0, 0, 12]}
                mb={24}
                key={item.id}
              >
                <Card>
                  <ProcessWrapper>
                    <Progress type="circle" width="80%" percent={item.value} />
                    <Caption size="1" color="#8e8e8e">
                      {item.label[0]?.text}
                    </Caption>
                  </ProcessWrapper>
                </Card>
              </Box>
            ))}
          </Flex>
        </CardsWrapper>
        <ProgressPlaceholder>
          Placeholder for Progress Visualization
        </ProgressPlaceholder>
      </SectionContentWrapper>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.div`
  background: #fff;
`;

const SectionContentWrapper = styled.div`
  max-width: 1200px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }

  h5 {
    font-weight: 100;
    margin-bottom: 0;
  }
`;

const ProcessWrapper = styled.div`
  width: 100%;
  text-align: center;

  h5 {
    text-align: center;
  }
`;

const ProgressPlaceholder = styled.div`
  margin: 80px 0;
  background: #ccc;
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
