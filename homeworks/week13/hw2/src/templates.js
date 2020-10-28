export function getForm(className, commentsClassName) {
  return `
    <form class="${className} mb-5">
      <div class="form-group">
        <label for="form-nickname">暱稱</label>
        <input type="text" name="nickname" id="form-nickname" class="form-control" maxlength="32">
      </div>
      <div class="form-group">
        <label for="form-content">留言內容</label>
        <textarea name="content" id="form-content" class="form-control" rows="4" maxlength="256"></textarea>
      </div>
      <button type="submit" class="btn btn-light">送出</button>
    </form>
    <div class="${commentsClassName} mb-4"></div>
  `;
}

export const getLoadMoreButton = className => `
<div class="d-flex">
  <button class="btn btn-secondary mx-auto ${className}">顯示更多留言</button>
</div>
`;

export const commentTemplate = (comment, escapeHtml) => `
  <div class="card bg-dark mb-2">
    <h5 class="card-header">${escapeHtml(comment.nickname)}</h5>
    <div class="card-body">
      <p class="card-text">${escapeHtml(comment.content)}</p>
      <p class="card-text">
        <small class="text-muted">${escapeHtml(comment.created_at)}</small>
      </p>
    </div>
  </div>
`;
