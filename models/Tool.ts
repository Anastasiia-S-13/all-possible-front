export interface Tool {
    id: string,
    owner: string,
    cathegory: string,
    name: string,
    description: string,
    pricePerDay: number,
    images: string[],
    rating: number,
    specifications: Record<string, string>,
    rentalTerms: string,
    // bookedDates: Booking[],
    // feedbacks: Feedbacks[],

}