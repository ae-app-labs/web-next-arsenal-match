<script lang="ts">
    export let status: string;
</script>

<style>
    .status-badge {
        display: inline-block;
        padding: 8px 16px;
        border-radius: 10px;
        background: linear-gradient(145deg, #1a2639, #182843);
        color: #ffffff;
        font-weight: 500;
        font-size: 14px;
        letter-spacing: 1px;
        text-transform: uppercase;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4),
                    inset 0 0 6px rgba(255, 255, 255, 0.05);
    }
</style>

<p class="status-badge px-4">
    {#if status === "TIMED"}
      🟢 UPCOMING
    {:else if status === "IN_PLAY"}
      🔴 IN PROGRESS
    {:else}
      ⚪ {status}                  
    {/if}
</p>
