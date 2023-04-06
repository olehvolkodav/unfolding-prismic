import { useState } from "react";
import styled from "styled-components";
import { Title } from "components/atoms/Typography";

const GiveNowDialog = () => {
  const [isOneTimePay, setIsOneTimePay] = useState(true);

  return (
    <Container>
      <SwitchType>
        <SwitchButton
          bgColor="#014263"
          active={isOneTimePay}
          onClick={() => setIsOneTimePay(!isOneTimePay)}
        >
          One Time
        </SwitchButton>
        <SwitchButton
          bgColor="#014263"
          active={!isOneTimePay}
          onClick={() => setIsOneTimePay(!isOneTimePay)}
        >
          Monthly
        </SwitchButton>
      </SwitchType>
      <ChooseSection>
        <Title size="1.5" height="133" weight="800">
          Choose an Amount to Give
        </Title>
        <Amounts>
          <button>$50.00</button>
          <button>$100.00</button>
          <button>$150.00</button>
          <button>$200.00</button>
          <button>Other Amount</button>
        </Amounts>
      </ChooseSection>
      <GiveNowButton bgColor="#014263">Give Now</GiveNowButton>
    </Container>
  );
};

export default GiveNowDialog;

const Container = styled.div`
  display: flex;
  background-color: white;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 36px 48px;
  border-radius: 10px;
  button {
    border-radius: 5px;
  }
`;
const SwitchButton = styled.button`
  padding: 13px 0px;
  font-size: 1rem;
  line-height: 150%;
  font-weight: 600;
  color: white;
  background-color: ${({ active, bgColor }) => (active ? bgColor : "#919090")};
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    filter: brightness(1.2);
  }

  @media (max-width: 560px) {
    margin-bottom: 12px;
    font-size: 0.8rem;
  }

  @media (min-width: 560px) {
    padding: 13px 60px;
  }
`;
const SwitchType = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 560px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;
const ChooseSection = styled.div`
  h3 {
    margin-top: 30px;
    margin-bottom: 10px;
    text-align: left;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const Amounts = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 560px) {
    display: grid;
    grid-gap: 20px 20px;
    grid-template-columns: auto auto auto;
  }

  button {
    padding: 13px 30px;
    background-color: #919090;
    color: white;
    font-size: 1rem;
    line-height: 150%;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    border: none;
    outline: none;
    &:hover {
      filter: brightness(1.2);
    }
    &:last-child {
      grid-column-end: 4;
      grid-column-start: 2;
    }

    @media (max-width: 560px) {
      margin-bottom: 12px;
      font-size: 0.8rem;
    }

    @media (min-width: 560px) {
      padding: 13px 30px;
    }
  }
`;
const GiveNowButton = styled.button`
  margin-top: 20px;
  background-color: ${({ bgColor }) => bgColor};
  color: white;
  font-size: 1rem;
  line-height: 150%;
  font-weight: 600;
  width: 100%;
  padding: 13px 0;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    filter: brightness(1.2);
  }

  @media (max-width: 560px) {
    font-size: 0.8rem;
  }
`;
