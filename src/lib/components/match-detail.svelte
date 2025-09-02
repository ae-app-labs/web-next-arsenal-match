<script lang="ts">
    import { fade } from "svelte/transition";
    import MatchStatusBadge from './MatchStatusBadge.svelte';

    let { matchData, showScores } = $props();
</script>

<!-- Add this to your style block -->
<style>
    :global(article:first-child) {
        border: 4px solid;
        border-image: linear-gradient(90deg, #ff3c6f, #25c1cf, #8bc34a, #ffd600) 1;
        border-radius: 1em;
        box-shadow: 0 0 16px #25c1cf88, 0 0 4px #ff3c6f55;
        /* fallback for browsers that don't support border-image */
        border-image: linear-gradient(90deg, #ff9800, #25c1cf, #8bc34a) 1;
        border-radius: 1em;
        box-shadow: 0 0 10px #25c1cf44;
    }
    .message {
        border-radius: 1em;
    }
    .message-body{
        border: 0;
        padding-bottom: 1em;
    }
    .scorecard {
        background: radial-gradient(circle at top left, #0a1a2f, #0b2b52 70%);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.6),
                    inset 0 0 20px rgba(255, 255, 255, 0.05);
        padding: 20px 30px;
        text-align: center;
        margin: auto;
        backdrop-filter: blur(20px); /* glassmorphism feel */
        border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .match-score {
        font-size: 3rem;
        font-weight: bold;
        color: #ffffff;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

</style>

<article class="message" transition:fade>
    <div class="message-body scorecard" class:has-background-dark={matchData.status === "FINISHED"}>
        <div class="content">
            <div class="has-text-centered">
                <p class="is-size-5">
                    {new Date(matchData.utcDate).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: true
                    })}
                </p>
                <MatchStatusBadge status={matchData.status} />
            </div>
            <div class="columns is-vcentered is-4 py-4">
                <div class="column is-half has-text-right">
                    <div class="columns is-vcentered">
                        <div class="column">
                            <p class="subtitle is-4">{matchData.homeTeam.shortName}</p>
                        </div>
                        <div class="column is-3">
                            <img src="{matchData.homeTeam.crest}" alt="Home Team Crest" height="120" width="120" />
                        </div>
                        <div class="column is-2">
                            <p class="subtitle is-1 match-score">
                                {#if showScores && matchData.status === "FINISHED"}
                                    {matchData.score.fullTime.home}
                                {:else if matchData.status === "TIMED"}
                                    &nbsp;
                                {:else}
                                    *
                                {/if}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="column is-half has-text-left">
                    <div class="columns is-vcentered">
                        <div class="column is-2">
                            <p class="subtitle is-1 match-score">
                                {#if showScores && matchData.status === "FINISHED"}
                                    {matchData.score.fullTime.away}
                                {:else if matchData.status === "TIMED"}
                                    &nbsp;
                                {:else}
                                    *
                                {/if}
                            </p>
                        </div>
                        <div class="column is-3">
                            <img src="{matchData.awayTeam.crest}" alt="Home Team Crest" height="120" width="120" />
                        </div>
                        <div class="column has-text-left">
                            <p class="subtitle is-4">{matchData.awayTeam.shortName}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</article>
