import Image from "next/image";

const posts = [
    {
        id: 1,
        title: "Chào mừng đến với Blog của tôi",
        excerpt: "Đây là bài viết đầu tiên trên blog. Hãy cùng khám phá nhé!",
        date: "2024-06-10",
    },
    {
        id: 2,
        title: "Học React dễ dàng",
        excerpt:
            "Một số mẹo giúp bạn bắt đầu với React nhanh chóng và hiệu quả.",
        date: "2024-06-09",
    },
];

export default function Home() {
    return (
        <div className="min-h-screen p-8 sm:p-20 bg-white dark:bg-black text-black dark:text-white font-sans">
            <header className="mb-12 flex flex-col items-center">
                <Image
                    src="/next.svg"
                    alt="Logo Blog"
                    width={120}
                    height={30}
                    className="mb-4 dark:invert"
                />
                <h1 className="text-3xl font-bold mb-2">Blog cá nhân</h1>
                <p className="text-gray-600 dark:text-gray-300">
                    Chia sẻ kiến thức lập trình & cuộc sống
                </p>
            </header>
            <main className="max-w-xl mx-auto flex flex-col gap-8">
                {posts.map((post) => (
                    <article
                        key={post.id}
                        className="border rounded-lg p-6 shadow hover:shadow-lg transition"
                    >
                        <h2 className="text-xl font-semibold mb-2">
                            {post.title}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                            {post.excerpt}
                        </p>
                        <span className="text-xs text-gray-400">
                            {post.date}
                        </span>
                    </article>
                ))}
            </main>
            <footer className="mt-16 text-center text-sm text-gray-500">
                © 2024 Blog cá nhân. Được tạo bởi Next.js.
            </footer>
        </div>
    );
}
