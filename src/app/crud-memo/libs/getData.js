export async function getData(user_id) {
    const res = await fetch("https://"+process.env.AUTH0_BASE_URL+"/api/memos/user/"+user_id, { cache: 'no-store' }); //https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#opting-out-of-data-caching
    if(!res.ok) {
        throw new Error("Failed to fetch data")
    }
    return res.json();
}
