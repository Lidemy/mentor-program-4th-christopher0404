<!-- <?php
  $uri = $_SERVER['REQUEST_URI'];
  $isAdminPage = (strpos($uri, 'admin.php') !== false);
?> -->

<nav class="nav">
  <ul role="menu" class="nav__list">
    <li class="nav__item">
      <a href="index.php" class="nav__link hover--underline">Home</a>
    </li>
    <li class="nav__item">
      <a href="articles.php" class="nav__link hover--underline">Articles</a>
    </li>
    <li class="nav__item">
      <a href="about.php" class="nav__link hover--underline">About</a>
    </li>

  <?php if (isset($_SESSION['username'])) { ?>
    <li class="nav__item">
      <div class="nav__avatar">
        <a href="#" role="button" class="">
          <img src="https://avatars1.githubusercontent.com/u/47883837?s=460&u=7b22e6d3fb15719d141d74f0b462970bd39be4ea&v=4" alt="Admin">
        </a>
      </div>
    </li>

    <div class="nav__popover invisible">
      <ul role="menu" class="user-actions">
        <li role="menuitem">
          <a href="create_post.php" class="user-actions__link">New post</a>
        </li>
        <li role="menuitem">
          <a href="admin.php" class="user-actions__link">My posts</a>
        </li>
        <li role="menuitem">
          <a href="logout.php" class="user-actions__link">Sign out</a>
        </li>
      </ul>
    </div>
  <?php } ?>
  </ul>
</nav>
