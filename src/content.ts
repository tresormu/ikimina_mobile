export type TabKey = 'home' | 'services' | 'group';

export const tabs: { key: TabKey; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'services', label: 'Services' },
  { key: 'group', label: 'Group' },
];

export const homeHighlights = [
  'Direct MoMo collections with transparent tracking',
  'Digital records for treasurers and members',
  'Verified savings history that lenders can trust',
];

export const services = [
  {
    title: 'Group Registration',
    detail: 'Create a savings group, define contribution rules, and onboard members from one place.',
  },
  {
    title: 'Contribution Tracking',
    detail: 'Monitor weekly and monthly collections with clear records and live group status.',
  },
  {
    title: 'Member Visibility',
    detail: 'Members can review balances, payouts, and contribution history without relying on notebooks.',
  },
  {
    title: 'Credit Readiness',
    detail: 'Verified savings behaviour can later support credit scoring and lender access.',
  },
];

export const howItWorksSteps = [
  {
    title: 'Register the group',
    detail: 'The treasurer creates the group, sets the savings amount, and defines the collection schedule.',
  },
  {
    title: 'Add and confirm members',
    detail: 'Members join the group and their participation is recorded in a single digital ledger.',
  },
  {
    title: 'Track collections',
    detail: 'Every contribution updates the group records so the total balance stays visible and easy to audit.',
  },
  {
    title: 'Manage growth',
    detail: 'The group can later use this trusted financial history for reporting, lending, and smarter planning.',
  },
];

export const groupOverview = {
  name: 'Kigali Savings Group',
  members: 18,
  cycle: 'Cycle 4',
  nextCollection: 'Friday, 09 May 2026',
  balance: 'RWF 2,480,000',
  monthlyTarget: 'RWF 3,000,000',
};

export const groupChart = [
  { month: 'Jan', amount: 920000 },
  { month: 'Feb', amount: 1340000 },
  { month: 'Mar', amount: 1810000 },
  { month: 'Apr', amount: 2210000 },
  { month: 'May', amount: 2480000 },
];

export const groupActivity = [
  '18 of 18 members active this cycle',
  'Collection rate is holding above 92%',
  'Next payout is scheduled after the Friday collection',
];
