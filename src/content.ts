export type TabKey = 'home' | 'ledger' | 'loans' | 'group';

export const tabs: { key: TabKey; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'ledger', label: 'Ledger' },
  { key: 'loans', label: 'Loans' },
  { key: 'group', label: 'Group' },
];

export const homeHighlights = [
  'Direct MoMo collections with transparent tracking',
  'Digital records for treasurers and members',
  'Verified savings history that lenders can trust',
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

export type ContributionStatus = 'paid' | 'pending' | 'overdue';

export const groupMembers = [
  { name: 'Jane Mukamana', role: 'Treasurer', status: 'paid', amount: 'RWF 25,000', time: '08:45 AM' },
  { name: 'Jean Bosco', role: 'Member', status: 'paid', amount: 'RWF 25,000', time: '09:12 AM' },
  { name: 'Alice Umutoni', role: 'Member', status: 'pending', amount: 'RWF 25,000', time: '-' },
  { name: 'Emmanuel Nshuti', role: 'Member', status: 'paid', amount: 'RWF 25,000', time: '10:30 AM' },
  { name: 'Diane Kagoyire', role: 'Member', status: 'overdue', amount: 'RWF 25,000', time: '-' },
  { name: 'Patrick Tuyisenge', role: 'Member', status: 'paid', amount: 'RWF 25,000', time: '11:15 AM' },
];

export const pastTransactions = [
  { id: 'H1', member: 'Alice Umutoni', type: 'Contribution', amount: 'RWF 25,000', date: '28 April 2026', status: 'Confirmed' },
  { id: 'H2', member: 'Emmanuel Nshuti', type: 'Contribution', amount: 'RWF 25,000', date: '28 April 2026', status: 'Confirmed' },
  { id: 'H3', member: 'Jean Bosco', type: 'Loan Repayment', amount: 'RWF 10,000', date: '25 April 2026', status: 'Confirmed' },
  { id: 'H4', member: 'Jane Mukamana', type: 'Contribution', amount: 'RWF 25,000', date: '21 April 2026', status: 'Confirmed' },
  { id: 'H5', member: 'Diane Kagoyire', type: 'Contribution', amount: 'RWF 25,000', date: '21 April 2026', status: 'Confirmed' },
  { id: 'H6', member: 'Patrick Tuyisenge', type: 'Contribution', amount: 'RWF 25,000', date: '14 April 2026', status: 'Confirmed' },
];

export const ledgerTransactions = [
  { id: '1', member: 'Jane Mukamana', type: 'Contribution', amount: 'RWF 25,000', date: '07 May 2026', status: 'Confirmed' },
  { id: '2', member: 'Jean Bosco', type: 'Contribution', amount: 'RWF 25,000', date: '07 May 2026', status: 'Confirmed' },
  { id: '3', member: 'Emmanuel Nshuti', type: 'Contribution', amount: 'RWF 25,000', date: '06 May 2026', status: 'Confirmed' },
  { id: '4', member: 'Patrick Tuyisenge', type: 'Contribution', amount: 'RWF 25,000', date: '06 May 2026', status: 'Confirmed' },
  { id: '5', member: 'Diane Kagoyire', type: 'Loan Repayment', amount: 'RWF 55,000', date: '05 May 2026', status: 'Confirmed' },
];

export const activeLoans = [
  { id: 'L1', member: 'Diane Kagoyire', principal: 'RWF 500,000', balance: 'RWF 350,000', dueDate: '15 June 2026', interest: '5%' },
  { id: 'L2', member: 'Jean Bosco', principal: 'RWF 200,000', balance: 'RWF 210,000', dueDate: '20 May 2026', interest: '5%' },
];
