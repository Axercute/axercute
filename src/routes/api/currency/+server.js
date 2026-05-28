import { Currency } from '$lib/server/model/currency';
import { startMongo } from '$lib/server/db/mongo.js';
import { json } from '@sveltejs/kit';

export const GET = async () => {
  try {
    await startMongo();

    const currencyFound = await Currency.find();

    return json(currencyFound, { status: 200 });
  } catch (err) {
    console.error("Currency API error:", err);

    return json(
      { error: "DB unavailable, retry later" },
      { status: 500 }
    );
  }
};