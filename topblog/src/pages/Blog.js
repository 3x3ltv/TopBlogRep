import React from 'react';

function Blog() {
    return (
        <div>
            <h1>Latest Blog Posts</h1>
            <article>
                <h2>Understanding React Hooks</h2>
                <p>
                    Learn how to use React Hooks to manage state and side effects in your functional components.
                </p>
            </article>
            <article>
                <h2>Mastering CSS Grid Layout</h2>
                <p>
                    Dive into the world of CSS Grid Layout and create responsive and dynamic layouts for your web pages.
                </p>
            </article>
            {/* Add more articles as needed */}
        </div>
    );
}

export default Blog;
