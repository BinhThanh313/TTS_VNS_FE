import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import các file ngôn ngữ (Đảm bảo đường dẫn này đúng với cấu trúc của bạn)
import vi from "./locales/vi.json";

i18n.use(initReactI18next).init({
  resources: {
    vi: {
      translation: vi
    }
  },
  lng: "vi", // Ngôn ngữ mặc định
  fallbackLng: "vi", // Ngôn ngữ dự phòng nếu bị lỗi
  interpolation: { 
    escapeValue: false // React đã tự động chống XSS injection nên không cần escape
  },
});

export default i18n;