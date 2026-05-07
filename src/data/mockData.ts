import type { User, GroupMember, Contribution, Loan, AppNotification } from '../types';

// Extended Group type used in mock data (superset of base Group type)
export interface MockGroup {
  id: string;
  name: string;
  inviteCode: string;
  groupType: 'ROTATING_EQUAL' | 'ACCUMULATING_SHARES' | 'ROTATING_AUCTION' | 'SOLIDARITY_FUND' | 'INVESTMENT_CLUB' | 'HYBRID';
  contributionModel: 'FIXED_EQUAL' | 'FLEXIBLE_SHARES';
  contributionAmount?: number;
  sharePrice?: number;
  maxSharesPerMember?: number;
  minBidPercentage?: number;
  auctionWindowHours?: number;
  frequency: 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY';
  currentCycle: number;
  currentWeek: number;
  totalMembers: number;
  nextCollectionDate: string;
  totalBalance: number;
  myPosition: number;
  rules: string[];
  recipientName?: string;
  recipientPhone?: string;
  potAmount?: number;
}

export const mockUser: User = {
  id: 'u1',
  fullName: 'Alice Umutoni',
  phone: '+250 788 123 456',
  nationalId: '1199880012345678',
  joinDate: 'March 2024',
  creditScore: 742,
  creditCategory: 'Good',
};

export const mockGroups: MockGroup[] = [
  {
    id: 'g1',
    name: 'Kigali Savings Group',
    inviteCode: '284712',
    groupType: 'ROTATING_EQUAL',
    contributionModel: 'FIXED_EQUAL',
    contributionAmount: 25000,
    frequency: 'WEEKLY',
    currentCycle: 3,
    currentWeek: 8,
    totalMembers: 18,
    nextCollectionDate: 'Friday, 09 May 2026',
    totalBalance: 2480000,
    myPosition: 5,
    rules: ['Must pay by 5 PM Friday', 'Missed payment fee: 2,500 RWF', 'Must attend monthly meeting'],
    recipientName: 'Uwimana Marie',
    recipientPhone: '0788111001',
    potAmount: 450000,
  },
  {
    id: 'g2',
    name: 'Bannyahe Investment',
    inviteCode: '991288',
    groupType: 'ACCUMULATING_SHARES',
    contributionModel: 'FLEXIBLE_SHARES',
    sharePrice: 5000,
    maxSharesPerMember: 10,
    frequency: 'MONTHLY',
    currentCycle: 1,
    currentWeek: 4,
    totalMembers: 12,
    nextCollectionDate: 'Sunday, 01 June 2026',
    totalBalance: 12500000,
    myPosition: 1,
    rules: ['Share price is fixed at RWF 5,000', 'Dividends distributed annually'],
  },
  {
    id: 'g3',
    name: 'Gisozi Auction Group',
    inviteCode: '445566',
    groupType: 'ROTATING_AUCTION',
    contributionModel: 'FIXED_EQUAL',
    contributionAmount: 50000,
    frequency: 'WEEKLY',
    currentCycle: 2,
    currentWeek: 3,
    totalMembers: 10,
    nextCollectionDate: 'Saturday, 10 May 2026',
    totalBalance: 1500000,
    myPosition: 8,
    rules: ['Lowest bid wins the pot', 'Dividend shared among non-winners', 'Min bid: 70% of pot'],
    minBidPercentage: 70,
    auctionWindowHours: 24,
  },
];

export const mockGroup = mockGroups[0];

export const mockMembers: GroupMember[] = [
  { id: 'm1',  name: 'Uwimana Marie',     phone: '+250 788 111 001', position: 1,  status: 'paid',    amount: 25000, paidAt: '08:45 AM' },
  { id: 'm2',  name: 'Niyonsaba Jean',    phone: '+250 722 111 002', position: 2,  status: 'paid',    amount: 25000, paidAt: '09:12 AM' },
  { id: 'm3',  name: 'Habimana David',    phone: '+250 733 111 003', position: 3,  status: 'missed',  amount: 25000 },
  { id: 'm4',  name: 'Ingabire Grace',    phone: '+250 744 111 004', position: 4,  status: 'paid',    amount: 25000, paidAt: '10:05 AM' },
  { id: 'm5',  name: 'Alice Umutoni',     phone: '+250 788 123 456', position: 5,  status: 'pending', amount: 25000, isMe: true },
  { id: 'm6',  name: 'Bizimana Eric',     phone: '+250 766 111 006', position: 6,  status: 'paid',    amount: 25000, paidAt: '11:30 AM' },
  { id: 'm7',  name: 'Mukamana Rose',     phone: '+250 755 111 007', position: 7,  status: 'paid',    amount: 25000, paidAt: '07:50 AM' },
  { id: 'm8',  name: 'Tuyisenge Patrick', phone: '+250 777 111 008', position: 8,  status: 'pending', amount: 25000 },
  { id: 'm9',  name: 'Kagoyire Diane',    phone: '+250 788 111 009', position: 9,  status: 'paid',    amount: 25000, paidAt: '12:00 PM' },
  { id: 'm10', name: 'Nshuti Emmanuel',   phone: '+250 722 111 010', position: 10, status: 'paid',    amount: 25000, paidAt: '09:45 AM' },
];

export const mockContributions: Contribution[] = [
  { id: 'c1',  weekNumber: 8, cycleNumber: 3, amount: 25000, status: 'pending', submittedAt: '2026-05-07' },
  { id: 'c2',  weekNumber: 7, cycleNumber: 3, amount: 25000, status: 'paid',    paymentMethod: 'mobile_money', transactionId: 'MOMO-7812', submittedAt: '2026-04-30', confirmedAt: '2026-04-30' },
  { id: 'c3',  weekNumber: 6, cycleNumber: 3, amount: 25000, status: 'paid',    paymentMethod: 'mobile_money', transactionId: 'MOMO-6543', submittedAt: '2026-04-23', confirmedAt: '2026-04-23' },
  { id: 'c4',  weekNumber: 5, cycleNumber: 3, amount: 25000, status: 'paid',    paymentMethod: 'mobile_money', transactionId: 'MOMO-5321', submittedAt: '2026-04-16', confirmedAt: '2026-04-16' },
  { id: 'c5',  weekNumber: 4, cycleNumber: 3, amount: 25000, status: 'missed',  submittedAt: '2026-04-09' },
  { id: 'c6',  weekNumber: 3, cycleNumber: 3, amount: 25000, status: 'paid',    paymentMethod: 'mobile_money', transactionId: 'MOMO-3109', submittedAt: '2026-04-02', confirmedAt: '2026-04-02' },
  { id: 'c7',  weekNumber: 2, cycleNumber: 3, amount: 25000, status: 'paid',    paymentMethod: 'mobile_money', transactionId: 'MOMO-2876', submittedAt: '2026-03-26', confirmedAt: '2026-03-26' },
  { id: 'c8',  weekNumber: 1, cycleNumber: 3, amount: 25000, status: 'paid',    paymentMethod: 'mobile_money', transactionId: 'MOMO-1654', submittedAt: '2026-03-19', confirmedAt: '2026-03-19' },
  { id: 'c9',  weekNumber: 8, cycleNumber: 2, amount: 25000, status: 'paid',    paymentMethod: 'mobile_money', transactionId: 'MOMO-C2W8', submittedAt: '2026-03-12', confirmedAt: '2026-03-12' },
  { id: 'c10', weekNumber: 7, cycleNumber: 2, amount: 25000, status: 'paid',    paymentMethod: 'mobile_money', transactionId: 'MOMO-C2W7', submittedAt: '2026-03-05', confirmedAt: '2026-03-05' },
];

export const mockLoans: Loan[] = [
  {
    id: 'l1',
    amount: 150000,
    reason: 'School fees for my children',
    status: 'active',
    votesFor: 14,
    votesAgainst: 2,
    totalVotes: 18,
    disbursedAt: '2026-04-01',
    dueDate: '2026-07-01',
    remainingBalance: 105000,
    interestRate: 5,
    repaymentSchedule: [
      { date: '2026-05-01', amount: 50000, paid: true },
      { date: '2026-06-01', amount: 50000, paid: false },
      { date: '2026-07-01', amount: 55000, paid: false },
    ],
  },
  {
    id: 'l2',
    amount: 300000,
    reason: 'Small business stock (Kiosk)',
    status: 'pending',
    votesFor: 8,
    votesAgainst: 1,
    totalVotes: 18,
    interestRate: 6,
    requesterName: 'Niyonsaba Jean',
    requesterPhone: '+250 722 111 002',
  },
];

export const mockNotifications: AppNotification[] = [
  {
    id: 'n1',
    type: 'contribution_reminder',
    title: 'Contribution Due Friday',
    message: 'Your weekly contribution of RWF 25,000 is due this Friday, 09 May 2026. Pay early to avoid penalties.',
    isRead: false,
    createdAt: '2026-05-07T08:00:00Z',
  },
  {
    id: 'n2',
    type: 'contribution_confirmed',
    title: 'Payment Confirmed ✓',
    message: 'Your contribution of RWF 25,000 for Week 7 has been confirmed. Transaction ID: MOMO-7812.',
    isRead: false,
    createdAt: '2026-04-30T09:20:00Z',
  },
  {
    id: 'n3',
    type: 'loan_approved',
    title: 'Loan Approved 🎉',
    message: 'Your loan request of RWF 150,000 has been approved by the group. Funds will be disbursed shortly.',
    isRead: true,
    createdAt: '2026-04-01T10:00:00Z',
  },
  {
    id: 'n4',
    type: 'your_turn',
    title: 'Your Payout is Coming!',
    message: 'You are position 5 in the rotation. Based on current progress, your payout is estimated in 3 weeks.',
    isRead: true,
    createdAt: '2026-03-28T14:00:00Z',
  },
  {
    id: 'n5',
    type: 'contribution_missed',
    title: 'Missed Contribution',
    message: 'You missed your contribution for Week 4. A late fee of RWF 2,500 has been applied.',
    isRead: true,
    createdAt: '2026-04-09T18:00:00Z',
  },
  {
    id: 'n6',
    type: 'announcement',
    title: 'Group Announcement',
    message: 'Reminder from your treasurer: The next collection meeting is this Friday at 9 AM. Please be on time.',
    isRead: true,
    createdAt: '2026-04-07T07:00:00Z',
  },
  {
    id: 'n7',
    type: 'loan_vote',
    title: 'Loan Vote Request',
    message: 'Niyonsaba Jean has requested a loan of RWF 300,000. Your vote is needed.',
    isRead: false,
    createdAt: '2026-05-06T10:00:00Z',
  },
];

export const creditBreakdown = [
  { label: 'On-time Payments', value: 87, max: 100, color: '#4F46E5' },
  { label: 'Group Tenure',     value: 14, max: 24,  color: '#059669' },
  { label: 'Loan Repayment',   value: 95, max: 100, color: '#0EA5E9' },
  { label: 'Missed Payments',  value: 1,  max: 10,  color: '#F59E0B', inverse: true },
];

export const rotationSchedule = [
  { week: 1, member: 'Uwimana Marie',     received: true,  amount: 450000 },
  { week: 2, member: 'Niyonsaba Jean',    received: true,  amount: 450000 },
  { week: 3, member: 'Habimana David',    received: true,  amount: 425000 },
  { week: 4, member: 'Ingabire Grace',    received: true,  amount: 450000 },
  { week: 5, member: 'Alice Umutoni',     received: false, amount: 450000, isMe: true },
  { week: 6, member: 'Bizimana Eric',     received: false, amount: 450000 },
  { week: 7, member: 'Mukamana Rose',     received: false, amount: 450000 },
  { week: 8, member: 'Tuyisenge Patrick', received: false, amount: 450000 },
];
