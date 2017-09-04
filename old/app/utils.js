export const getRemainingCFPDays = () => {
  const endDay = new Date(2017, 6, 20), today = new Date();
  return Math.ceil((endDay - today) / 86400000);
};