Coshx Website 2013
============================

About
-----
  * Gil's 2013 Design of CoshX
  * HTML5/CSS3/JS/jQuery
  * GoldenGridSystem
  * Yippie Kay yay

Jekyll
------

  * To build locally: `jekyll --pygments --no-lsi --safe`
  * See: https://help.github.com/articles/using-jekyll-with-pages

Testing
-------

  * After running the `jekyll` command, you'll have a static site generated.
  * Unfortunately, our templates don't handle relative vs. absolute links very well right now,
    so to fire up a site, run: `rackup` and then visit http://localhost:9292
  * Note that unlike rails, this is a static site, so when you make changes, you have to re-run jekyll. Someone might want to set up a Guardfile to do this automatically.

Deploying
---------

  * `git push origin master`
  * github will pick up on the fact that this is a jekyll site
  * visit http://coshx.github.io

