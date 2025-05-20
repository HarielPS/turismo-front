import React from 'react';

interface CardProps {
  title: string;
  value: string | number;
  className?: string;
  titleClassName?: string;
  valueClassName?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  value,
  className = '',
  titleClassName = '',
  valueClassName = '',
}) => {
  return (
    <div className={`w-full bg-detail rounded-lg shadow p-6 ${className}`}>
      <h3 className={`text-text text-sm font-medium mb-2 ${titleClassName}`}>
        {title}
      </h3>
      <p className={`text-2xl font-bold text-text ${valueClassName}`}>
        {value}
      </p>
    </div>
  );
};

export default Card;