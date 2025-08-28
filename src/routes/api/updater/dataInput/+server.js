// import { startMongo } from "$lib/server/db/mongo"
// import { Currency } from "$lib/server/model/currency";
// export const POST=async()=>{
//   try {
// await startMongo();
// const currencyMenu = [
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
//     const result = await Currency.insertMany(currencyMenu);

//     console.log("Result after insert", result);
//     return new Response(JSON.stringify(result))
//   } catch (err) {
//     console.error('POST /account login error:', err);
//     return new Response('Internal Server Error for login', { status: 500 });
//   }
// }

