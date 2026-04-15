import { Card, Form, Input } from "antd";
import { AppButton } from "@/components/common";
import { useReceptionActionLogic } from "./useReceptionActionLogic";

export const ReceptionScreen = () => {
  const { form, handleFinish, isSubmitting } = useReceptionActionLogic("PHONG_101");

  return (
    <div className="p-6 flex justify-center bg-white h-full">
      <Card title={<span className="font-bold text-gray-700">🎫 Lễ tân - Cấp số</span>} className="w-[400px] shadow-lg border-0 h-fit">
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <Form.Item name="name" label={<span className="font-medium">Họ và tên bệnh nhân</span>} rules={[{ required: true, message: "Vui lòng nhập tên!" }]}>
            <Input placeholder="Vd: Nguyễn Văn A" size="large" disabled={isSubmitting} />
          </Form.Item>
          <AppButton type="primary" htmlType="submit" size="large" block className="bg-blue-600 font-semibold" loading={isSubmitting}>
            CẤP SỐ THỨ TỰ
          </AppButton>
        </Form>
      </Card>
    </div>
  );
};