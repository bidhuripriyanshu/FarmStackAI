import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import PostTitles from '../components/PostTitles';
import CreatePost from '../components/CreatePost';
import url from '../url';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [cookies] = useCookies();
    const navigate = useNavigate();

    const fetchData = useCallback(async () => {
      try {
        const response = await axios.get(`${url}/Postfetch`);
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }, []);

    // Fetch user profile
    const fetchUserProfile = useCallback(async () => {
      if (!cookies.token) {
        navigate("/login");
        return;
      }
      try {
        setLoadingProfile(true);
        const { data } = await axios.post(
          `${url}`,
          { tok: cookies.token },
          { withCredentials: true }
        );
        if (data.status && data.user) {
          setUserProfile({
            name: data.user,
            email: data.email || '',
            id: data.id,
            language: data.language
          });
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoadingProfile(false);
      }
    }, [cookies.token, navigate]);

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      fetchData(); 
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, [fetchData]);
  
    useEffect(() => {
      fetchData();
      fetchUserProfile();
    }, [fetchData, fetchUserProfile]);

    // Generate avatar initials from name
    const getAvatarInitials = (name) => {
      if (!name) return 'U';
      const names = name.trim().split(' ');
      if (names.length >= 2) {
        return (names[0][0] + names[names.length - 1][0]).toUpperCase();
      }
      return name[0].toUpperCase();
    };

    // Generate avatar color based on name
    const getAvatarColor = (name) => {
      if (!name) return '#667eea';
      const colors = [
        '#667eea', '#764ba2', '#f093fb', '#4facfe', 
        '#43e97b', '#fa709a', '#fee140', '#30cfd0'
      ];
      const index = name.charCodeAt(0) % colors.length;
      return colors[index];
    };
  
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
          <div className="row g-3">
            {/* User Profile Sidebar */}
            <div className="col-lg-3 col-xl-3 mb-3 mb-lg-4 d-none d-lg-block">
              {loadingProfile ? (
                <div className="card shadow-lg border-0" style={{
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '24px',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}>
                  <div className="card-body p-4 text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </div>
              ) : userProfile ? (
                <div className="card shadow-lg border-0 sticky-top" style={{
                  top: '20px',
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '24px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  overflow: 'hidden'
                }}>
                  <div className="card-body p-4">
                    {/* Profile Header with Gradient */}
                    <div style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      margin: '-1.5rem -1.5rem 1.5rem -1.5rem',
                      padding: '2rem 1.5rem 1rem 1.5rem',
                      textAlign: 'center'
                    }}>
                      {/* Profile Photo/Avatar */}
                      <div style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        background: getAvatarColor(userProfile.name),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem',
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        color: '#fff',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                        border: '4px solid rgba(255,255,255,0.3)'
                      }}>
                        {getAvatarInitials(userProfile.name)}
                      </div>
                      <h4 className="mb-1 text-white" style={{ fontWeight: '600' }}>
                        {userProfile.name}
                      </h4>
                    </div>

                    {/* Profile Details */}
                    <div className="mt-3">
                      <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <span className="me-2" style={{ fontSize: '1.2rem' }}>📧</span>
                          <small className="text-muted" style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Email
                          </small>
                        </div>
                        <p className="mb-0" style={{ 
                          fontSize: '0.9rem', 
                          color: '#495057',
                          wordBreak: 'break-word',
                          paddingLeft: '2rem'
                        }}>
                          {userProfile.email || 'Not available'}
                        </p>
                      </div>

                      <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <span className="me-2" style={{ fontSize: '1.2rem' }}>🆔</span>
                          <small className="text-muted" style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            User ID
                          </small>
                        </div>
                        <p className="mb-0" style={{ 
                          fontSize: '0.85rem', 
                          color: '#6c757d',
                          paddingLeft: '2rem',
                          fontFamily: 'monospace'
                        }}>
                          {userProfile.id ? userProfile.id.substring(0, 8) + '...' : 'N/A'}
                        </p>
                      </div>

                      {userProfile.language && (
                        <div>
                          <div className="d-flex align-items-center mb-2">
                            <span className="me-2" style={{ fontSize: '1.2rem' }}>🌐</span>
                            <small className="text-muted" style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                              Language
                            </small>
                          </div>
                          <p className="mb-0" style={{ 
                            fontSize: '0.9rem', 
                            color: '#495057',
                            paddingLeft: '2rem'
                          }}>
                            {userProfile.language.toUpperCase()}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Profile Stats */}
                    <div className="mt-4 pt-3" style={{ borderTop: '1px solid #e9ecef' }}>
                      <div className="row text-center">
                        <div className="col-6">
                          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>
                            {posts.length}
                          </div>
                          <small className="text-muted">Posts</small>
                        </div>
                        <div className="col-6">
                          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#764ba2' }}>
                            👤
                          </div>
                          <small className="text-muted">Active</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Main Content */}
            <div className="col-12 col-lg-9 col-xl-9">
              {/* User Profile Card for Mobile/Tablet */}
              {userProfile && (
                <div className="card shadow-lg border-0 mb-4 d-lg-none" style={{
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '24px',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}>
                  <div className="card-body p-3">
                    <div className="d-flex align-items-center">
                      <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: getAvatarColor(userProfile.name),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#fff',
                        marginRight: '1rem',
                        flexShrink: 0
                      }}>
                        {getAvatarInitials(userProfile.name)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h5 className="mb-1" style={{ fontWeight: '600', fontSize: '1rem' }}>
                          {userProfile.name}
                        </h5>
                        <p className="mb-0 text-muted" style={{ 
                          fontSize: '0.85rem',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {userProfile.email || 'Not available'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Header Section */}
              <div className="card shadow-lg border-0 mb-4" style={{
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <div className="card-body p-3 p-md-4 text-center">
                  <div className="d-flex align-items-center justify-content-center mb-2 mb-md-3 flex-column flex-md-row">
                    <span className="fs-1 me-0 me-md-3 mb-2 mb-md-0" style={{ animation: 'bounce 2s infinite' }}>💬</span>
                    <h1 className="mb-0" style={{
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                      fontWeight: '700'
                    }}>
                      Community Forum
                    </h1>
                  </div>
                  <p className="text-muted mb-0" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.25rem)' }}>Share your farming experiences and connect with other farmers</p>
                </div>
              </div>

              {/* Create Post Section */}
              <div className="card shadow-lg border-0 mb-4" style={{
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <div className="card-body p-4">
                  <CreatePost onRefresh={onRefresh} />
                </div>
              </div>

              {/* Posts Section */}
              <div className="card shadow-lg border-0" style={{
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
                      Recent Posts
                    </h3>
                  </div>
                  
                  {refreshing && (
                    <div className="text-center py-4">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="text-muted mt-2">Refreshing posts...</p>
          </div>
                  )}

          <PostTitles type="posts" posts={posts} />
                </div>
              </div>
            </div>
          </div>
      </div>
  </div>
    );
  };

export default Post