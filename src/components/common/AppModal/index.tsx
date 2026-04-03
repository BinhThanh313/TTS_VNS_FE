import React from 'react';
import { Modal } from 'antd';
import type { ModalProps } from 'antd';

interface AppModalProps extends ModalProps {
  children: React.ReactNode;
}

export const AppModal: React.FC<AppModalProps> = ({ children, ...props }) => {
  return (
    <Modal
      destroyOnHidden
      maskClosable={false}
      centered
      okText="Đồng ý"
      cancelText="Hủy"
      {...props}
    >
      {children}
    </Modal>
  );
};