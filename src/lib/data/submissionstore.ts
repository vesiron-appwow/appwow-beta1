export type SubmissionStatus = "pending" | "approved" | "rejected";

export type Submission = {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  status: SubmissionStatus;
  createdAt: string;
};

/**
 * In-memory beta store (Cloudflare-safe)
 */
const submissions = new Map<string, Submission>();

/**
 * Add a new submission
 */
export async function addSubmission(
  submission: Omit<Submission, "createdAt">
): Promise<Submission> {
  const record: Submission = {
    ...submission,
    createdAt: new Date().toISOString(),
  };

  submissions.set(record.id, record);
  return record;
}

/**
 * Update submission status
 */
export async function updateStatus(
  id: string,
  status: SubmissionStatus
): Promise<void> {
  const existing = submissions.get(id);
  if (!existing) return;

  submissions.set(id, {
    ...existing,
    status,
  });
}

/**
 * Get all submissions
 */
export async function getSubmissions(): Promise<Submission[]> {
  return Array.from(submissions.values());
}

/**
 * Required to force runtime module emission (Vite / Cloudflare)
 */
export {};
