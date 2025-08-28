import { writable } from 'svelte/store';

// export const currencyMenu = [
//   {
//     image: "/currency/osrs.jpg",
//     text: "OSRS Gold",
//     link: "OSRS",
//     multiplier:0.23,
//     symbol:"Millions",
//     placeholder:"100M"
//   },
//   {
//     image: "/currency/rs3.jpg",
//     text: "Runescape 3 Gold",
//     link: "RS3",
//     multiplier:21,
//     symbol:"Billions",
//     placeholder:"1B"
//   },
//     {
//     image: "/currency/fortnite.jpg",
//     text: "Fortnite VBucks",
//     link: "Fortnite"
//   },
//      {
//     image: "/currency/robux.jpg",
//     text: "Robux",
//     link: "Roblox"
//   }
// ];

export let linkUpdate = writable("OSRS");