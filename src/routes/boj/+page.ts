export async function load({ fetch }: LoadArguments) {
  return { infos: await (await fetch(`/api/boj/index`)).json() };
}
