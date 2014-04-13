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
      fixture.moveImages({filename: "whatever.png"});
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
      expect($('#thumbnails ul')).not.toContainElement('li');
    });
  });

  describe("adding a second image", function() {
    var fixture;

    beforeEach(function() {
      loadFixtures('oneImage.html');
      fixture = $('#test');
      fixture.moveImages({filename: "whatever2.png"});
    });

    afterEach(function() {
      fixture.remove();
    });

    it('should replace the top image href with the new image path', function() {
      expect('a#newest_image').toHaveAttr('href', '/screenshots/whatever2.png');
    });

    it('should replace the top image src with the new image', function() {
      expect('a#newest_image img').toHaveAttr('src', '/screenshots/whatever2.png');
    });

    it('should move the first image to the thumbnails', function() {
      expect(fixture).toContainElement($('#thumbnails ul li'));
    });

    it('should add no class to the list item', function() {
      expect($('#thumbnails li')).not.toHaveAttr('class');
    });

  });

  describe("adding a third image", function() {
    var fixture;

    beforeEach(function() {
      loadFixtures('twoImages.html');
      fixture = $('#test');
      fixture.moveImages({filename: "whatever3.png"});
    });

    afterEach(function() {
      fixture.remove();
    });

    it('should replace the top image href with the new image path', function() {
      expect('a#newest_image').toHaveAttr('href', '/screenshots/whatever3.png');
    });

    it('should replace the top image src with the new image', function() {
      expect('a#newest_image img').toHaveAttr('src', '/screenshots/whatever3.png');
    });

    it('should move the top image to the thumbnails', function() {
      expect($('#thumbnails ul li').size()).toBe(2);
    });

    it('should add a "first" class to the first thumbnail image', function() {
      expect($('#thumbnails ul li').first()).toHaveClass('first');
    });

    it('should add a "last" class to the last thumbnail image', function() {
      expect($('#thumbnails ul li').last()).toHaveClass('last');
    });
  });

  describe("adding a fourth image", function() {
    var fixture;

    beforeEach(function() {
      loadFixtures('threeImages.html');
      fixture = $('#test');
      fixture.moveImages({filename: "whatever4.png"});
    });

    afterEach(function() {
      fixture.remove();
    });

    it('should replace the top image href with the new image path', function() {
      expect('a#newest_image').toHaveAttr('href', '/screenshots/whatever4.png');
    });

    it('should replace the top image src with the new image', function() {
      expect('a#newest_image img').toHaveAttr('src', '/screenshots/whatever4.png');
    });

    it('should move the top image to the thumbnails', function() {
      expect($('#thumbnails li').size()).toBe(3);
    });

    it('should add a "first" class to the first thumbnail image', function() {
      expect($('#thumbnails ul li').first()).toHaveClass('first');
    });

    it('should add a "last" class to the last thumbnail image', function() {
      expect($('#thumbnails li').last()).toHaveClass('last');
    });

    it('should remove the "first" class from the thumbnail in the middle', function() {
      expect($('#thumbnails ul li:eq(1)')).not.toHaveClass('first');
      expect($('#thumbnails ul li:eq(1)')).not.toHaveClass('last');
    });
  });

  describe("adding a fifth image with the limit at 3", function() {
    var fixture;

    beforeEach(function() {
      loadFixtures('fourImages.html');
      fixture = $('#test');
      fixture.moveImages({filename: "whatever5.png", limitThumbnails: 3});
    });

    afterEach(function() {
      fixture.remove();
    });

    it('should only show three thumbnails', function() {
      expect($('#thumbnails li').size()).toBe(3);
    });
  });
});
