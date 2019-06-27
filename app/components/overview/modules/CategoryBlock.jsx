import React from 'react';
import Styled from 'styled-components';
import { rgba, lighten } from 'polished';
import PropTypes from 'prop-types';

const Category = Styled.div`
  padding: 24px 18px 32px;
  margin: 0 auto 10px;
  text-align: center;
  box-shadow: 0 16px 40px ${rgba(0, 0, 0, 0.16)};
  background-color: white;
  border-radius: 12px;
  position: relative;
  width: 90%;

  @media screen and (min-width: 767px) {
    margin: 0 20px 20px;
    flex-basis: calc(100% / 2 - 40px);
  }

  @media screen and (min-width: 992px) {
    margin: 0 20px 40px;
    flex-basis: calc(100% / 3 - 40px);
  }

  header {
    svg {
      position: absolute;
      top: 12px;
      right: 12px;
    }
  }

  h3 {
    margin: 0 0 12px;
    font-size: 24px;
    font-weight: 400;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }


   p {
     font-size: 18px;

     strong {
       font-family: 'Rubik';
       font-weight: 400;
     }
   }
}
`;

const ProgessBar = Styled.div`
  border-radius: 50px;
  width: 60%;
  height: 18px;
  margin: 0 auto;
  background: red;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    background: ${lighten(0.40, '#005eff')};
    width: 100%;
    height: 100%;
  }

  &:after {
    content: '';
    position: absolute;
    left: 1px;
    background-color: ${props => (props.width < 100 ? '#005eff' : 'red')};
    top: 1px;
    height: calc(100% - 2px);
    border-radius: 50px;
    width: ${props => props.width}%;
    max-width: calc(100% - 2px);
  }
`;

function calculatePercentage(spent, total) {
  return Math.round(spent / total * 100);
}

const CategoryBlock = ({ data: { label, current_spent: currentSpent, max_spent: maxSpent } }) => {
  const percentage = calculatePercentage(currentSpent, maxSpent);
  return (
    <Category percentage={percentage}>
      <header>
        <h3>{label}</h3>
      </header>

      <div>
        <ProgessBar width={percentage} />
        <div>
          <p> You have spent a total of
            <strong> &euro;{currentSpent} </strong>
            out of
            <strong> &euro;{maxSpent}</strong>.
          </p>
        </div>
      </div>
    </Category>
  );
};

CategoryBlock.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string.isRequired,
    current_spent: PropTypes.number.isRequired,
    max_spent: PropTypes.number.isRequired,
  }).isRequired,
};

export default CategoryBlock;
