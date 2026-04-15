import { Typography } from "antd";
import { AppButton } from "@/components/common";
import { useDisplayActionLogic } from "./useDisplayActionLogic";

export const DisplayScreen = () => {
  const { callingPatient, isReady, setIsReady } = useDisplayActionLogic("PHONG_101");

  if (!isReady) {
    return (
      <div className="h-full w-full flex justify-center items-center bg-slate-900 absolute inset-0 z-50">
        <AppButton type="primary" size="large" onClick={() => setIsReady(true)} className="bg-blue-600 font-bold h-14 px-8 text-lg">
          CLICK VÀO ĐÂY ĐỂ BẬT TIVI & KÍCH HOẠT LOA
        </AppButton>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-slate-900 flex flex-col justify-center items-center absolute inset-0">
      <Typography.Title className="!text-white tracking-widest !m-0 uppercase">Mời bệnh nhân vào phòng</Typography.Title>
      
      <div className="text-[250px] leading-none text-yellow-400 font-black my-8" style={{ textShadow: "0 0 40px rgba(250,219,20,0.4)" }}>
        {callingPatient ? callingPatient.stt : "---"}
      </div>
      
      <Typography.Title level={1} className="!text-white !text-6xl uppercase">
        {callingPatient ? callingPatient.name : "Vui lòng chờ tới lượt"}
      </Typography.Title>
    </div>
  );
};