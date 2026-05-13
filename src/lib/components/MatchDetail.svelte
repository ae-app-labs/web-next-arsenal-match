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
        transition: transform 0.3s ease; /* Smooth transition for the grow animation */
        border: 1px solid transparent;
        overflow: hidden;
        position: relative;
    }
    .match-score {
        font-size: 3rem;
        font-weight: bold;
        color: #ffffff;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
    article{
        transition: transform 0.3s ease; /* Smooth transition for the grow animation */
    }
    .scorecard:hover, article:hover {
        transform: scale(1.05); 
        background: linear-gradient(135deg, rgba(235, 13, 72, 0.815), rgba(207, 221, 7, 0.973));
    }
    .score-left{
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 10px 0 0 10px;
    }
    .score-right{
        background-color: rgba(9, 9, 9, 0.6);
        border-radius: 0 10px 10px 0;
    }
</style>

<article class="message" transition:fade>
    <div class="message-body scorecard" class:has-background-dark={matchData.status === "FINISHED"}>
        <div class="content">
            <div class="has-text-centered">
                <div class="columns is-v-centered mx-0">
                    <div class="column is-one-third">
                        <p class="tag is-primary p-2">
                            {new Date(matchData.utcDate).toLocaleString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                            })}
                        </p>
                    </div>
                    <div class="column is-one-third">
                        <MatchStatusBadge status={matchData.status} />
                    </div>
                    <div class="column is-one-third is-hidden-mobile">
                        <p class="tag is-info p-2">
                            <img src="{matchData.area.flag}" alt="Country Flag" height="24" width="24" style="vertical-align: middle;" class="mr-2" />
                            <img src="{matchData.competition.emblem}" alt="Competition Emblem" height="24" width="24" style="vertical-align: middle;" />
                            {matchData.competition.name}
                        </p>
                    </div>
                </div>
            </div>
            <div class="columns is-vcentered is-4 py-4 is-mobile">
                <!-- Home Team -->
                <div class="column is-half has-text-right score-left">
                    <div class="columns is-vcentered is-mobile" style="">
                        <div class="column">
                            <p class="subtitle is-4">{matchData.homeTeam.shortName}</p>
                        </div>
                        <div class="column is-3 is-hidden-mobile">
                            <img src="{matchData.homeTeam.crest}" alt="Home Team Crest" height="120" width="120" />
                        </div>
                        <div class="column is-2">
                            <p class="subtitle is-1 match-score">
                                {#if showScores && (matchData.status === "FINISHED" || matchData.status === "IN_PLAY" || matchData.status === "PAUSED")}
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
                <div class="column is-1 has-text-centered is-flex-mobile is-hidden-tablet">
                    <p class="subtitle is-3">*</p>
                </div>
                <!-- Away Team -->
                <div class="column is-half has-text-left score-right">
                    <div class="columns is-vcentered is-mobile is-reversed-mobile">
                        <div class="column is-2 has-text-left">
                            <p class="subtitle is-1 match-score">
                                {#if showScores && (matchData.status === "FINISHED" || matchData.status === "IN_PLAY" || matchData.status === "PAUSED")}
                                    {matchData.score.fullTime.away}
                                {:else if matchData.status === "TIMED"}
                                    &nbsp;
                                {:else}
                                    *
                                {/if}
                            </p>
                        </div>
                        <div class="column is-3 is-hidden-mobile">
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
