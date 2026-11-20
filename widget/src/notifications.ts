export interface NotificationPreferences {
  deadlines: boolean;
  new_lessons: boolean;
  job_alerts: boolean;
  live_help: boolean;
  widget_enabled: boolean;
  telegram_enabled: boolean;
  consent_granted: boolean;
  muted: boolean;
  frequency: "immediate" | "daily";
}

export const defaultNotificationPreferences = (): NotificationPreferences => ({
  deadlines: true,
  new_lessons: true,
  job_alerts: true,
  live_help: true,
  widget_enabled: true,
  telegram_enabled: false,
  consent_granted: false,
  muted: false,
  frequency: "immediate",
});

export async function loadNotificationPreferences(
  apiBase: string,
  learnerRef: string
): Promise<NotificationPreferences> {
  const response = await fetch(
    `${apiBase}/api/v1/notification-settings?learner_ref=${encodeURIComponent(learnerRef)}`
  );
  if (!response.ok) throw new Error(`Could not load notification settings: HTTP ${response.status}`);
  return { ...defaultNotificationPreferences(), ...(await response.json()) };
}

export async function persistNotificationPreferences(
  apiBase: string,
  learnerRef: string,
  preferences: NotificationPreferences
): Promise<NotificationPreferences> {
  const response = await fetch(
    `${apiBase}/api/v1/notification-settings?learner_ref=${encodeURIComponent(learnerRef)}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(preferences),
    }
  );
  if (!response.ok) throw new Error(`Could not save notification settings: HTTP ${response.status}`);
  return { ...preferences, ...(await response.json()) };
}
