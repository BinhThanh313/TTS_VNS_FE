import React from 'react';
import { Button } from 'antd';
import type { ButtonProps } from 'antd';

export const AppButton: React.FC<ButtonProps> = ({ children, style, ...props }) => {
  return (
    <Button style={{ borderRadius: 6, ...style }} {...props}>
      {children}
    </Button>
  );
};