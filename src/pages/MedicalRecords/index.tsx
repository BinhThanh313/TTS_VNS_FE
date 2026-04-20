import { Input, Select } from "antd";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useMedicalRecordActionLogic } from "./useMedicalRecordActionLogic";
import { useColumnMedicalRecord } from "./useColumnMedicalRecord";
import { DataTable } from "@/components/common";

export const MedicalRecord = () => {
  const { t } = useTranslation();
  const {
    medicalRecordList,
    total,
    searchParams,
    isLoadingList,
    handleSearch,
    handleViewDetail,
  } = useMedicalRecordActionLogic();

  const { columns } = useColumnMedicalRecord({ onView: handleViewDetail });

  return (
    // Thay thế .health-record-wrapper bằng Tailwind
    <div className="p-6 bg-white rounded-lg min-h-[calc(100vh-120px)]">
      <h2 className="text-[#0008b0] m-0 mb-6 font-bold text-xl">
        {t("medicalRecord.title")}
      </h2>

      {/* Thanh bộ lọc (Filters) */}
      <div className="flex flex-row items-center gap-4 mb-6">
        <Input
          prefix={<Search size={18} className="text-gray-400" />}
          placeholder={t("medicalRecord.searchPlaceholder")}
          allowClear
          // Thay class w/h bằng style để ép cứng kích thước cho Ant Design
          style={{ width: 320, height: 44 }}
          className="rounded-md text-[15px]"
          onChange={(e) => handleSearch({ searchText: e.target.value })}
        />

        <Select
          defaultValue="all"
          style={{ width: 200, height: 44 }}
          options={[
            { value: "all", label: t("medicalRecord.allUnits") },
            { value: "PX01", label: "Phòng PX01" },
          ]}
          onChange={(val) => handleSearch({ unit: val })}
        />

        <Select
          defaultValue="all"
          style={{ width: 200, height: 44 }}
          options={[
            { value: "all", label: t("medicalRecord.allProfessions") },
            { value: "canbo", label: "Cán bộ" },
          ]}
          onChange={(val) => handleSearch({ profession: val })}
        />

        <button
          onClick={() => {}}
          // Thêm shrink-0 ở cuối class để nút không bị ép móp lại khi màn hình nhỏ
          className="h-[44px] px-6 bg-[#0008b0] text-white font-medium rounded-md flex items-center gap-2 hover:bg-[#1d39c4] transition-colors shrink-0"
        >
          <Search size={18} />
          {t("common.search")}
        </button>
      </div>

      {/* Table: Style Header/Row sẽ được custom trong component DataTable hoặc ghi đè antd theme toàn cục, không dùng SCSS ở đây */}
      <DataTable
        columns={columns}
        dataSource={medicalRecordList}
        loading={isLoadingList}
        totalRecords={total}
        currentPage={searchParams.page}
        pageSize={searchParams.pageSize}
        onPageChange={(page, pageSize) => handleSearch({ page, pageSize })}
      />
    </div>
  );
};

export default MedicalRecord;