import { useState, useRef } from 'react';
import { message } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const useRevenueReport = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [paymentType, setPaymentType] = useState('tienMat');
  const [fromDate, setFromDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [toDate, setToDate] = useState<dayjs.Dayjs | null>(dayjs());

  const fromDateRef = useRef<any>(null);
  const toDateRef = useRef<any>(null);

  const validateDateInput = (dateString: string, type: 'from' | 'to') => {
    if (!dateString) return true;

    const currentYear = dayjs().year();
    const refToFocus = type === 'from' ? fromDateRef : toDateRef;
    const parsedDate = dayjs(dateString, ['DD/MM/YYYY', 'DDMMYYYY'], true);
    
    const parts = dateString.includes('/') 
      ? dateString.split('/') 
      : [dateString.substring(0, 2), dateString.substring(2, 4), dateString.substring(4, 8)];
    
    if (parts.length === 3) {
      const day = Number.parseInt(parts[0], 10);
      const month = Number.parseInt(parts[1], 10);
      const year = Number.parseInt(parts[2], 10);

      if (month >= 13 || month < 1) {
        message.error('Không tồn tại tháng');
        refToFocus.current?.focus();
        return false;
      }

      const maxDaysInMonth = dayjs(`${year}-${month}-01`).daysInMonth();
      if (day > maxDaysInMonth || day < 1) {
        message.error('Ngày không tồn tại');
        refToFocus.current?.focus();
        return false;
      }

      if (year <= 1900 || year > currentYear) {
        message.error('Năm NSD nhập chưa triển khai hệ thống');
        refToFocus.current?.focus();
        return false;
      }
    }

    if (!parsedDate.isValid()) {
      message.error('Định dạng ngày không hợp lệ!');
      refToFocus.current?.focus();
      return false;
    }
    return true;
  };

  const handleSearch = () => {
    if (!fromDate || !toDate) {
      return message.error("Vui lòng nhập đầy đủ Từ ngày và Đến ngày!");
    }
    if (toDate.isBefore(fromDate, 'day')) {
      message.error("Đến ngày không được nhỏ hơn Từ ngày!");
      toDateRef.current?.focus();
      return;
    }
    const oneMonthLater = fromDate.add(1, 'month');
    if (toDate.isAfter(oneMonthLater, 'day')) {
      message.warning("Giới hạn tìm kiếm trong 1 tháng. Vui lòng chuyển đến báo cáo Doanh thu theo Quý/Năm");
      toDateRef.current?.focus();
      return;
    }
    message.success("Tải dữ liệu thành công!");
  };

  return {
    activeTab, setActiveTab,
    paymentType, setPaymentType,
    fromDate, setFromDate, fromDateRef,
    toDate, setToDate, toDateRef,
    validateDateInput, handleSearch
  };
};