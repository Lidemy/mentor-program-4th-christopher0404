<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <?php include_once('./templates/head.php'); ?>
  <title>About | Christopher's Blog</title>
</head>

<body class="body">
  <?php include_once('./templates/navbar.php'); ?>

  <main class="main">
    <div class="container">
      <div class="profile">
        <div class="profile__avatar">
          <img src="https://avatars1.githubusercontent.com/u/47883837?s=460&u=7b22e6d3fb15719d141d74f0b462970bd39be4ea&v=4" alt="Christopher Chu">
        </div>
        <h1 class="profile__name">Christopher Chu</h1>
        <p class="profile__bio">A web designer/developer based in Taipei, Taiwan.</p>

        <ul class="profile__social">
          <li>
            <a href="https://github.com/christopher0404" target="_blank" rel="noopener noreferrer" class="profile__icon" title="GitHub">
              <svg width="32" height="32" viewBox="0 0 16 16" version="1.1" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
            </a>
          </li>
          <li>
            <a href="https://twitter.com/404_christopher" target="_blank" rel="noopener noreferrer" class="profile__icon" title="Twitter">
              <svg viewBox="0 0 24 24"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg>
            </a>
          </li>
          <li>
            <a href="https://chu-jun-ting.myportfolio.com/" target="_blank" rel="noopener noreferrer" class="profile__icon" title="Portfolio">
                <svg width="45" height="44" viewBox="0 0 56 54"><rect class="pf-rect" width="56" height="54" rx="9.91383"></rect><path class="pf-path" d="M13.0697,37.53963V13.89657c0-.17237.07422-.259.22217-.259.394,0,.6788-.00586,1.22177-.01855q.81372-.01832,1.75781-.03687.94336-.0183,1.998-.03711,1.05468-.0183,2.09033-.01855a13.90366,13.90366,0,0,1,4.73584.70312,8.22055,8.22055,0,0,1,3.08984,1.887,7.24017,7.24017,0,0,1,1.6836,2.60839,8.66369,8.66369,0,0,1,.51757,2.97852,8.21977,8.21977,0,0,1-1.36914,4.884,7.73031,7.73031,0,0,1-3.6997,2.79346,14.72217,14.72217,0,0,1-5.18018.86963q-.81445,0-1.14648-.01856-.33325-.0183-.999-.01855v7.28906a.2945.2945,0,0,1-.333.333H13.329Q13.06969,37.83553,13.0697,37.53963Zm4.92245-19.46216v7.65894q.48048.03735.8877.03711h1.2207a8.72693,8.72693,0,0,0,2.64551-.36987,3.99052,3.99052,0,0,0,1.88769-1.2212,3.55279,3.55279,0,0,0,.7212-2.36792,3.74033,3.74033,0,0,0-.53662-2.03491A3.45125,3.45125,0,0,0,23.209,18.46615a6.85542,6.85542,0,0,0-2.70117-.46265q-.8877,0-1.57227.01855Q18.25,18.0411,17.99215,18.07747Z"></path><path class="pf-path" d="M36.02364,23.90527l-2.60677-.0769c-.17285-.02441-.25928-.11108-.25928-.259V20.32422a.22919.22919,0,0,1,.25928-.259l2.60677.02856v-.07251a27.43939,27.43939,0,0,1,.18457-3.3125,7.33538,7.33538,0,0,1,.59228-1.86865,6.421,6.421,0,0,1,2.10889-2.479,6.185,6.185,0,0,1,3.626-.96191,9.46677,9.46677,0,0,1,1.07324.05542,5.34784,5.34784,0,0,1,1.06982.20361.38055.38055,0,0,1,.25928.36988v3.66308q0,.25928-.29639.18506c-.17285-.02441-.57666-.03711-.77392-.03711H43.3127a3.9504,3.9504,0,0,0-1.46777.259,1.58382,1.58382,0,0,0-.73975.86963,4.59232,4.59232,0,0,0-.24072,1.64649v1.47949h3.61523c.14746,0,.24024.02466.27735.074a.36852.36852,0,0,1,.05566.22193v3.25659q0,.25928-.333.259H40.86446l.02893,13.735a.49676.49676,0,0,1-.05518.22192c-.03711.074-.12939.11109-.27783.11109H36.34847c-.19776,0-.2959-.11109-.2959-.333Z"></path></svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </main>

  <?php include_once('./templates/footer.php'); ?>
</body>
</html>