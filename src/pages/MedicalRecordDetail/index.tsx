import { Row, Col, Menu } from "antd";
import { ArrowLeft, User, History, BriefcaseMedical, Pin, PlusSquare, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useMedicalRecordDetailActionLogic } from "./useMedicalRecordDetailActionLogic";
// import các tab view...

export const MedicalRecordDetail = () => {
  const { t } = useTranslation();
  const { cccd, recordInfo, activeMenu, setActiveMenu, goBack } = useMedicalRecordDetailActionLogic();

  const menuItems = [
    { key: "hoso", icon: <User size={18} />, label: "Hồ sơ & Tiền sử" },
    { key: "lichsu", icon: <History size={18} />, label: "Lịch sử KCB" },
    // Thêm các tab khác...
  ];

  return (
    <div className="p-4 md:p-6 bg-white min-h-[calc(100vh-120px)] rounded-lg">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <button onClick={goBack} className="text-[#0008b0] hover:bg-gray-100 p-1 rounded-full">
          <ArrowLeft size={24} />
        </button>
        <h2 className="m-0 text-[#0008b0] font-bold text-xl uppercase">
          {t("medicalRecord.detailTitle")} / {recordInfo?.fullName || "Đang tải..."}
        </h2>
      </div>

      {/* Layout chia 2 bên */}
      <div className="flex gap-6">
        {/* Menu bên trái - Đã thay thế .custom-detail-menu */}
        <div className="w-[250px] border border-gray-200 rounded-lg py-2 h-fit">
          <Menu
            mode="inline"
            selectedKeys={[activeMenu]}
            onClick={(e) => setActiveMenu(e.key)}
            items={menuItems}
            className="border-none"
            // Thay thế CSS .custom-detail-menu bằng thuộc tính theme của Antd 5 hoặc style trực tiếp
          />
        </div>

        {/* Content bên phải */}
        <div className="flex-1 min-w-0">
          {activeMenu === "hoso" && <div>Nội dung Hồ sơ (Xem Tab mẫu bên dưới)</div>}
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordDetail;