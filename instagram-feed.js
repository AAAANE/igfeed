async function fetchInstagramFeed() {
    const response = await fetch('https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink&access_token=IGQWRQeG5iUzl4NnVUYWNOS0U3VmdGb2FLY0k2TkRBRkx5S0hyTThyNWhCYnZAPZATdvRVo2MVJGeU9VZAWl5OWR1WlViRkh5Skh6T3FMOUdSbFltVmZAQT01JSXlQb0RUMzVTM1BCczcwdFNkaEx6eWxaMDRjSTJMa3MZD');
    const data = await response.json();
    const feedContainer = document.querySelector('.instagram-feed');
    
    data.data.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'instagram-post';
        postElement.style.margin = '10px';
        postElement.style.maxWidth = '200px';
        postElement.style.flex = '1 0 21%';
        postElement.style.boxSizing = 'border-box';
        
        if (post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM') {
            postElement.innerHTML = `
                <a href="${post.permalink}" target="_blank" style="text-decoration:none;">
                    <img src="${post.media_url}" alt="${post.caption || 'Instagram post'}" style="width:100%;height:auto;display:block;" />
                </a>
            `;
        } else if (post.media_type === 'VIDEO') {
            postElement.innerHTML = `
                <a href="${post.permalink}" target="_blank" style="text-decoration:none;">
                    <video controls style="width:100%;height:auto;display:block;">
                        <source src="${post.media_url}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </a>
            `;
        }
        feedContainer.appendChild(postElement);
    });
}

window.onload = fetchInstagramFeed;
