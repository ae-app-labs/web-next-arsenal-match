<script lang="ts">
	import Switch from './../../lib/components/Switch.svelte';
	import MatchDetail from '$lib/components/match-detail.svelte';
    import { onMount } from 'svelte';

    let matches = $state([]);
    let summary = $state();
    let showScores = $state(true);
    let devMode = $state(false);

    onMount(async () => {
        fetchApiData();
    });

    const fetchApiData = async () =>{
        const res = await fetch(`/api/matches?devMode=${devMode}`);
        if (res.ok) {
            console.log('Fetch successful');
            const data = await res.json();
            matches = data.matches;
            summary = data.summary;
        }
    }

    const toggleShowScores = () => {
        console.log(`Before: ${showScores}`);
        showScores = !showScores;
        console.log(`After: ${showScores}`);
    };

    const toggleDevMode = () => {
        console.log(`Before: ${devMode}`);
        devMode = !devMode;
        fetchApiData();
        console.log(`After: ${devMode}`);
    };

</script>

<svelte:head>
    <title>Match Data</title>
</svelte:head>

<div class="container">
    <main>
        <div class="has-text-centered">
            <h1 class="is-size-1">Match Data</h1>
            <div class="columns is-centered">
                <div class="column is-2">
                    <Switch checked={showScores} label="Show Scores" onChange={() => toggleShowScores()} />
                </div>
                <div class="column is-2">
                    <Switch checked={devMode} label="Dev Mode" onChange={() => { toggleDevMode() }} />
                </div>
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column is-9 ">
                {#if !matches || matches.length === 0}
                    <p class="is-size-3 has-text-centered">No matches found</p>
                {:else}
                    {#each matches as match}
                    <MatchDetail matchData={match} showScores={showScores}/>
                    {/each}
                {/if}
            </div>
        </div>
    </main>
</div>
