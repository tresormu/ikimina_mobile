// ─── Auth ─────────────────────────────────────────────────────────────────────
export interface User {
  id: string;
  fullName: string;
  phone: string;
  nationalId?: string;
  profilePhoto?: string;
  joinDate: string;
  creditScore: number;
  creditCategory: 'Poor' | 'Fair' | 'Good' | 'Excellent';
}

// ─── Group ────────────────────────────────────────────────────────────────────
export interface GroupMember {
  id: string;
  name: string;
  phone: string;
  position: number;
  status: 'paid' | 'pending' | 'missed';
  amount: number;
  paidAt?: string;
  isMe?: boolean;
}

// ─── Contributions ────────────────────────────────────────────────────────────
export type ContributionStatus = 'paid' | 'pending' | 'missed' | 'partial';
export type PaymentMethod = 'mobile_money' | 'bank_transfer' | 'cash';

export interface Contribution {
  id: string;
  weekNumber: number;
  cycleNumber: number;
  amount: number;
  status: ContributionStatus;
  paymentMethod?: PaymentMethod;
  transactionId?: string;
  submittedAt: string;
  confirmedAt?: string;
}

// ─── Loans ────────────────────────────────────────────────────────────────────
export type LoanStatus = 'pending' | 'approved' | 'declined' | 'active' | 'completed';

export interface LoanRepaymentEntry {
  date: string;
  amount: number;
  paid: boolean;
}

export interface Loan {
  id: string;
  amount: number;
  reason: string;
  status: LoanStatus;
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  disbursedAt?: string;
  dueDate?: string;
  remainingBalance?: number;
  interestRate: number;
  repaymentSchedule?: LoanRepaymentEntry[];
  requesterName?: string;
  requesterPhone?: string;
}

// ─── Notifications ────────────────────────────────────────────────────────────
export type NotificationType =
  | 'contribution_reminder'
  | 'contribution_confirmed'
  | 'contribution_missed'
  | 'your_turn'
  | 'loan_approved'
  | 'loan_declined'
  | 'loan_vote'
  | 'credit_updated'
  | 'new_member'
  | 'announcement';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}
