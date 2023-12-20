import AddPost from "@/app/crud-memo/components/AddPost";
import PostList from "@/app/crud-memo/components/PostList";
import { getData } from "@/app/crud-memo/libs/getData";



import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withPageAuthRequired( 
    async function CRUDPage() {
    
        // ---------------------------
        function extractNumber(str) { 
            const parts = str.split('|'); return parts.length > 1 ? parts[1] : null; 
        }
        // ---------------------------
        
        const { user } = await getSession();
        const posts = await getData( extractNumber(user.sub) )

        return (
            <div className='max-w-4xl mx-auto mt-4'>
                <div className='my-5 flex flex-col gap-4'>
                    {/* <h1 className='text-3xl font-bold'>Post-That Thought</h1> */}
                    {/* <AddPost /> */}
                </div>
                <PostList posts={posts} />
            </div>
        )
    },
    { returnTo: '/' }
);
