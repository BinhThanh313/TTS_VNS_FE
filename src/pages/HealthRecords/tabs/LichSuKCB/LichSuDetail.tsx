import React from 'react';
import { Tabs, Button } from 'antd';
import { 
  ArrowLeftOutlined, FileTextOutlined, ExperimentOutlined, 
  DesktopOutlined, ScissorOutlined, TeamOutlined, 
  LineChartOutlined, FileProtectOutlined, MedicineBoxOutlined,
  CalendarOutlined
} from '@ant-design/icons';

// Import các Tab con
import { ThongTinKCBTab } from './ThongTinKCBTab';
import { XetNghiemTab } from './XetNghiemTab';
import { CDHATab } from './CDHATab';
import { PhauThuatThuThuatTab } from './PhauThuatThuThuatTab';
import { HoiChanTab } from './HoiChanTab';
import { DienBienLamSangTab } from './DienBienLamSangTab';
import { HoSoPhapLyTab } from './HoSoPhapLyTab';
import { DonThuocTab } from './DonThuocTab';

interface Props {
  recordId: string;
  onBack: () => void;
}

export const LichSuDetail: React.FC<Props> = ({ recordId, onBack }) => {
  // Đã xóa các dòng lặp và thẻ div thừa
  const tabItems = [
    { key: 'thongtin', label: <span><FileTextOutlined /> Thông tin KCB</span>, children: <ThongTinKCBTab /> },
    { key: 'xetnghiem', label: <span><ExperimentOutlined /> Xét nghiệm (06)</span>, children: <XetNghiemTab /> },
    { key: 'cdha', label: <span><DesktopOutlined /> CĐHA & TDCN (02)</span>, children: <CDHATab /> },
    { key: 'phauthuat', label: <span><ScissorOutlined /> Phẫu thuật/thủ thuật (02)</span>, children: <PhauThuatThuThuatTab /> },
    { key: 'hoichan', label: <span><TeamOutlined /> Hội chẩn (02)</span>, children: <HoiChanTab /> },
    { key: 'dienbien', label: <span><LineChartOutlined /> Diễn biến lâm sàng</span>, children: <DienBienLamSangTab /> },
    { key: 'phaply', label: <span><FileProtectOutlined /> Hồ sơ pháp lý</span>, children: <HoSoPhapLyTab /> },
    { key: 'donthuoc', label: <span><MedicineBoxOutlined /> Đơn thuốc</span>, children: <DonThuocTab /> },
  ];

  return (
    <div className="lich-su-detail-wrapper">
      <Button type="link" icon={<ArrowLeftOutlined />} onClick={onBack} style={{ padding: 0, marginBottom: 16, color: '#0008b0', fontWeight: 500 }}>
        Quay lại danh sách đợt khám
      </Button>

      <div style={{ backgroundColor: '#fafafa', border: '1px solid #f0f0f0', borderRadius: 8, padding: '16px 24px', display: 'flex', gap: 48, marginBottom: 24 }}>
        <div>
          <span style={{ color: '#555', fontWeight: 500, marginRight: 8 }}>Nơi KCB:</span>
          <span style={{ color: '#333', fontWeight: 'bold' }}>Bệnh xá công an tỉnh Hà Nam</span>
        </div>
        <div>
          <span style={{ color: '#555', fontWeight: 500, marginRight: 8 }}><CalendarOutlined /> Ngày điều trị:</span>
          <span style={{ color: '#333', fontWeight: 'bold' }}>31/03/2026 - 31/03/2026</span>
        </div>
      </div>

      <Tabs defaultActiveKey="thongtin" items={tabItems} className="custom-detail-tabs" />
    </div>
  );
};