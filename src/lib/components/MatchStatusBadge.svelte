<script lang="ts">
    let { status }: { status: string } = $props();

    let variant = $derived(
        status === "IN_PLAY" || status === "PAUSED" ? "live"
        : status === "TIMED" || status === "SCHEDULED" ? "upcoming"
        : status === "FINISHED" ? "finished"
        : "other"
    );

    let label = $derived(
        status === "IN_PLAY" ? "Live"
        : status === "PAUSED" ? "Half-time"
        : variant === "upcoming" ? "Upcoming"
        : variant === "finished" ? "Full-time"
        : status.replaceAll("_", " ").toLowerCase()
    );
</script>

<span class="status-badge {variant}">
    <span class="dot" aria-hidden="true"></span>
    {label}
</span>

<style>
    .status-badge {
        --c: var(--am-text-muted);
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        flex-shrink: 0;
        padding: 0.3rem 0.75rem;
        border-radius: 999px;
        border: 1px solid color-mix(in srgb, var(--c) 40%, transparent);
        background: color-mix(in srgb, var(--c) 14%, transparent);
        color: var(--c);
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        white-space: nowrap;
    }
    .upcoming { --c: #4ade80; }
    .live { --c: #ff4d55; }
    .finished { --c: #cbd5e1; }

    .dot {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: var(--c);
    }
    .live .dot { animation: pulse 1.4s ease-out infinite; }

    @keyframes pulse {
        0%   { box-shadow: 0 0 0 0 color-mix(in srgb, var(--c) 70%, transparent); }
        100% { box-shadow: 0 0 0 0.5rem transparent; }
    }
    @media (prefers-reduced-motion: reduce) {
        .live .dot { animation: none; }
    }
</style>
