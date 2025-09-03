import { writable } from 'svelte/store';

export let loginStatus = writable(false);
export let profilePicture = writable("")
export let profileId = writable("")