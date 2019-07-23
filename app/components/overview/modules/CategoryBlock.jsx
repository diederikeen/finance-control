import React from 'react';
import Styled from 'styled-components';
import { rgba, lighten, linearGradient } from 'polished';
import PropTypes from 'prop-types';
import { Colors } from '../../../styles';

const Category = Styled.div`
  border-bottom: 1px solid ${rgba(Colors.darkestBlue, 0.1)};
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  h3 {
    margin: 4px 0 0;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 800;
    opacity: .3;
    letter-spacing: 1.2px;
  }

  .max-budget {
    font-weight: 600;
    font-size: 20px;
  }

  .bar-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .current-percentage {
    margin: 0 0 4px;
    font-size: 16px;
    font-weight: 600;
  }
`;

const ProgessBar = Styled.div`
  border-radius: 50px;
  width: 200px;
  height: 18px;
  position: relative;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    background: ${lighten(0.40, Colors.defaultBlue)};
    border-radius: 50px;
    width: 100%;
    height: 100%;
  }

  &:after {
    content: '';
    position: absolute;
    ${linearGradient({
    colorStops: [Colors.defaultBlue, Colors.darkerBlue],
    toDirection: 'to right',
  })}
    height: 100%;
    border-radius: 50px;
    width: ${props => props.width}%;
    max-width: 100%;
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
        {currentSpent} / <span className="max-budget">{ maxSpent }</span>
        <h3>{label}</h3>
      </header>

      <div className="bar-wrap">
        <span className="current-percentage">{percentage}%</span>
        <ProgessBar width={percentage} />
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
