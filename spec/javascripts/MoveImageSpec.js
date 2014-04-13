var fixture;

describe("MoveImages", function() {

  it('should have a fixture', function() {
    loadFixtures('oneImage.html');
    fixture = $('#test');
    fixture.moveImages("whatever2.png");
    expect(fixture).toBeDefined();
  });
});
