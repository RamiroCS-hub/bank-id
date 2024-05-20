import z from "zod";

const transactionValidation = z.object({
  cardNumberOrigin: z.number().int(),
  cardNumberDestination: z.number().int(),
  amount: z.number().int(),
  description: z.string(),
});

const cardNumberValidation = z.object({
  cardNumber: z.number().int(),
})

export function validateTransaction(object) {
  return transactionValidation.safeParse(object);
}

export async function validateGetTransactions(object) {
  return cardNumberValidation.safeParse(object)
}

