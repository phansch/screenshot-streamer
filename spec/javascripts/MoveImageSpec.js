var fixture;

describe("MoveImages", function() {
  it('should have a fixture', function() {
    loadFixtures('oneImage.html');
    fixture = $('#test');
    expect(fixture).toBeDefined();
    fixture.remove();
  });

  describe("adding the first image", function() {
    var fixture;

    beforeEach(function() {
      loadFixtures('noImage.html');
      fixture = $('#test');
      fixture.moveImages("whatever.png");
    });

    afterEach(function() {
      fixture.remove();
    });

    it('should add the correct link to the empty a href', function() {
      expect('a#newest_image').toHaveAttr('href', '/screenshots/whatever.png');
    });

    it('should add the correct link to the empty img src', function() {
      expect('a#newest_image img').toHaveAttr('src', '/screenshots/whatever.png');
    });

    it('should add nothing to the thumbnail list', function() {
      console.log($('#thumbnails ul'));
      expect($('#thumbnails ul')).not.toContainElement('li');
    });
  });

  describe("adding a second image", function() {
    var fixture;

    beforeEach(function() {
      loadFixtures('oneImage.html');
      fixture = $('#test');
      fixture.moveImages("whatever2.png");
    });

    afterEach(function() {
      fixture.remove();
    });

    it('should move the first image to the thumbnails', function() {
      expect(fixture).toContainElement($('#thumbnails ul li'));
    });

    it('should replace the top image link with the new image path', function() {
      expect('a#newest_image').toHaveAttr('href', '/screenshots/whatever2.png');
    });

    it('should replace the top image with the new image', function() {
      expect('a#newest_image img').toHaveAttr('src', '/screenshots/whatever2.png');
    });

  });
});
