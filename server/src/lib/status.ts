export const ApprovalStatus = {
  loved: 4,
  qualified: 3,
  approved: 2,
  ranked: 1,
  pending: 0,
  wip: -1,
  graveyard: -2,
};

export function getApprovalStatus(status: number) {
  for (const approval in ApprovalStatus) {
    const num = ApprovalStatus[approval as keyof typeof ApprovalStatus];
    if (status === num)
      return approval.charAt(0).toUpperCase() + approval.slice(1);
  }
  return "Unknown";
}
