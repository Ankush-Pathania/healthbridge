export default function OAuthDivider() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-[var(--color-border)]" />
      <span className="text-xs text-[var(--color-text-tertiary)]">OR</span>
      <div className="h-px flex-1 bg-[var(--color-border)]" />
    </div>
  );
}
