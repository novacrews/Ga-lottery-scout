import type { NextApiRequest, NextApiResponse } from 'next';

const MOCK_TICKETS = [
  {
    id: 1,
    name: 'Georgia Millions',
    price: 20.00,
    topPrize: 1000000,
    totalPrizes: 100,
    claimedCount: 87,
    claimedPercentage: 87,
    hotness: 'Very Hot 🔥',
    rank: 1,
  },
  {
    id: 2,
    name: '$500 Instant',
    price: 10.00,
    topPrize: 500000,
    totalPrizes: 200,
    claimedCount: 168,
    claimedPercentage: 84,
    hotness: 'Very Hot 🔥',
    rank: 2,
  },
  {
    id: 3,
    name: '$250K Quest',
    price: 5.00,
    topPrize: 250000,
    totalPrizes: 500,
    claimedCount: 380,
    claimedPercentage: 76,
    hotness: 'Hot',
    rank: 3,
  },
  {
    id: 4,
    name: 'Lucky Day',
    price: 2.00,
    topPrize: 50000,
    totalPrizes: 1000,
    claimedCount: 450,
    claimedPercentage: 45,
    hotness: 'Medium',
    rank: 4,
  },
  {
    id: 5,
    name: 'Quick Cash',
    price: 1.00,
    topPrize: 10000,
    totalPrizes: 2000,
    claimedCount: 180,
    claimedPercentage: 9,
    hotness: 'Warm',
    rank: 5,
  },
];

type ResponseData = {
  tickets?: typeof MOCK_TICKETS;
  error?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    res.status(200).json({ tickets: MOCK_TICKETS });
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
}
