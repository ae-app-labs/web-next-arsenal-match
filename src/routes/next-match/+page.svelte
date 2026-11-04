<script lang="ts">
	import Switch from '$lib/components/Switch.svelte';
	import MatchDetail from '$lib/components/MatchDetail.svelte';
    import { onMount } from 'svelte';

    const ARSENAL_CREST = 'https://crests.football-data.org/57.png';

    let matches = $state<any[]>([]);
    let summary = $state<{ count: number; first: string; last: string } | undefined>();
    let showScores = $state(true);
    let devMode = $state(false);
    let loading = $state(true);

    const fmtDay = (iso: string) =>
        new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' });

    let rangeLabel = $derived(
        summary?.first && summary?.last ? `${fmtDay(summary.first)} – ${fmtDay(summary.last)}` : ''
    );

    onMount(() => {
        fetchApiData();
    });

    const fetchApiData = async () => {
        loading = true;
        try {
            const res = await fetch(`/api/matches?devMode=${devMode}`);
            if (res.ok) {
                const data = await res.json();
                matches = data.matches;
                summary = data.summary;
            }
        } finally {
            loading = false;
        }
    };

    const toggleShowScores = () => {
        showScores = !showScores;
    };

    const toggleDevMode = () => {
        devMode = !devMode;
        fetchApiData();
    };
</script>

<svelte:head>
    <title>Next Arsenal Match</title>
</svelte:head>

<div class="container">
    <main class="columns is-centered mx-0">
        <div class="column is-9">
            <header class="page-header am-surface">
                <div class="brand">
                    <img class="brand-crest" src={ARSENAL_CREST} alt="Arsenal FC crest" width="44" height="44" />
                    <div class="brand-text">
                        <h1 class="brand-title">Next Arsenal Match</h1>
                        <p class="brand-sub">
                            {#if loading}
                                Loading fixtures…
                            {:else if summary?.count}
                                {summary.count} {summary.count === 1 ? 'match' : 'matches'}{#if rangeLabel}&nbsp;·&nbsp;{rangeLabel}{/if}
                            {:else}
                                Recent &amp; upcoming fixtures
                            {/if}
                        </p>
                    </div>
                </div>
                <div class="controls">
                    <Switch checked={showScores} label="Show scores" onChange={toggleShowScores} />
                    <div hidden>
                        <Switch checked={devMode} label="Dev mode" onChange={toggleDevMode} />
                    </div>
                </div>
            </header>

            {#if loading && matches.length === 0}
                <p class="empty-state">Loading matches…</p>
            {:else if !matches || matches.length === 0}
                <p class="empty-state">No matches found</p>
            {:else}
                <div class="match-list">
                    {#each matches as match, i (match.id)}
                        <MatchDetail matchData={match} {showScores} featured={i === 0} />
                    {/each}
                </div>
            {/if}
        </div>
    </main>
</div>

<style>
    .page-header {
        position: sticky;
        top: 0.75rem;
        z-index: 10;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem 1rem;
        margin-bottom: clamp(1rem, 3vw, 1.5rem);
        padding: 0.75rem clamp(0.85rem, 3vw, 1.25rem);
        /* Border, radius and text colour from .am-surface; translucent glass instead of the solid card gradient */
        background: var(--am-bg-glass);
        backdrop-filter: blur(14px) saturate(140%);
        -webkit-backdrop-filter: blur(14px) saturate(140%);
        overflow: hidden;
    }
    /* Arsenal-red accent line along the bottom edge */
    .page-header::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 2px;
        background: linear-gradient(90deg, var(--am-red), color-mix(in srgb, var(--am-red) 40%, transparent) 40%, transparent);
    }

    .brand {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        min-width: 0;
    }
    .brand-crest {
        flex-shrink: 0;
        width: clamp(36px, 9vw, 44px);
        height: clamp(36px, 9vw, 44px);
        object-fit: contain;
        filter: drop-shadow(0 3px 8px color-mix(in srgb, var(--am-red) 35%, transparent));
    }
    .brand-text { min-width: 0; }
    .brand-title {
        margin: 0;
        font-size: clamp(1.05rem, 3.6vw, 1.35rem);
        font-weight: 800;
        line-height: 1.2;
        letter-spacing: -0.01em;
        color: var(--am-text-strong);
    }
    .brand-sub {
        margin: 0.1rem 0 0;
        font-size: 0.78rem;
        color: var(--am-text-muted);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-left: auto;
    }

    .match-list {
        display: flex;
        flex-direction: column;
        gap: clamp(0.85rem, 2.5vw, 1.25rem);
    }

    .empty-state {
        padding: 3rem 1rem;
        text-align: center;
        font-size: 1.1rem;
        opacity: 0.7;
    }
</style>
