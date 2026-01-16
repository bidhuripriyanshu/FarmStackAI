import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import CommentBox from '../components/CommentBox'
import PostTitles from '../components/PostTitles';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import url from '../url'

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${url}/PostId?postId=${postId}`);
        const data = await response.data;

        if (response.status) {
          setPost(data);
        } else {
          console.error("Error fetching post:", data.message);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${url}/Commentfetch?postId=${postId}`);
        const data = await response.data;

        if (response.status) {
          setComments(data.comments);
        } else {
          console.error("Error fetching comments:", data.message);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId]); 
  
  const formatDate = (dateString) => {
    let distance = formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
    });
    distance = distance.replace("about ", "");
    return distance;
  };

  const handleCommentSubmission = async (commentData) => {
    try {
      const response = await axios.post(`${url}/Comment`, commentData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
  
      console.log("Comment submitted:", data);
      toast.success('Replied!', {
        position: 'top-right',
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: setTimeout(function(){ window.location.reload(1);}, 1500)
      });
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div className="card shadow-lg border-0" style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div className="card-body p-5 text-center">
            <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h4 className="text-muted">Loading post details...</h4>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div className="card shadow-lg border-0" style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div className="card-body p-5 text-center">
            <span className="fs-1 mb-3 d-block">❌</span>
            <h4 className="text-muted">Post not found</h4>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background */}
      <div className="position-fixed w-100 h-100" style={{ zIndex: 1, pointerEvents: 'none' }}>
        <div className="position-absolute" style={{ top: '15%', left: '10%', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', animation: 'float 8s ease-in-out infinite' }}></div>
        <div className="position-absolute" style={{ top: '70%', right: '15%', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', animation: 'float 8s ease-in-out infinite 2s' }}></div>
        <div className="position-absolute" style={{ bottom: '30%', left: '20%', width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', animation: 'float 8s ease-in-out infinite 4s' }}></div>
      </div>

      <div className="container-fluid py-3 py-md-4 px-2 px-md-3" style={{ position: 'relative', zIndex: 2 }}>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            {/* Header Section */}
            <div className="card shadow-lg border-0 mb-4" style={{
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div className="card-body p-3 p-md-4 text-center">
                <div className="d-flex align-items-center justify-content-center mb-2 mb-md-3 flex-column flex-md-row">
                  <span className="fs-1 me-0 me-md-3 mb-2 mb-md-0" style={{ animation: 'bounce 2s infinite' }}>📄</span>
                  <h1 className="mb-0" style={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                    fontWeight: '700'
                  }}>
                    Post Details
                  </h1>
                </div>
                <p className="text-muted mb-0" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.25rem)' }}>View and discuss this community post</p>
              </div>
            </div>

            {/* Post Content */}
            <div className="card shadow-lg border-0 mb-4" style={{
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-4">
                  <span className="fs-2 me-3">📝</span>
                  <h3 className="mb-0" style={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Original Post
                  </h3>
                </div>
                <PostTitles type="post" posts={[post]} />
              </div>
            </div>

            {/* Comment Section */}
            <div className="card shadow-lg border-0 mb-4" style={{
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-4">
                  <span className="fs-2 me-3">💬</span>
                  <h3 className="mb-0" style={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Add Comment
                  </h3>
                </div>
                <CommentBox postId={postId} type="comment" onCommentSubmit={handleCommentSubmission} />
              </div>
            </div>

            {/* Comments List */}
            <div className="card shadow-lg border-0" style={{
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-4">
                  <span className="fs-2 me-3">💭</span>
                  <h3 className="mb-0" style={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Comments ({comments.length})
                  </h3>
                </div>
                
                {comments.length === 0 ? (
                  <div className="text-center py-5">
                    <span className="fs-1 d-block mb-3">💭</span>
                    <h5 className="text-muted">No comments yet</h5>
                    <p className="text-muted">Be the first to share your thoughts!</p>
                  </div>
                ) : (
                  <PostTitles type="comment" posts={comments} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default PostDetails;
