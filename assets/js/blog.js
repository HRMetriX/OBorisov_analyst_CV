// ==================== РЕНДЕР БЛОГОСФЕРЫ ====================
function renderBlogPosts() {
  var container = document.getElementById('blogPostsContainer');
  if (!container) return;

  fetch('assets/data/blog.json')
    .then(function(response) {
      if (!response.ok) throw new Error('No posts');
      return response.json();
    })
    .then(function(posts) {
      if (!posts.length) return;

      var html = '';
      posts.forEach(function(post) {
        var tagsHtml = post.tags.map(function(tag) {
          return '<span class="tag">' + tag + '</span>';
        }).join('\n            ');

        html +=
          '<article class="blogPostCard">\n' +
          '  <time class="blogPostDate" datetime="' + post.date + '">' + formatDate(post.date) + '</time>\n' +
          '  <h2 class="blogPostTitle">' + post.title + '</h2>\n' +
          '  <div class="blogPostTags">\n    ' + tagsHtml + '\n  </div>\n' +
          '  <p class="blogPostExcerpt">' + post.excerpt + '</p>\n' +
          '  <a href="' + post.url + '" class="blogPostLink">Читать →</a>\n' +
          '</article>';
      });

      container.innerHTML = html;
    })
    .catch(function() {
      // Постов нет - показываем заглушку
      var empty = document.querySelector('.blogEmpty');
      if (empty) empty.style.display = 'block';
    });
}

function formatDate(dateStr) {
  var months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];
  var d = new Date(dateStr);
  return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
}

document.addEventListener('DOMContentLoaded', renderBlogPosts);