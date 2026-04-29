export type DonationTier = 'free' | 'silver' | 'gold';

export type NexusCell = {
  id: string;
  position: [number, number, number];
  color: string;
  tone: string;
  instrument: string;
  message: string;
  creator: string;
  tier: DonationTier;
  created_at: string;
};
