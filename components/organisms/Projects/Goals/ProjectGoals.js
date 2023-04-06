import React from "react";
import styled, { css } from "styled-components";

export const ProjectGoals = ({ overview, data }) => {
  return (
    <>
      {
        data?.length > 0 &&
        <ParentGoalsGroup>
          {
            data.map((item, index) => (
              <ParentGoalsWrapper key={index}>
                <ParentGoalsHeading>
                  <h3>{item.label}</h3>
                  <p>{item.description}</p>
                </ParentGoalsHeading>

                <ChildGoalsGroup>
                  {
                    item.children.map((child, index) => (
                      <ProgressChild key={index} data={child} />
                    ))
                  }
                </ChildGoalsGroup>
              </ParentGoalsWrapper>
            ))
          }
        </ParentGoalsGroup>
      }
    </>
  );
};

const ProgressChild = ({ data }) => {
  return (
    <>
      <ChildGoalsWrapper>
        <ChildGoalsHeading>
          <h4>{data.label}</h4>
          <span>{data.summary.percentage}</span>
          <span>{data.summary.short_desc}</span>
          <p>{data.summary.long_description}</p>
        </ChildGoalsHeading>
        <ChildGoalsItemsWrapper>
          <GoalItemsWrapper type={data.format.type}>
            {!!data?.goals && (
              <ProgressGoals format={data.format} data={data.goals} />
            )}
            {!!data?.impact && (
              <ProgressGoals format={{ type: "impact" }} data={data.impact} />
            )}
          </GoalItemsWrapper>
        </ChildGoalsItemsWrapper>
      </ChildGoalsWrapper>
    </>
  );
};

const ProgressGoals = ({ format, data }) => {
  return (
    <>
      {data?.length > 0 && (
        <>
          {data.map((item, index) => {
            if (format.type === "badge") {
              return <BadgeGoal data={item} key={index} />;
            }
            if (format.type === "metric") {
              return <MetricGoal data={item} key={index} />;
            }
            if (format.type === "icon") {
              return <IconGoal icon={format.icon} data={item} key={index} />;
            }

            if (format.type === "impact") {
              return <ImpactGoal data={item} key={index} />;
            }

            return <div>Missing Goal Type</div>;
          })}
        </>
      )}
    </>
  );
};

const ImpactGoal = ({ data }) => {
  return (
    <>
      <MetricGoalWrapper key={data.key} status={data.status} impact={true}>
        <MetricGoalQty impact={true}>{data.qty.label}</MetricGoalQty>
        <MetricGoalLabel>{data.label}</MetricGoalLabel>
        <MetricGoalStatus>In Progress</MetricGoalStatus>
        <MetricTypeBadge>Key Impact</MetricTypeBadge>
      </MetricGoalWrapper>
    </>
  );
};

const BadgeGoal = ({ data }) => {
  return (
    <>
      <BadgeGoalWrapper key={data.key} status={data.status}>
        {data.label}
      </BadgeGoalWrapper>
    </>
  );
};

const MetricGoal = ({ data }) => {
  return (
    <>
      <MetricGoalWrapper key={data.key} status={data.status}>
        <MetricGoalQty status={data.status}>{data.qty.label}</MetricGoalQty>
        <MetricGoalLabel>{data.label}</MetricGoalLabel>
        <MetricGoalStatus>
          {data.status === 1 ? "Completed" : "In Progress"}
        </MetricGoalStatus>
      </MetricGoalWrapper>
    </>
  );
};

const IconGoal = ({ icon, data }) => {
  const iconOn =
    icon === "pdf"
      ? "/ufw-assets/images/icons/icon-pdf-blue.svg"
      : "/ufw-assets/images/icons/icon-circle-checked-blue.svg";
  const iconOff =
    icon === "pdf"
      ? "/ufw-assets/images/icons/icon-pdf-grey.svg"
      : "/ufw-assets/images/icons/icon-circle-grey.svg";

  return (
    <>
      <IconGoalWrapper key={data.key} status={data.status}>
        <IconGoalIcon src={!!data.status ? iconOn : iconOff} />
        {data.label}
      </IconGoalWrapper>
    </>
  );
};

const ParentGoalsGroup = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ParentGoalsWrapper = styled.li``;

const ParentGoalsHeading = styled.div`
  & > h3 {
    font-size: 2.5rem;
    border-bottom: solid 3px #000;
    margin-bottom: 0.2rem;
  }
  & > p {
    font-size: 1.1rem;
    line-height: 1.5rem;
  }
`;

const ChildGoalsGroup = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ChildGoalsWrapper = styled.li`
  & {
    margin-bottom: 3rem;
  }
`;
const ChildGoalsHeading = styled.div`
  & h4 {
    font-size: 1.3rem;
    font-weight: normal;
    margin-bottom: 0;
  }

  & span {
    font-size: 0.8rem;
    font-weight: bold;
    color: #1fa6da;
    margin-right: 0.5rem;
  }

  & p {
    margin-top: 0.5rem;
    color: #a2a2a2;
    font-size: 1.1rem;
    line-height: 1.5rem;
  }
`;

const ChildGoalsItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  box-sizing: border-box;
  width: 100%;
`;

const GoalItemsWrapper = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  
  ${({ type }) => type === "badge" && css`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  `}

  ${({ type }) => type === "metric" && css`
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 2rem 1.5rem;

    @media (min-width: 768px) {
      display: flex;
    }
  `}

  ${({ type }) => type === "impact" && css``}

  ${({ type }) => type === "icon" && css`
    display: block;
    @media (min-width: 768px) {
      display: block;
    }
  `}
`;

const BadgeGoalWrapper = styled.li`
  padding: 8px 8px 5px;
  border-radius: 5px;
  color: #fff;
  text-transform: uppercase;
  margin-right: 1rem;
  background-color: #a2a2a2;
  text-align: center;
  font-size: 0.8rem;
  line-height: 0.8rem;
  display: block;
  margin-bottom: 1rem;

  ${({ status }) =>
    status === 1 &&
    css`
      background-color: #1fa6da;
    `}
`;

const MetricGoalWrapper = styled.li`  
  padding: 0;
  opacity: 0.5;

  ${({ status, impact }) =>
    (status === 1 || !!impact) &&
    css`
      opacity: 1;
    `};

  @media (min-width: 768px) {
    margin-right: 2rem;
  }
`;

const MetricGoalQty = styled.div`
  font-size: 2rem;
  text-align: center;
  padding: 1rem 0.5rem 0.8rem;
  border-radius: 5px;
  color: #fff;
  background-color: #a2a2a2;
  margin-bottom: 0.5rem;
  height: fit-content;
  ${({ status }) =>
    status === 1 &&
    css`
      background-color: #1fa6da;
    `}

  ${({ impact }) =>
    impact === true &&
    css`
      background-color: #014263;
    `}
`;
const MetricGoalLabel = styled.div`
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
`;
const MetricGoalStatus = styled.div`
  font-size: 0.8rem;
  color: #a2a2a2;
`;

const MetricTypeBadge = styled.div`
  padding: 8px 8px 5px;
  border-radius: 5px;
  color: #fff;
  text-transform: uppercase;
  margin-right: 1rem;
  margin-top: 0.3rem;
  background-color: #014263;
  text-align: center;
  font-size: 0.8rem;
  line-height: 0.8rem;
  display: block;
`;

const IconGoalWrapper = styled.li`
  display: block;  
  font-size: 1.1rem;
  line-height: 1.5rem;
  justify-content: flex-start;
  margin-bottom: 0.5rem;
  opacity: 0.5;
  width: 100%;
  
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
  }

  ${({ status }) =>
    status === 1 &&
    css`
      opacity: 1;
    `}
`;

const IconGoalIcon = styled.img`
  margin-right: 0.5rem;
`;
