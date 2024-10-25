import Image from 'next/image'
import DateFormatter from '../DateFormatter'

interface Author {
    id: number
    name: string
    role: string
    place: string
    avatar_url: string
}

interface RawPost {
    id: number;
    author_id: number;
    title: string;
    body: string;
    image_url: string;
    created_at: string;
}

interface Post {
    id: number
    postImageUrl: string
    postTitle: string
    postBody: string
    created_at: string
    authorAvatarUrl: string;
    authorName: string;
}

export default async function TemplateStyling() {
    const getData = async (jsonPath: string) => {
        const data = await fetch(`https://maqe.github.io/json${jsonPath}`);
        const result = await data.json();
        return result
    }

    const findAuthorByPostId = (authors: Author[], author_id: number): Author => {
        const author = authors.find((author) => author.id === author_id);
        if (author) {
            return author;
        } else {
            // Create a new Author object with default or placeholder values
            return {
                id: author_id,
                name: 'Unknown Author',
                role: 'Unknown Author Role',
                place: 'Unknown Author Place',
                avatar_url: '',
            };
        }
    };

    const buildPost = async (): Promise<Post[]> => {
        const authors: Author[] = await getData('/authors.json');
        const rawPosts = await getData('/posts.json');
        const posts = rawPosts.map((post: RawPost): Post => {
            const author = findAuthorByPostId(authors, post.author_id)
            return {
                id: post.id,
                postImageUrl: post.image_url,
                postTitle: post.title,
                postBody: post.body,
                created_at: post.created_at,
                authorAvatarUrl: author.avatar_url,
                authorName: author.name,
            };
        })
        return posts
    }

    const posts = await buildPost();
    // Get the user's current time zone
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return (<div className="flex flex-col gap-3 px-20 py-10 bg-[#eeeeee]">
        <h1 className='text-3xl font-bold'>MAQE Forum</h1>
        <p className='py-3'>{`Your current timezone is: ${timeZone}`}</p>
        {posts.map((post) => (
            <div className="flex flex-col w-full rounded-sm shadow-md odd:bg-white even:bg-[#ccecff]" key={post.id}>
                <div className="flex flex-row gap-2 border-b-2 border-gray-300 py-2 px-5 items-center overflow-x-scroll">
                    <Image src={post.authorAvatarUrl} alt={post.authorName} width={28} height={28}
                        className="flex-none rounded-full bg-slate-50" />
                    <p className="text-[#f8491f] font-semibold">{post.authorName}</p>
                    <p className="text-[#657384] text-sm">posted on <DateFormatter timeZone={timeZone} isoDateString={post.created_at} /></p>
                </div>
                <div className="flex flex-col xl:flex-row items-start gap-5 py-2 px-5">
                    <Image src={post.postImageUrl} alt={post.postTitle} width={270} height={200}
                        className="flex-none bg-slate-50 self-center" />
                    <div className='flex flex-col py-2 gap-3'>
                        <h3 className="text-lg font-bold">{post.postTitle}</h3>
                        <p className="">{post.postBody}</p>
                    </div>
                </div>
            </div>
        ))}
    </ div>);
}