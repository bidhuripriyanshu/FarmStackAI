let url;

if (window.location.hostname === 'localhost') {
    url = 'http://localhost:4999';
} else if (window.location.hostname === 'farm-stack-ai.vercel.app/') {
    url = 'https://farm-stack-ai-868q.vercel.app';
} else {
    // Default URL
    url = 'http://localhost:4999';
}

export default url;
