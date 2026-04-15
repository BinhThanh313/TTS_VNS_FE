import { Form, message } from "antd";
import { useAddPatientQueue } from "@/hooks";
import type { IPatient } from "@/types";

export function useReceptionActionLogic(roomId: string) {
  const [form] = Form.useForm();
  const addMutation = useAddPatientQueue();

  const handleFinish = async (values: { name: string }) => {
    try {
      const newPatient: IPatient = {
        id: Date.now(),
        name: values.name.toUpperCase(),
        stt: Math.floor(100 + Math.random() * 900),
      };
      await addMutation.mutateAsync({ roomId, patient: newPatient });
      message.success(`Đã cấp STT: ${newPatient.stt} cho bệnh nhân ${newPatient.name}`);
      form.resetFields();
    } catch (error) {
      message.error("Lỗi khi cấp số!");
    }
  };

  return { form, handleFinish, isSubmitting: addMutation.isPending };
}