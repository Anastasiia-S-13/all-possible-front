export interface Category {
  _id: string;
  title: string;
  description: string;
  keywords: string;
}

export interface Tool {
  _id: string;
  owner: string;
  category: string;
  name: string;
  description: string;
  pricePerDay: number;
  images: string; //https://ftp.goit.study/img/tools-next/692db3ffab59e437964311d4.webp,
  rating: number;
  specifications: string;
  rentalTerms: string;
  bookedDates: string;
  feedbacks: string;
}

// specifications: {
//     Тиск: string;
//     Продуктивність: string;
//     Час роботи: string;
//     Акумулятор: string;
// Вага: string;
//   },
