<script lang="ts">
    const ARSENAL_CREST = 'https://crests.football-data.org/57.png';
</script>

<svelte:head>
    <title>Next Arsenal Match</title>
</svelte:head>

<main class="landing">
    <section class="hero-card am-surface am-gradient-border">
        <img class="hero-crest" src={ARSENAL_CREST} alt="Arsenal FC crest" width="96" height="96" />

        <h1 class="hero-title">Next Arsenal Match</h1>
        <p class="hero-text">
            A simple proof of concept built with SvelteKit that shows recent and upcoming
            matches for Arsenal Football Club.
        </p>

        <a href="next-match" class="cta">
            View matches
            <span class="cta-arrow" aria-hidden="true">→</span>
        </a>

        <footer class="hero-foot">
            Match data from the
            <a href="https://www.football-data.org/" target="_blank" rel="noopener noreferrer">Football Data API</a>
        </footer>
    </section>
</main>

<style>
    .landing {
        display: grid;
        place-items: center;
        min-height: 100vh;
        min-height: 100dvh;
        padding: clamp(1rem, 4vw, 2rem);
    }

    /* Surface and gradient border come from app.scss (.am-surface / .am-gradient-border) */
    .hero-card {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        width: 100%;
        max-width: 34rem;
        padding: clamp(1.75rem, 6vw, 3rem) clamp(1.25rem, 6vw, 3rem);
        border-radius: var(--am-radius-lg);
        box-shadow: 0 20px 50px -20px color-mix(in srgb, var(--am-cyan) 45%, transparent);
        text-align: center;
    }

    .hero-crest {
        width: clamp(72px, 20vw, 96px);
        height: clamp(72px, 20vw, 96px);
        object-fit: contain;
        filter: drop-shadow(0 6px 18px color-mix(in srgb, var(--am-red) 40%, transparent));
    }

    .hero-title {
        margin: 0;
        font-size: clamp(1.75rem, 7vw, 2.5rem);
        font-weight: 800;
        line-height: 1.1;
        letter-spacing: -0.02em;
        color: var(--am-text-strong);
    }

    .hero-text {
        margin: 0;
        max-width: 28rem;
        font-size: clamp(0.95rem, 3vw, 1.05rem);
        line-height: 1.6;
        color: var(--am-text-soft);
    }

    .cta {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0.5rem;
        padding: 0.8rem 1.6rem;
        border-radius: 999px;
        background: var(--am-red);
        color: var(--am-text-strong);
        font-weight: 700;
        line-height: 1;
        text-decoration: none;
        box-shadow: 0 8px 22px -8px color-mix(in srgb, var(--am-red) 70%, transparent);
        transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    }
    .cta:hover {
        background: color-mix(in srgb, var(--am-red) 88%, white);
        color: var(--am-text-strong);
        transform: translateY(-2px);
        box-shadow: 0 12px 28px -8px color-mix(in srgb, var(--am-red) 80%, transparent);
    }
    .cta:focus-visible {
        outline: 2px solid var(--am-cyan);
        outline-offset: 3px;
    }
    .cta-arrow { transition: transform 0.2s ease; }
    .cta:hover .cta-arrow { transform: translateX(3px); }

    .hero-foot {
        width: 100%;
        margin-top: 0.75rem;
        padding-top: 1rem;
        border-top: 1px solid var(--am-line);
        font-size: 0.8rem;
        color: var(--am-text-muted);
    }
    .hero-foot a {
        color: var(--am-cyan);
        text-decoration: underline;
        text-underline-offset: 2px;
    }
    .hero-foot a:hover { color: color-mix(in srgb, var(--am-cyan) 60%, white); }

    @media (prefers-reduced-motion: reduce) {
        .cta, .cta-arrow { transition: none; }
        .cta:hover, .cta:hover .cta-arrow { transform: none; }
    }
</style>
