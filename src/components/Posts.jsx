import Post from './Post'

export default function Posts({ userPosts = [], postInteractions, onToggleLike, onAddComment, onDeletePost }) {
  const postsData = [
    {
      id: 'sample-john-doe',
      avatar: 'https://www.w3schools.com/w3images/avatar2.png',
      name: 'John Doe',
      time: '1 min',
      blocks: [
        { type: 'text', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        { type: 'images', content: ['https://www.w3schools.com/w3images/lights.jpg', 'https://www.w3schools.com/w3images/nature.jpg'] },
      ],
    },
    {
      id: 'sample-jane-doe',
      avatar: 'https://www.w3schools.com/w3images/avatar5.png',
      name: 'Jane Doe',
      time: '16 min',
      blocks: [
        { type: 'text', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
      ],
    },
    {
      id: 'sample-angie-jane',
      avatar: 'https://www.w3schools.com/w3images/avatar6.png',
      name: 'Angie Jane',
      time: '32 min',
      blocks: [
        { type: 'text', content: 'Have you seen this?' },
        { type: 'images', content: ['https://www.w3schools.com/w3images/nature.jpg'] },
        { type: 'text', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
      ],
    },
  ]

  const feedPosts = [
    ...userPosts.map((post) => ({ post, isOwnPost: true })),
    ...postsData.map((post) => ({ post, isOwnPost: false })),
  ]

  return feedPosts.map(({ post, isOwnPost }) => (
    <Post
      data={post}
      interaction={postInteractions[post.id]}
      onToggleLike={onToggleLike}
      onAddComment={onAddComment}
      isOwnPost={isOwnPost}
      onDeletePost={onDeletePost}
      key={post.id}
    />
  ))
}