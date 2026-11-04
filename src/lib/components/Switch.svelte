<script lang="ts">
    let { checked, label, onChange }: {
        checked: boolean;
        label: string;
        onChange: (checked: boolean) => void;
    } = $props();
</script>

<button type="button" class="switch" role="switch" aria-checked={checked} onclick={() => onChange(!checked)}>
    <span class="switch-label">{label}</span>
    <span class="track" aria-hidden="true">
        <span class="thumb"></span>
    </span>
</button>

<style>
    .switch {
                display: inline-flex;
        align-items: center;
        gap: 0.6rem;
        padding: 0.25rem;
        border: 0;
        border-radius: 999px;
        background: none;
        color: inherit;
        font: inherit;
        font-size: 0.85rem;
        font-weight: 600;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
    }
    .switch-label {
        display: block;
        /* Trim the text box to cap-height/baseline so the glyphs centre optically */
        text-box: trim-both cap alphabetic;
        opacity: 0.85;
        transition: opacity 0.2s ease;
    }
    .switch:hover .switch-label { opacity: 1; }
    .switch:focus-visible {
        outline: 2px solid var(--am-cyan);
        outline-offset: 2px;
    }

    .track {
        display: block;
        flex-shrink: 0;
        position: relative;
        width: 2.5rem;
        height: 1.4rem;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.18);
        transition: background 0.25s ease;
    }
    .thumb {
        position: absolute;
        top: 0.15rem;
        left: 0.15rem;
        width: 1.1rem;
        height: 1.1rem;
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
        transition: transform 0.25s cubic-bezier(0.3, 1.4, 0.6, 1);
    }
    .switch[aria-checked="true"] .track { background: var(--am-cyan); }
    .switch[aria-checked="true"] .thumb { transform: translateX(1.1rem); }

    @media (prefers-reduced-motion: reduce) {
        .track, .thumb { transition: none; }
    }
</style>
