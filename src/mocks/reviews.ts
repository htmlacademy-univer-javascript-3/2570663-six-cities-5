import {Review} from '../types/review.ts';

export const reviews: Review[] = [
  {
    id: "cc034942-08bf-4571-825d-b9c7437e03fb",
    comment: "We loved it so much, the house, the veiw, the location just great.. Highly reccomend :)",
    date: "2024-10-12T21:00:00.802Z",
    rating: 2,
    user: {
      name: "Emely",
      avatarUrl: "https://14.design.htmlacademy.pro/static/avatar/7.jpg",
      isPro: true
    }
  },
  {
    id: "1994e6c7-d649-4242-9ba9-b6d21a04ce3b",
    comment: "Home is amazing. It's like staying in a museum. The rooms, furnishings and artworks are incredible. The views of My Vesuvius",
    date: "2024-10-12T21:00:00.802Z",
    rating: 4,
    user: {
      name: "Sophie",
      avatarUrl: "https://14.design.htmlacademy.pro/static/avatar/9.jpg",
      isPro: false
    }
  },
  {
    id: "35a119d6-c5e1-4086-8038-b8bab9b3fdfa",
    comment: "This villa is perfect in every way: the view on mountains and waterfalls, the hot tub and the villa itself. The evening here became a great continuation of our journeys over country.",
    date: "2024-10-10T21:00:00.802Z",
    rating: 1,
    user: {
      name: "Kendall",
      avatarUrl: "https://14.design.htmlacademy.pro/static/avatar/2.jpg",
      isPro: false
    }
  }
]
