<script lang="ts">
    export let checked: boolean;
    export let label: string;
    export let onChange: (checked: boolean) => void;

    const handleToggle = () => {
        onChange(!checked);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleToggle();
        }
    };
</script>

<div class="switch-conatiner">
    <span>{label}</span>
    <div class="switch" on:click={handleToggle} on:keydown={handleKeyDown} role="switch" aria-checked={checked} tabindex="0">
        <div class="track">
            <div class="thumb" class:checked={checked}></div>
        </div>
    </div>
</div>

<style>
    .switch {
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        width: 50px;
        height: 25px;
        position: relative;
    }
    .track {
        background-color: #ccc;
        border-radius: 12.5px;
        width: 100%;
        height: 100%;
        position: relative;
        transition: background-color 0.3s;
    }
    .thumb {
        background-color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        position: absolute;
        top: 50%;
        left: 2.5px;
        transform: translateY(-50%);
        transition: transform 0.3s;
    }
    .thumb.checked {
        transform: translate(25px, -50%);
    }
    .switch[aria-checked="true"] .track {
        background-color: #25c1cf;
    }
    .switch-conatiner {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 1em;
    }
</style>
