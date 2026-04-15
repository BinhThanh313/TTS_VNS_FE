import { Table } from "antd";

export const DienBienLamSangTab = () => {
  const columns = [
    { title: "STT", dataIndex: "stt", key: "stt", width: 60, align: "center" as const },
    { title: "Ngày giờ diễn biến", dataIndex: "ngay", key: "ngay", align: "center" as const },
    { title: "Diễn biến lâm sàng", dataIndex: "dienbien", key: "dienbien", align: "left" as const },
    { title: "Người thực hiện", dataIndex: "nguoi", key: "nguoi", align: "center" as const },
  ];

  const data = [
    { key: "1", stt: 1, ngay: "...", dienbien: "...", nguoi: "..." },
    { key: "2", stt: 2, ngay: "...", dienbien: "...", nguoi: "..." },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} pagination={false} size="small" />
    </div>
  );
};