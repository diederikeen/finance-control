import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Colors } from '../styles';

const Anchor = styled(Link)`
  text-decoration: none;
  height: 42px;
  line-height: 40px;
  display: inline-block;
  padding: 0 48px;
  border-radius: 3px;

  ${props => props.primary
    && css`
      background: ${Colors.defaultGreen};
      color: white;

      &:hover {
        background: ${Colors.darkGreen};
      }
  `};

  ${props => props.secondary
    && css`
      background: ${Colors.defaultGrey};
      color: white;

      &:hover {
        background: ${Colors.darkGrey};
      }
  `};

  ${props => props.warning
    && css`
      background: ${Colors.defaultRed};
      color: white;

      &:hover {
        background: ${Colors.darkRed};
      }
  `};
`;

const Button = ({
  link,
  title,
  children,
  type,
}) => {
  if (type === 'primary') return <Anchor primary to={link} title={title}>{children}</Anchor>;
  if (type === 'secondary') return <Anchor secondary to={link} title={title}>{children}</Anchor>;
  if (type === 'warning') return <Anchor warning to={link} title={title}>{children}</Anchor>;
  return <Anchor to={link} title={title}>{children}</Anchor>;
};

export default Button;

Button.propTypes = {
  link: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  title: PropTypes.string,
  type: PropTypes.string,
};
