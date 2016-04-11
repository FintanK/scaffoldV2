describe('Scaffold ', function() {

  beforeEach(function () {
    browser.get("http://localhost:8100");
  });

  describe("Home Page", function () {

    it('should have the correct page title', function() {

      expect(browser.getTitle()).toBe("Scaffold");

    });
  });
});
