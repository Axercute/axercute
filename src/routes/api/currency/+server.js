import { Currency } from '$lib/server/model/currency';
import { startMongo } from '$lib/server/db/mongo.js';

export const GET = async () => {
    await startMongo()
    const currencyFound = await Currency.find()
    // console.log("Currency data fetched",currencyFound)
    return new Response(JSON.stringify(currencyFound), { status: 200 });
};  