<script lang="ts">
    import { fade } from "svelte/transition";
    import MatchStatusBadge from './MatchStatusBadge.svelte';

    let { matchData, showScores, featured = false } = $props();

    const LIVE = ["IN_PLAY", "PAUSED"];
    const UPCOMING = ["TIMED", "SCHEDULED"];

    let kickoff = $derived(new Date(matchData.utcDate));
    let isLive = $derived(LIVE.includes(matchData.status));
    let isUpcoming = $derived(UPCOMING.includes(matchData.status));
    let hasScore = $derived(isLive || matchData.status === "FINISHED");
    let winner = $derived(matchData.status === "FINISHED" ? matchData.score?.winner : null);

    let dateLabel = $derived(kickoff.toLocaleDateString('en-GB', {
        weekday: 'short', day: '2-digit', month: 'short', year: 'numeric'
    }));
    let timeLabel = $derived(kickoff.toLocaleTimeString('en-GB', {
        hour: '2-digit', minute: '2-digit'
    }));

    const fmt = (n: number | null | undefined) => n ?? '–';
</script>

<article class="match-card am-surface" class:am-gradient-border={featured} class:featured class:live={isLive} transition:fade>
    <header class="card-head">
        <span class="competition">
            <img src={matchData.competition.emblem} alt="" width="20" height="20" />
            <span class="competition-name">{matchData.competition.name}</span>
        </span>
        <MatchStatusBadge status={matchData.status} />
    </header>

    <div class="fixture">
        <div class="team home" class:winner={winner === "HOME_TEAM"} class:loser={winner === "AWAY_TEAM"}>
            <img class="crest" src={matchData.homeTeam.crest} alt="{matchData.homeTeam.name} crest" width="72" height="72" />
            <span class="team-name" title={matchData.homeTeam.name}>{matchData.homeTeam.shortName}</span>
        </div>

        <div class="center">
            {#if hasScore && showScores}
                <div class="score" aria-label="Score {fmt(matchData.score.fullTime.home)} - {fmt(matchData.score.fullTime.away)}">
                    <span>{fmt(matchData.score.fullTime.home)}</span>
                    <span class="divider">:</span>
                    <span>{fmt(matchData.score.fullTime.away)}</span>
                </div>
                {#if matchData.status === "FINISHED" && matchData.score.halfTime?.home != null}
                    <span class="sub">HT {matchData.score.halfTime.home}–{matchData.score.halfTime.away}</span>
                {/if}
            {:else if hasScore}
                <div class="score hidden-score" aria-label="Score hidden">
                    <span>?</span><span class="divider">:</span><span>?</span>
                </div>
                <span class="sub">Score hidden</span>
            {:else if isUpcoming}
                <div class="kickoff">{timeLabel}</div>
                <span class="sub">Kick-off</span>
            {:else}
                <div class="kickoff">vs</div>
            {/if}
        </div>

        <div class="team away" class:winner={winner === "AWAY_TEAM"} class:loser={winner === "HOME_TEAM"}>
            <img class="crest" src={matchData.awayTeam.crest} alt="{matchData.awayTeam.name} crest" width="72" height="72" />
            <span class="team-name" title={matchData.awayTeam.name}>{matchData.awayTeam.shortName}</span>
        </div>
    </div>

    <footer class="card-foot">
        <time datetime={matchData.utcDate}>{dateLabel} · {timeLabel}</time>
    </footer>
</article>

<style>
    /* Surface colours, radius and gradient border come from app.scss (.am-surface / .am-gradient-border) */
    .match-card {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: clamp(0.75rem, 2.5vw, 1.25rem);
        padding: clamp(1rem, 3.5vw, 1.5rem) clamp(1rem, 4vw, 2rem);
        border-width: 2px;
        overflow: hidden;
        transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
    }

    .match-card.featured {
        border-width: 3px;
        box-shadow: 0 12px 36px -12px color-mix(in srgb, var(--am-cyan) 45%, transparent);
    }

    .match-card.live {
        border-color: color-mix(in srgb, var(--am-red) 55%, transparent);
        box-shadow: 0 12px 36px -12px color-mix(in srgb, var(--am-red) 50%, transparent);
    }

    @media (hover: hover) {
        .match-card:hover {
            transform: translateY(-3px);
            border-color: rgba(255, 255, 255, 0.18);
            box-shadow: 0 18px 40px -14px rgba(0, 0, 0, 0.7);
        }
        .match-card.featured:hover {
            border-color: transparent;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .match-card { transition: none; }
        .match-card:hover { transform: none; }
    }

    /* Header */
    .card-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
    }
    .competition {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        min-width: 0;
        font-size: 0.8rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--am-text-muted);
    }
    .competition img {
        flex-shrink: 0;
        padding: 2px;
        border-radius: 6px;
        background: #fff;
        object-fit: contain;
    }
    .competition-name {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    /* Fixture row */
    .fixture {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
        align-items: center;
        gap: clamp(0.5rem, 3vw, 1.5rem);
    }
    .team {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.6rem;
        text-align: center;
        min-width: 0;
        transition: opacity 0.2s ease;
    }
    .crest {
        width: clamp(48px, 14vw, 80px);
        height: clamp(48px, 14vw, 80px);
        object-fit: contain;
        filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.45));
    }
    .team-name {
        max-width: 100%;
        font-size: clamp(0.9rem, 2.8vw, 1.15rem);
        font-weight: 600;
        line-height: 1.2;
        overflow-wrap: anywhere;
    }
    .team.winner .team-name { color: var(--am-text-strong); font-weight: 800; }
    .team.loser { opacity: 0.6; }

    .center {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.35rem;
        min-width: clamp(5rem, 22vw, 8rem);
    }
    .score, .kickoff {
        display: flex;
        align-items: center;
        gap: 0.4em;
        padding: 0.2em 0.55em;
        border-radius: 0.75rem;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid var(--am-line);
        font-variant-numeric: tabular-nums;
        font-weight: 800;
        line-height: 1.1;
        color: var(--am-text-strong);
    }
    .score { font-size: clamp(1.75rem, 8vw, 2.75rem); }
    .kickoff { font-size: clamp(1.25rem, 5.5vw, 1.75rem); }
    .divider { color: var(--am-text-muted); font-weight: 400; }
    .hidden-score { color: var(--am-text-muted); }
    .live .score { border-color: color-mix(in srgb, var(--am-red) 45%, transparent); }
    .sub {
        font-size: 0.72rem;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--am-text-muted);
    }

    /* Footer */
    .card-foot {
        display: flex;
        justify-content: center;
        padding-top: 0.75rem;
        border-top: 1px solid var(--am-line);
        font-size: 0.85rem;
        color: var(--am-text-muted);
    }
</style>
