import styled from "styled-components";

export const Headline = styled.h1`
  font-size: ${({ size }) => size ?? 4.5}rem;
  color: ${({ color }) => color ?? "#231F20"};
  font-weight: ${({ weight }) => weight ?? 800};
  text-shadow: 2px 2px 10px #00000075;
  ${({ spacing }) => spacing && `letter-spacing: ${spacing}em;`}
  line-height: ${({ height }) => height ?? 120}%;
  text-align: ${({ textAlign }) => textAlign ?? "left"};
  margin-top: 0;
  margin-bottom: 1rem;
  padding: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const HeadlineDiv = styled.div`
  h1 {
    font-size: ${({ size }) => size ?? 4.5}rem;
    color: ${({ color }) => color ?? "#231F20"};
    font-weight: ${({ weight }) => weight ?? 800};
    text-shadow: ${({ isNonShadow }) => isNonShadow ? "none" : "2px 2px 10px #00000075"};
    text-align: ${({ textAlign }) => textAlign ?? "left"};
    margin-top: 0;
    margin-bottom: 1rem;
    padding: 0;
  
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
`

export const SubHeadline = styled.h5`
  font-size: ${({ size }) => size ?? 1.5}rem;
  color: ${({ color }) => color ?? "#231F20"};
  font-weight: ${({ weight }) => weight ?? 400};
  text-shadow: 2px 2px 10px #00000075;
  line-height: ${({ height }) => height ?? 160}%;
  text-align: ${({ textAlign }) => textAlign ?? "left"};
  margin-top: 0;
  margin-bottom: 1rem;
  padding: 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const Title = styled.h3`
  font-size: ${({ size }) => size ?? 2.5}rem;
  color: ${({ color }) => color ?? "#231F20"};
  font-weight: ${({ weight }) => weight ?? 800};
  ${({ spacing }) => spacing && `letter-spacing: ${spacing}em;`}
  line-height: ${({ height }) => height ?? 120}%;
  text-align: center;
  margin-top: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  ${props =>
    props.additionalCss &&
    props.additionalCss
  }
`;

export const TitleDiv = styled.div`
  h1, p {
    font-size: ${({ size }) => size ?? 2.5}rem;
    color: ${({ color }) => color ?? "#231F20"};
    font-weight: ${({ weight }) => weight ?? 800};
    ${({ spacing }) => spacing && `letter-spacing: ${spacing}em;`}
    line-height: ${({ height }) => height ?? 120}%;
    margin-top: 0;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }

    ${props =>
    props.additionalCss &&
    props.additionalCss
  }    
  }
`;

export const Caption = styled.h5`
  font-size: ${({ size }) => size ?? 1.5}rem;
  color: ${({ color }) => color ?? "#231F20"};
  font-weight: ${({ weight }) => weight ?? 800};
  line-height: ${({ height }) => height ?? 160}%;
  margin-bottom: ${({ marginBottom }) => marginBottom ?? "revert"};
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const Text = styled.span`
  font-size: ${({ size }) => size ?? 0.7}rem;
  color: ${({ color }) => color ?? "#231F20"};
  font-weight: ${({ weight }) => weight ?? 400};
  line-height: 160%;
`;

export const Paragraph = styled.p`
  font-size: ${({ size }) => size ?? 0.7}rem;
  color: ${({ color }) => color ?? "#231F20"};
  font-weight: ${({ weight }) => weight ?? 400};
  line-height: 160%;
  margin-top: 0;
`;
