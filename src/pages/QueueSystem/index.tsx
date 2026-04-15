import { Row, Col, Typography } from "antd";
import { ReceptionScreen } from "./Reception";
import { DoctorScreen } from "./Doctor";
import { DisplayScreen } from "./DisplayScreen";

export default function QueueSystem() {
  return (
    <div className="p-6 bg-blue-50 h-[calc(100vh-64px)] overflow-hidden flex flex-col">
      <Typography.Title level={3} className="text-center !mb-6 !text-blue-600 uppercase font-bold">
        Điều phối Khám bệnh Thông minh
      </Typography.Title>
      
      <Row gutter={[24, 24]} className="flex-1 overflow-hidden">
        {/* CỘT TRÁI: LỄ TÂN & BÁC SĨ */}
        <Col span={9} className="flex flex-col gap-6 h-full">
          <div className="border border-blue-200 shadow-sm rounded-xl overflow-hidden bg-white shrink-0">
            <ReceptionScreen />
          </div>
          <div className="border border-green-200 shadow-sm rounded-xl overflow-auto bg-white flex-1 min-h-0">
            <DoctorScreen />
          </div>
        </Col>

        {/* CỘT PHẢI: MÀN HÌNH TIVI */}
        <Col span={15} className="h-full">
          <div className="border-4 border-slate-700 rounded-xl overflow-hidden h-full relative bg-slate-900 shadow-2xl">
            {/* Kỹ thuật scale thu nhỏ giao diện Tivi để vừa khít màn điều phối */}
            <div style={{ position: "absolute", top: 0, left: 0, width: "166.6%", height: "166.6%", transform: "scale(0.6)", transformOrigin: "top left" }}>
              <DisplayScreen />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}