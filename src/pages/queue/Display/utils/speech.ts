export const speakVietnamese = (text: string) => {
  try {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'vi-VN';
    msg.rate = 0.85; // Đọc chậm cho rõ chữ
    window.speechSynthesis.speak(msg);
  } catch (error) {
    console.warn("Lỗi phát âm thanh:", error);
  }
};