async function newFormHandler(event) {
    console.log("in this function");
    event.preventDefault();
    
    const title = document.querySelector('input[name="post-title"]').value;
    const blog_contents = document.querySelector('textarea[name="blog-body"]').value;

    const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
        title,
        blog_contents
    }),
    headers: {
        'Content-Type': 'application/json'
    }
    });

    if (response.ok) {
    document.location.replace('/dashboard');
    } else {
    alert(response.statusText);
    }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);