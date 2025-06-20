import React, { useState } from 'react';
import './SocialHubMain.css';
import AuthModal from './AuthModal';

// Demo/mock data
const DEMO_USERS = [
  {
    id: 1,
    username: "dewprofile",
    displayName: "Alexa Dew",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "Minimalist. Coffee lover. Frontend Dev.",
    online: true
  },
  {
    id: 2,
    username: "brooklynb",
    displayName: "Brooklyn Babe",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    bio: "Photographer and designer",
    online: false
  }
];

const DEMO_POSTS = [
  {
    id: 1,
    author: DEMO_USERS[0],
    content: "Just joined SocialHub! Excited to post and connect. 🎉",
    createdAt: "2 minutes ago",
    likes: 2,
    likedByUser: false,
    comments: [
      { id: 1, author: DEMO_USERS[1], text: "Welcome! 🎈", createdAt: "1 min ago" }
    ]
  },
  {
    id: 2,
    author: DEMO_USERS[1],
    content: "Loving the #darkmode vibes here.",
    createdAt: "10 minutes ago",
    likes: 1,
    likedByUser: false,
    comments: [ ]
  }
];

// PUBLIC_INTERFACE
function SocialHubMain() {
  /**
   * Main container for ReactSocialHub.
   * Displays sidebar user profiles, central feed, stubbed notifications, and authentication UI.
   * Minimal demo logic with mock data and stubbed interaction handlers.
   */
  const [posts, setPosts] = useState(DEMO_POSTS);
  const [newPost, setNewPost] = useState('');
  const [currentUser, setCurrentUser] = useState(DEMO_USERS[0]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup' | 'mobile'
  const [showAuth, setShowAuth] = useState(false);
  const [notificationList, setNotificationList] = useState([
    { id: 1, type: 'like', message: "Brooklyn liked your post", read: false, time: "now" }
  ]);

  // PUBLIC_INTERFACE
  function handlePostCreate(e) {
    e.preventDefault();
    if (!newPost.trim()) return;
    setPosts([
      {
        id: Date.now(),
        author: currentUser,
        content: newPost,
        createdAt: "just now",
        likes: 0,
        likedByUser: false,
        comments: []
      },
      ...posts
    ]);
    setNewPost('');
  }

  // PUBLIC_INTERFACE
  function handleLike(postId) {
    setPosts(posts.map(p =>
      p.id === postId
        ? {
            ...p,
            likes: p.likedByUser ? p.likes - 1 : p.likes + 1,
            likedByUser: !p.likedByUser
          }
        : p
    ));
    // Stub: in real app, trigger notification, update backend, etc.
  }

  // PUBLIC_INTERFACE
  function handleAddComment(postId, commentText) {
    if (!commentText.trim()) return;
    setPosts(posts.map(p =>
      p.id === postId
        ? {
            ...p,
            comments: [
              ...p.comments,
              {
                id: Date.now(),
                author: currentUser,
                text: commentText,
                createdAt: "just now"
              }
            ]
          }
        : p
    ));
  }

  // PUBLIC_INTERFACE
  function handleDeletePost(postId) {
    setPosts(posts.filter(p => p.id !== postId));
  }

  // PUBLIC_INTERFACE
  function NotificationPanel({ notifications, open, onClose }) {
    // Only UI/stub, marks notifications as read when closed
    return (
      <div className={`notif-panel${open ? " open" : ""}`}>
        <div className="notif-header">
          Notifications
          <button className="icon-btn" onClick={onClose} title="Close">&times;</button>
        </div>
        <div className="notif-list">
          {notifications.length === 0 ? (
            <div className="empty-msg">No new notifications</div>
          ) : notifications.map(n => (
            <div className={`notif-item${n.read ? "" : " unread"}`} key={n.id}>
              <span>{n.message}</span>
              <span className="notif-time">{n.time}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // PUBLIC_INTERFACE
  function AuthModal({ mode, onClose }) {
    // Purely UI, shows login/signup form stubs
    return (
      <div className="auth-modal">
        <div className="auth-card">
          <button className="auth-close-btn" onClick={onClose}>&times;</button>
          <h2>{mode === 'signup' ? "Sign Up" : "Login"}</h2>
          <form>
            <input type="email" placeholder="Email" disabled />
            <input type="password" placeholder="Password" disabled />
            {mode === 'signup'
              ? <input type="text" placeholder="Display Name" disabled />
              : null}
            <button className="btn primary" type="button" disabled>Continue</button>
            <div className="auth-divider">or</div>
            <button className="btn secondary" type="button" disabled>Continue with Google</button>
          </form>
          <div className="auth-switch">
            {mode === 'signup'
              ? <>Already have an account? <button type="button" onClick={() => setAuthMode('login')}>Login</button></>
              : <>New here? <button type="button" onClick={() => setAuthMode('signup')}>Sign Up</button></>
            }
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="shub-app">
      {/* Sidebar */}
      <aside className="shub-sidebar">
        <div className="sidebar-brand">
          <span className="brand-accent">{/* logo-dot */}</span> ReactSocialHub
        </div>
        <div className="sidebar-user-block">
          <div className="sidebar-user">
            <img className="sidebar-avatar" src={currentUser.avatar} alt="" />
            <div>
              <div className="sidebar-username">{currentUser.displayName}</div>
              <div className="sidebar-handle">@{currentUser.username}</div>
            </div>
          </div>
          <button className="btn btn-logout" onClick={() => {setAuthMode('login'); setShowAuth(true);}}>Logout</button>
        </div>
        <div className="sidebar-section-title">People</div>
        <div>
          {DEMO_USERS.map(user => (
            <div className={`sidebar-profile${user.id === currentUser.id ? " active" : ""}`} key={user.id}>
              <img className="sidebar-avatar-small" src={user.avatar} alt="" />
              <span className="sidebar-profile-name">{user.displayName}</span>
              {user.online && <span className="user-online-dot" title="Online"></span>}
            </div>
          ))}
        </div>
        <div className="sidebar-footer">
          <button
            className="btn btn-create"
            onClick={() => {setAuthMode('login'); setShowAuth(true);}}
            style={{ fontSize: '0.9rem', marginTop: 8 }}
          >
            {currentUser ? 'Switch Account' : 'Sign In'}
          </button>
        </div>
      </aside>

      {/* Main Feed */}
      <main className="shub-mainfeed">
        {/* Header */}
        <div className="shub-header">
          <div className="shub-title">Feed</div>
          <div className="shub-header-actions">
            <button className="icon-btn" title="Notifications" onClick={() => setNotifOpen(val => !val)}>
              <span className="notif-icon-dot"/>
              <span role="img" aria-label="bell">🔔</span>
              {notificationList.find(n => !n.read) ? <span className="notif-badge" /> : null}
            </button>
            <button className="icon-btn" title="Profile" onClick={() => {setAuthMode('login'); setShowAuth(true);}}>
              <img src={currentUser.avatar} alt="" style={{ width: 28, height: 28, borderRadius: 16, border: '1px solid #444' }}/>
            </button>
          </div>
        </div>
        {/* Post creation */}
        <form className="post-create" onSubmit={handlePostCreate}>
          <img className="post-create-avatar" src={currentUser.avatar} alt="" />
          <textarea
            className="post-create-input"
            value={newPost}
            placeholder="Share something..."
            onChange={e => setNewPost(e.target.value)}
            rows={2}
          />
          <button className="btn btn-post" type="submit" disabled={!newPost.trim()}>Post</button>
        </form>
        {/* Feed posts */}
        <div className="post-feed">
          {posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onLike={() => handleLike(post.id)}
              onDelete={() => handleDeletePost(post.id)}
              onAddComment={text => handleAddComment(post.id, text)}
              isOwner={currentUser && post.author.id === currentUser.id}
            />
          ))}
        </div>
      </main>

      {/* Notifications UI hook */}
      <NotificationPanel
        notifications={notificationList}
        open={notifOpen}
        onClose={() => {
          setNotifOpen(false);
          setNotificationList(list => list.map(n => ({ ...n, read: true })));
        }}
      />
      {/* Auth Modal */}
      {showAuth && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuth(false)}
        />
      )}
    </div>
  );
}

// PUBLIC_INTERFACE
function PostCard({ post, onLike, onDelete, onAddComment, isOwner }) {
  // Simple comment state: allow only one new comment at a time
  const [commentText, setCommentText] = useState('');
  return (
    <div className="post-card">
      <div className="post-author-block">
        <img className="post-avatar" src={post.author.avatar} alt="" />
        <div>
          <div className="post-author-name">{post.author.displayName}</div>
          <div className="post-author-handle">@{post.author.username}</div>
        </div>
        <div className="post-time">{post.createdAt}</div>
        {isOwner && (
          <button className="icon-btn post-delete-btn" title="Delete" onClick={onDelete}>&#128465;</button>
        )}
      </div>
      <div className="post-content">{post.content}</div>
      <div className="post-actions">
        <button
          className={`icon-btn like-btn${post.likedByUser ? " liked" : ""}`}
          title={post.likedByUser ? "Unlike" : "Like"}
          onClick={onLike}
        >
          <span role="img" aria-label="like">❤️</span>
          <span className="like-count">{post.likes}</span>
        </button>
        <span className="comment-count">{post.comments.length} Comments</span>
      </div>
      <div className="post-comments">
        {post.comments.map(comment => (
          <div className="comment-row" key={comment.id}>
            <span className="comment-user">{comment.author.displayName}:</span>
            <span>{comment.text}</span>
            <span className="comment-time">{comment.createdAt}</span>
          </div>
        ))}
        <form className="comment-form" onSubmit={e => {
          e.preventDefault();
          onAddComment(commentText);
          setCommentText('');
        }}>
          <input
            className="comment-input"
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            placeholder="Add a comment..."
          />
          <button className="btn btn-small" type="submit" disabled={!commentText.trim()}>Send</button>
        </form>
      </div>
    </div>
  );
}


export default SocialHubMain;
