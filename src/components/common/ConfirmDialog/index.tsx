import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { ModalFuncProps } from 'antd';

const { confirm } = Modal;

export const showConfirmDialog = (props: ModalFuncProps) => {
  confirm({
    icon: <ExclamationCircleOutlined style={{ color: '#faad14' }} />,
    okText: 'Đồng ý',
    cancelText: 'Hủy',
    okType: 'danger',
    centered: true,
    ...props,
  });
};