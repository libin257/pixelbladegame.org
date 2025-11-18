import { redditPosts } from '@/data/reddit'

export function RedditSection() {
  return (
    <div className="space-y-4">
      {redditPosts.map((post, index) => (
        <a
          key={index}
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-[#F4B860] transition-all"
        >
          <h3 className="text-lg font-semibold text-white mb-1">
            {post.icon} {post.title}
          </h3>
          <p className="text-sm text-gray-400 mb-1">r/{post.subreddit}</p>
          <p className="text-sm text-gray-300">{post.description}</p>
        </a>
      ))}
    </div>
  )
}
