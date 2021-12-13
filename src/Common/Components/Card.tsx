import './Card.scss';

/**
 * Styles for the component
 */
export interface CardStyles {
  containerStyle?: Object;
}

/**
 * Props for the component
 */
export interface CardProps {
  children: any; // The child elements
  cardStyle?: CardStyles; // Optional styles
  onCardClick?: () => void;
}

/**
 * Renders a Card component
 * @param props The CardProps for the compoonent
 * @returns The component
 */
export const Card = (props: CardProps) => {
  const { cardStyle, children, onCardClick } = props;

  return <div className={`bb-card`} style={cardStyle?.containerStyle} onClick={onCardClick}>{children}</div>;
};

/**
 * Renders a Card component
 * @param props The CardProps for the compoonent
 * @returns The component
 */
export const CardHeader = (props: CardProps) => {
  const { cardStyle = null, children } = props;
  return <div className={`bb-cardheader`} style={cardStyle?.containerStyle}>{children}</div>;
};

/**
 * Renders a CardContent component
 * @param props The CardProps for the compoonent
 * @returns The component
 */
export const CardContent = (props: CardProps) => {
  const { cardStyle, children } = props;
  return <div className={`bb-cardcontent`} style={cardStyle?.containerStyle}>{children}</div>;
};