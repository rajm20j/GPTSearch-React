import React from 'react';
import { ISize } from '../../common/interfaces/Size';
import './AppButton.scss';

type AppButtonProps = {
  label?: string;
  onClick?: () => void;
  size?: ISize;
  isLoading?: boolean;
  render?: React.ReactNode;
  shadowColor?: 'blue-shadow' | 'pink-shadow' | 'red-shadow';
  type?: 'primary' | 'alert';
} & React.HTMLAttributes<HTMLDivElement>;

const getDimension = (size: ISize): string => {
  switch (size) {
    case 'small': {
      return 'pi-12 pb-8 fs-12';
    }
    case 'medium': {
      return 'pi-16 pb-12 fs-16';
    }
    case 'large': {
      return 'pi-24 pb-16 fs-24';
    }
    default: {
      return 'pi-16 pb-12 fs-16';
    }
  }
};

const AppButton: React.FC<AppButtonProps> = ({
  label,
  onClick,
  size,
  className,
  isLoading,
  render,
  shadowColor,
  style,
  type
}) => {
  return (
    <div
      onClick={onClick}
      className={`btn-con c-pointer s-disable ${getDimension(size)} ${className} ${
        (!isLoading && shadowColor) ?? 'blue-shadow'
      }`}
      style={{
        ...style,
        background: type === 'alert' ? 'red' : '',
        color: type === 'alert' ? 'white' : ''
      }}
    >
      {isLoading ? '...' : render ?? label}
    </div>
  );
};

export default AppButton;
