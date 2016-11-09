/* feedreader.js
*
* This is the spec file that Jasmine will read and contains
* all of the tests that will be run against your application.
*/

/* We're placing all of our tests within the $() function,
* since some of these tests may require DOM elements. We want
* to ensure they don't run until the DOM is ready.
*/
$(function() {
  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function() {
    /* This test will make sure that the
    * allFeeds variable has been defined and that it is not
    * empty. Experiment with this before you get started on
    * the rest of this project. What happens when you change
    * allFeeds in app.js to be an empty array and refresh the
    * page?
    */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* This test loops through each feed
    * in the allFeeds object and ensures it has a URL defined
    * and that the URL is not empty.
    */

    it('has a URL, and is not empty', function() {
      for (i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url.length).not.toBe(0);
      }
    });

    /* This test that loops through each feed
    * in the allFeeds object and ensures it has a name defined
    * and that the name is not empty.
    */
    it('has a Name, and is not empty', function() {
      for (i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name.length).not.toBe(0);
      }
    });
  });

  /* Defining a new test suite named "The menu" */
  describe('Menu', function(){
    var menu = $('.menu-icon-link');
    var body = $('body');
    /* This test that ensures the menu element is
    * hidden by default. You'll have to analyze the HTML and
    * the CSS to determine how we're performing the
    * hiding/showing of the menu element.
    */
    it('has a menu that is hidden by default', function(){
      expect(body.hasClass('menu-hidden')).toBeTruthy();
    });
    /* This test ensures the menu changes
    * visibility when the menu icon is clicked. This test
    * should have two expectations: does the menu display when
    * clicked and does it hide when clicked again.
    */
    it('has a menu that will reveal when clicked', function(){
      menu.click(); // trigger menu click action
      expect(body.hasClass('menu-hidden')).toBeFalsy();
    });

    it('will hide when clicked again', function(){
      menu.click(); // trigger menu click action
      expect(body.hasClass('menu-hidden')).toBeTruthy();
    });

  });

  /* Defining a new test suite named "Initial Entries" */
  describe('Initial Entries', function(){
    /* This test ensures when the loadFeed
    * function is called and completes its work, there is at least
    * a single .entry element within the .feed container.
    * Note: loadFeed() is asynchronous.
    */
    beforeEach(function(done){
      loadFeed(0, done);
    });
    it('has at least a single .entry element within the .feed container.', function(){
      var feedContainer = $('.feed').children();
      expect(feedContainer.length).toBeGreaterThan(0);
      });
    });

  /* Defining a new test suite named "New Feed Selection" */
  describe('New Feed Selection', function(){
    /* This test ensures when a new feed is loaded
    * by the loadFeed function that the content actually changes.
    * Note: loadFeed() is asynchronous.
    */
    beforeEach(function(done) {
        $(".feed").empty(); // Clear the feed
        loadFeed(1, function() {
            container = $('.feed').find('h2').text();
            loadFeed(2, done); // if you load the same feed, the test will fail =) Thank you !!!
        });
    })

    it('will change the content when a new feed is loaded', function(){
      expect($('.feed').find('h2').text()).not.toBe(container);
    });

    afterAll(function(done){
      loadFeed(0, done);
    });
  });
}());
