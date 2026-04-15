import { Tabs } from "antd";
import { ArrowLeft, FileText, FlaskConical, MonitorPlay, Scissors, Users, Activity, FileCheck, Pill } from "lucide-react";
// Import các tab con ở đây... (Bạn tạo các file này tương tự)

interface Props {
  recordId: string;
  onBack: () => void;
}

export const LichSuDetail = ({ recordId, onBack }: Props) => {
  const tabItems = [
    { key: "thongtin", label: <span className="flex items-center gap-2"><FileText size={16} /> Thông tin KCB</span>, children: <div>Nội dung thông tin KCB...</div> },
    { key: "xetnghiem", label: <span className="flex items-center gap-2"><FlaskConical size={16} /> Xét nghiệm (06)</span>, children: <div>Nội dung Xét nghiệm...</div> },
    { key: "donthuoc", label: <span className="flex items-center gap-2"><Pill size={16} /> Đơn thuốc</span>, children: <div>Nội dung Đơn thuốc...</div> },
    // Thêm các tab khác
  ];

  return (
    <div className="flex flex-col">
      <button onClick={onBack} className="flex items-center gap-2 text-[#0008b0] hover:text-[#1d39c4] font-medium mb-4 w-fit transition-colors">
        <ArrowLeft size={16} /> Quay lại danh sách đợt khám
      </button>

      {/* Thông tin tóm tắt đợt khám */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex gap-12 mb-6">
        <div><span className="text-gray-500 font-medium mr-2">Nơi KCB:</span><span className="text-gray-800 font-bold">Bệnh xá CA Hà Nam</span></div>
        <div className="flex items-center gap-2"><span className="text-gray-500 font-medium">Ngày điều trị:</span><span className="text-gray-800 font-bold">31/03/2026 - 31/03/2026</span></div>
      </div>

      {/* Custom Tabs bằng Tailwind thay thế .custom-detail-tabs 
        Lưu ý: Bạn có thể đưa cấu hình này vào global theme của Antd để code gọn hơn
      */}
      <Tabs 
        defaultActiveKey="thongtin" 
        items={tabItems} 
        className="[&>.ant-tabs-nav::before]:border-b [&>.ant-tabs-nav::before]:border-gray-300 [&_.ant-tabs-ink-bar]:bg-[#0008b0] [&_.ant-tabs-tab-active_.ant-tabs-tab-btn]:text-[#0008b0]"
      />
    </div>
  );
};